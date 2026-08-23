import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENTRIES_DIR = path.join(__dirname, "productEntries");

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export default () => {
  return fs
    .readdirSync(ENTRIES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(ENTRIES_DIR, file), "utf8"));
      const id = file.replace(/\.json$/, "") || slugify(raw.name);

      return {
        active: true,
        ...raw,
        id,
      };
    });
};
