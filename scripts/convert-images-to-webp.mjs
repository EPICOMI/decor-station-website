#!/usr/bin/env node
/**
 * One-time batch conversion of existing JPG/PNG product photos to WebP.
 *
 * Usage:
 *   npm install --save-dev sharp
 *   node scripts/convert-images-to-webp.mjs
 *
 * What it does:
 *   1. Finds every .jpg/.jpeg/.png file in images/ (skips logo.png -- brand asset, left alone).
 *   2. Converts each to .webp at quality 90 into the same folder.
 *   3. Deletes the original file.
 *   4. Rewrites any reference to the old filename inside _data/productEntries/*.json
 *      and _data/site.json to point at the new .webp filename.
 *   5. Prints a summary. Review with `git status` / `git diff` before committing.
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "images");
const PRODUCT_ENTRIES_DIR = path.join(ROOT, "_data", "productEntries");
const SITE_JSON = path.join(ROOT, "_data", "site.json");

const SKIP_FILES = new Set(["logo.png"]);
const CONVERTIBLE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function convertImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  const renameMap = new Map(); // oldFilename -> newFilename

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!CONVERTIBLE_EXTENSIONS.includes(ext)) continue;
    if (SKIP_FILES.has(file)) continue;

    const inputPath = path.join(IMAGES_DIR, file);
    const outputFile = file.slice(0, -ext.length) + ".webp";
    const outputPath = path.join(IMAGES_DIR, outputFile);

    await sharp(inputPath).webp({ quality: 90 }).toFile(outputPath);
    fs.unlinkSync(inputPath);

    renameMap.set(file, outputFile);
    console.log(`Converted: ${file} -> ${outputFile}`);
  }

  return renameMap;
}

function updateJsonReferences(renameMap) {
  const jsonFiles = [
    SITE_JSON,
    ...fs
      .readdirSync(PRODUCT_ENTRIES_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => path.join(PRODUCT_ENTRIES_DIR, f)),
  ];

  for (const filePath of jsonFiles) {
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    for (const [oldName, newName] of renameMap.entries()) {
      if (content.includes(oldName)) {
        content = content.split(oldName).join(newName);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Updated references in: ${path.relative(ROOT, filePath)}`);
    }
  }
}

async function main() {
  console.log("Starting WebP batch conversion...\n");
  const renameMap = await convertImages();

  if (renameMap.size === 0) {
    console.log("No JPG/PNG files found to convert (aside from skipped files).");
    return;
  }

  console.log(`\nConverted ${renameMap.size} file(s). Updating JSON references...\n`);
  updateJsonReferences(renameMap);

  console.log("\nDone. Review changes with `git status` / `git diff`, then commit and push.");
}

main().catch((err) => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
