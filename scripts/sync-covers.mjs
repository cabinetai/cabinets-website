// Syncs from the registry clone (set up by CI) into public/:
//   registry/<slug>/cover.jpg         → public/covers/<slug>.jpg
//   registry/public/screenshots/*.jpg → public/screenshots/<slug>.jpg
import fs from "fs";
import path from "path";

const registry = "registry";

if (!fs.existsSync(registry)) {
  console.log("sync-covers: no registry/ found, skipping");
  process.exit(0);
}

// 1. Covers
const coversOut = "public/covers";
fs.mkdirSync(coversOut, { recursive: true });
let covers = 0;
for (const slug of fs.readdirSync(registry)) {
  const src = path.join(registry, slug, "cover.jpg");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(coversOut, `${slug}.jpg`));
    covers++;
  }
}

// 2. Screenshots
const screenshotsOut = "public/screenshots";
const screenshotsSrc = path.join(registry, "public", "screenshots");
fs.mkdirSync(screenshotsOut, { recursive: true });
let shots = 0;
if (fs.existsSync(screenshotsSrc)) {
  for (const file of fs.readdirSync(screenshotsSrc)) {
    if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      fs.copyFileSync(path.join(screenshotsSrc, file), path.join(screenshotsOut, file));
      shots++;
    }
  }
}

console.log(`sync-covers: ${covers} covers, ${shots} screenshots synced`);
