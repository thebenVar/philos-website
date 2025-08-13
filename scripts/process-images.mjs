#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

// Configure folders to process and output
const TARGETS = [
  { inDir: 'dishes', outDir: 'dishes' },
  { inDir: 'gallery', outDir: 'gallery' },
];

const OUT_SIZES = [
  { kind: 'thumb', size: 512, quality: 80 },
  { kind: 'large', size: 2046, quality: 85 },
];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const SKIP_DIRS = new Set(['thumb', 'large']);

function isImageFile(file) {
  return IMAGE_EXT.has(path.extname(file).toLowerCase());
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processOne(inPath, outBaseDir, relPath) {
  const baseName = path.basename(relPath, path.extname(relPath));
  const subDir = path.dirname(relPath);
  for (const cfg of OUT_SIZES) {
    const outDir = path.join(outBaseDir, cfg.kind, subDir);
    await ensureDir(outDir);
    const outFile = path.join(outDir, `${baseName}.webp`);

    const img = sharp(inPath, { failOn: 'none' }); // do not fail on minor issues
    // cover crop to square
    await img
      .rotate()
      .resize(cfg.size, cfg.size, { fit: 'cover', position: 'attention' })
      .webp({ quality: cfg.quality })
      .toFile(outFile);

    console.log('Wrote', path.relative(PUBLIC_DIR, outFile));
  }
}

async function walkAndProcess(baseIn, baseOut, rootIn) {
  const entries = await fs.readdir(baseIn, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.isDirectory() && SKIP_DIRS.has(ent.name)) continue; // skip generated dirs

    const inFull = path.join(baseIn, ent.name);
    if (ent.isDirectory()) {
      await walkAndProcess(inFull, baseOut, rootIn);
    } else if (ent.isFile() && isImageFile(ent.name)) {
      const relPath = path.relative(rootIn, inFull);
      await processOne(inFull, baseOut, relPath);
    }
  }
}

async function main() {
  for (const t of TARGETS) {
    const inDir = path.join(PUBLIC_DIR, t.inDir);
    const outBase = path.join(PUBLIC_DIR, t.outDir);
    try {
      await walkAndProcess(inDir, outBase, inDir);
    } catch (e) {
      console.error('Error processing', t, e.message);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
