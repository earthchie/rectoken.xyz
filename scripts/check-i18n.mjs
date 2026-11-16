#!/usr/bin/env node
/**
 * Locale consistency check for the RECTOKEN site.
 *
 *   node scripts/check-i18n.mjs [projectRoot]
 *
 * Checks that src/i18n/en.json and th.json expose the same keys, and that
 * src/pages/en and src/pages/th expose the same route files.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? process.cwd());
const i18nDir = join(root, 'src', 'i18n');
const pagesDir = join(root, 'src', 'pages');

const LOCALE_JSON = /^([a-z]{2}(?:-[A-Za-z]+)?)\.json$/;
const LOCALE_DIR = /^[a-z]{2}(?:-[A-Za-z]+)?$/;

let problems = 0;
const pass = (m) => console.log(`  \u2713 ${m}`);
const fail = (m) => {
  problems += 1;
  console.log(`  \u2717 ${m}`);
};

function flatten(value, prefix = '', out = {}) {
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child !== null && typeof child === 'object' && !Array.isArray(child)) {
      flatten(child, path, out);
    } else {
      out[path] = child;
    }
  }
  return out;
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const relativePosix = (full, base) => full.slice(base.length + 1).split('\\').join('/');

console.log(`Locale check: ${root}`);

const locales = readdirSync(i18nDir)
  .map((file) => file.match(LOCALE_JSON)?.[1])
  .filter(Boolean)
  .sort();

if (locales.length < 2) {
  fail(`expected at least 2 locale JSON files, found ${locales.length}`);
} else {
  console.log('\nTranslation keys');
  const keySets = new Map();
  for (const locale of locales) {
    try {
      keySets.set(locale, flatten(JSON.parse(readFileSync(join(i18nDir, `${locale}.json`), 'utf8'))));
    } catch (error) {
      fail(`${locale}.json is not valid JSON: ${error.message}`);
    }
  }

  const allKeys = new Set();
  for (const keys of keySets.values()) for (const key of Object.keys(keys)) allKeys.add(key);

  for (const [locale, keys] of keySets) {
    const missing = [...allKeys].filter((key) => !(key in keys)).sort();
    if (missing.length) {
      fail(`${locale}.json is missing ${missing.length} key(s): ${missing.slice(0, 8).join(', ')}`);
    } else {
      pass(`${locale}.json has all ${allKeys.size} keys`);
    }

    const empty = Object.entries(keys)
      .filter(([, value]) => typeof value === 'string' && value.trim() === '')
      .map(([key]) => key);
    if (empty.length) fail(`${locale}.json has empty value(s): ${empty.join(', ')}`);
  }
}

console.log('\nPage routes');
const localeDirs = readdirSync(pagesDir)
  .filter((entry) => LOCALE_DIR.test(entry) && statSync(join(pagesDir, entry)).isDirectory())
  .sort();

if (localeDirs.length < 2) {
  fail(`expected at least 2 locale directories under src/pages, found ${localeDirs.length}`);
} else {
  const routeSets = new Map();
  for (const locale of localeDirs) {
    const base = join(pagesDir, locale);
    const routes = walk(base)
      .filter((file) => file.endsWith('.astro'))
      .map((file) => relativePosix(file, base))
      .filter((route) => !route.startsWith('api/'));
    routeSets.set(locale, new Set(routes));
  }

  const allRoutes = new Set();
  for (const routes of routeSets.values()) for (const route of routes) allRoutes.add(route);

  for (const [locale, routes] of routeSets) {
    const missing = [...allRoutes].filter((route) => !routes.has(route)).sort();
    if (missing.length) {
      fail(`src/pages/${locale}/ is missing ${missing.length} route(s): ${missing.join(', ')}`);
    } else {
      pass(`src/pages/${locale}/ has all ${allRoutes.size} routes`);
    }
  }
}

console.log('');
if (problems) {
  console.log(`${problems} problem(s) found.`);
  process.exit(1);
}
console.log('All locale checks passed.');
