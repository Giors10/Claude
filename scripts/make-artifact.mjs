// Packages the artifact build (vite build --mode artifact) as a page fragment
// for the claude.ai artifact viewer: title first, inline CSS, a root element,
// React, ReactDOM and KaTeX as pinned UMD scripts from jsDelivr, then the app.
//
//   node scripts/make-artifact.mjs            write build/esat-crucible.html
//   node scripts/make-artifact.mjs --verify   also load it in Chromium and check it works
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const src = readFileSync(resolve(root, 'build/artifact/index.html'), 'utf8');
const version = (pkg) => JSON.parse(readFileSync(resolve(root, 'node_modules', pkg, 'package.json'), 'utf8')).version;

const LIBS = [
  { pkg: 'react', file: 'umd/react.production.min.js' },
  { pkg: 'react-dom', file: 'umd/react-dom.production.min.js' },
  { pkg: 'katex', file: 'dist/katex.min.js' },
].map((l) => ({ ...l, url: `https://cdn.jsdelivr.net/npm/${l.pkg}@${version(l.pkg)}/${l.file}` }));

const pick = (re, what) => {
  const m = re.exec(src);
  if (!m) throw new Error(`make-artifact: could not find the ${what} in build/artifact/index.html`);
  return m[1];
};
const title = pick(/<title>([\s\S]*?)<\/title>/, 'title').trim();
const js = pick(/<script type="module" crossorigin>([\s\S]*?)<\/script>/, 'app script');
const css = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
if (!css) throw new Error('make-artifact: no CSS found');
if (/<\/script/i.test(js) || /<\/style/i.test(css)) throw new Error('make-artifact: inline code contains a closing tag');
if (!/^\(function\(/.test(js.trim())) throw new Error('make-artifact: expected an IIFE bundle (build with --mode artifact)');

const page = [
  `<title>${title}</title>`,
  `<style>${css}</style>`,
  '<div id="root"></div>',
  '<noscript>ESAT Crucible needs JavaScript to run.</noscript>',
  ...LIBS.map((l) => `<script src="${l.url}"></script>`),
  `<script>${js}</script>`,
  '',
].join('\n');

const out = resolve(root, 'build/esat-crucible.html');
writeFileSync(out, page);
console.log(`Wrote ${out} (${(page.length / 1024).toFixed(0)} KB); libraries: ${LIBS.map((l) => `${l.pkg}@${version(l.pkg)}`).join(', ')}`);

if (process.argv.includes('--verify')) await verify();

/** Load the page as the viewer would (inside its skeleton, with window.claude present) and check it renders. */
async function verify() {
  const { chromium } = await import('playwright');
  const skeleton =
    '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    '<style>:root{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif;background:#faf9f7}img{max-width:100%}[hidden]{display:none!important}</style>' +
    '</head><body>' +
    page +
    '</body></html>';
  const file = resolve(root, 'build/artifact-preview.html');
  writeFileSync(file, skeleton);

  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
  const failures = [];
  for (const scheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1100, height: 900 }, colorScheme: scheme });
    // Serve the CDN scripts from node_modules (the same files jsDelivr serves for these versions).
    await context.route('https://cdn.jsdelivr.net/npm/**', (route) => {
      const lib = LIBS.find((l) => route.request().url() === l.url);
      if (!lib) return route.abort();
      return route.fulfill({ path: resolve(root, 'node_modules', lib.pkg, lib.file), contentType: 'text/javascript' });
    });
    // The viewer defines window.claude before any page script runs; here every capability is absent.
    await context.addInitScript(() => {
      window.claude = { use: () => Promise.resolve(null) };
    });
    const pg = await context.newPage();
    const errors = [];
    pg.on('pageerror', (e) => errors.push(String(e)));
    pg.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await pg.goto(pathToFileURL(file).href);
    await pg.waitForSelector('.sidebar', { timeout: 10000 });
    const t = await pg.title();
    if (t !== title) failures.push(`${scheme}: title is "${t}"`);
    await pg.goto(pathToFileURL(file).href + '#question.M2-27');
    await pg.getByRole('button', { name: 'Show solution without answering' }).click();
    const katexCount = await pg.locator('.katex').count();
    if (katexCount < 20) failures.push(`${scheme}: only ${katexCount} formulas rendered on M2-27`);
    const diagrams = await pg.locator('svg.diagram').count();
    if (diagrams < 1) failures.push(`${scheme}: the M2-27 solution diagram did not render`);
    const bg = await pg.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const dark = (() => {
      const [r, g, b] = bg.match(/\d+/g).map(Number);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b < 90;
    })();
    if (dark !== (scheme === 'dark')) failures.push(`${scheme}: body background ${bg} does not follow the ${scheme} theme`);
    const tutor = await pg.locator('.tutor').count();
    if (tutor) failures.push(`${scheme}: the AI tutor is shown although the sample capability is unavailable`);
    await pg.screenshot({ path: resolve(root, `build/artifact-${scheme}.png`) });
    // An explicit host choice must win over the system setting.
    await pg.evaluate((s) => document.documentElement.setAttribute('data-theme', s === 'dark' ? 'light' : 'dark'), scheme);
    await pg.waitForTimeout(400);
    const bg2 = await pg.evaluate(() => getComputedStyle(document.body).backgroundColor);
    if (bg2 === bg) failures.push(`${scheme}: data-theme stamped by the host was ignored`);
    const optBg = await pg.evaluate(() => getComputedStyle(document.querySelector('.opt')).backgroundColor);
    const surface = await pg.evaluate(() => getComputedStyle(document.querySelector('.card, .question') ?? document.body).backgroundColor);
    if (!optBg || !surface) failures.push(`${scheme}: could not read colours after the theme switch`);
    if (errors.length) failures.push(`${scheme}: page errors: ${[...new Set(errors)].join(' | ')}`);
    await context.close();
  }
  await browser.close();
  if (failures.length) {
    console.log('Artifact verification FAILED:\n  ' + failures.join('\n  '));
    process.exitCode = 1;
  } else {
    console.log('Artifact verified in Chromium: renders in light and dark, follows the host theme, maths and diagrams present, no errors.');
  }
}
