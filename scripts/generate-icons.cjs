const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const publicDir = path.resolve(__dirname, "..", "public");
const svgBuffer = fs.readFileSync(path.join(publicDir, "favicon.svg"));

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function generate() {
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`OK ${name} (${size}x${size})`);
  }

  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), png32);
  console.log("OK favicon.ico (32x32)");
}

generate().catch(console.error);