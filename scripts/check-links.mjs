#!/usr/bin/env node
/**
 * Verify that every internal link in the built HTML resolves to a file.
 *   node scripts/check-links.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
  );
}

const htmls = walk(root).filter((file) => file.endsWith('.html'));
const missing = new Map();

for (const file of htmls) {
  const html = readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith('/_astro') || href.startsWith('/pagefind') || href.startsWith('/api')) continue;
    let target = join(root, href);
    if (href.endsWith('/') || !extname(target)) target = join(target, 'index.html');
    if (!existsSync(target)) {
      const page = file.slice(root.length + 1).replaceAll('\\', '/');
      if (!missing.has(href)) missing.set(href, page);
    }
  }
}

console.log(`Checked ${htmls.length} pages.`);
if (missing.size === 0) {
  console.log('\u2713 All internal links resolve.');
} else {
  console.log(`\u2717 ${missing.size} missing target(s):`);
  for (const [href, page] of [...missing].slice(0, 60)) {
    console.log(`  ${href}  <-  ${page}`);
  }
  process.exit(1);
}
