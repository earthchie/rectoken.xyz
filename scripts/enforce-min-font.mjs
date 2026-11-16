#!/usr/bin/env node
/**
 * Enforce the project-wide 14px minimum font size.
 *
 * - px values below 14 become 14px
 * - rem values below 0.875 become 0.875rem (root is 16px)
 * - em values below 0.875 become max(0.875rem, <value>em)
 *
 * Small labels sit at 14px; body copy is 17px. Run after large design changes
 * and inspect the affected layouts.
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'src');
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(css|astro)$/.test(entry.name)) files.push(full);
  }
}

walk(root);

let changed = 0;
let touchedFiles = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  let count = 0;

  const next = original.replace(/font-size:\s*([^;}"']+)/g, (match, raw) => {
    const value = raw.trim();

    if (value.startsWith('clamp(') || value.startsWith('var(') || value === 'inherit') return match;

    const px = value.match(/^([\d.]+)px(\s*!important)?$/);
    if (px) {
      const n = Number(px[1]);
      if (Number.isFinite(n) && n < 14) {
        count += 1;
        return `font-size: 14px${px[2] ?? ''}`;
      }
      return match;
    }

    const rem = value.match(/^([\d.]+)rem$/);
    if (rem) {
      const n = Number(rem[1]);
      if (Number.isFinite(n) && n < 0.875) {
        count += 1;
        return 'font-size: 0.875rem';
      }
      return match;
    }

    const em = value.match(/^([\d.]+)em$/);
    if (em) {
      const n = Number(em[1]);
      if (Number.isFinite(n) && n < 0.875) {
        count += 1;
        return `font-size: max(0.875rem, ${n}em)`;
      }
      return match;
    }

    return match;
  });

  if (count > 0) {
    writeFileSync(file, next);
    changed += count;
    touchedFiles += 1;
    console.log(`${count.toString().padStart(3)}  ${file.slice(root.length + 1)}`);
  }
}

console.log(`\n${changed} declarations raised across ${touchedFiles} files.`);
