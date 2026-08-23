const fs = require("fs");
const path = require("path");

const ENTRIES_DIR = path.join(__dirname, "productEntries");

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

module.exports = () => {
  return fs
    .readdirSync(ENTRIES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(ENTRIES_DIR, file), "utf8"));
      const id = file.replace(/\.json$/, "") || slugify(raw.name);

      return {
        active: true,
        featured: false,
        ...raw,
        id,
      };
    });
};
