#!/usr/bin/env node
/**
 * Make the built Pagefind index usable outside of a full rebuild.
 *
 *   node scripts/setup-pagefind.mjs [projectRoot]
 *
 * Run after: astro build && pagefind --site dist
 */

import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? process.cwd());
const source = join(root, 'dist', 'pagefind');
const target = join(root, 'public', 'pagefind');

if (!existsSync(source)) {
  console.error(`\u2717 ${source} not found.`);
  console.error('  Run "astro build" and "pagefind --site dist" first.');
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

const entry = join(target, 'pagefind.js');
if (existsSync(entry)) {
  const original = readFileSync(entry, 'utf8');
  const patched = original.replace(/import\.meta\.url/g, '"/pagefind/"');
  writeFileSync(entry, patched);
  console.log(
    `\u2713 dist/pagefind \u2192 public/pagefind (${
      patched === original ? 'nothing to patch' : 'import.meta.url patched'
    })`
  );
} else {
  console.log('\u2713 dist/pagefind \u2192 public/pagefind');
  console.log('  note: pagefind.js not found, nothing to patch');
}
