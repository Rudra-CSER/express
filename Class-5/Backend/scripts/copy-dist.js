/**
 * Cross-platform copy of Frontend/dist to Backend/public/dist.
 * Run from Backend directory: node scripts/copy-dist.js
 */
const fs = require("fs");
const path = require("path");

const backendDir = path.join(__dirname, "..");
const src = path.join(backendDir, "..", "Frontend", "dist");
const dest = path.join(backendDir, "public", "dist");

if (!fs.existsSync(src)) {
  console.error("Frontend/dist not found. Run: cd Frontend && npm run build");
  process.exit(1);
}

fs.mkdirSync(path.join(backendDir, "public"), { recursive: true });
fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log("Copied Frontend/dist -> Backend/public/dist");