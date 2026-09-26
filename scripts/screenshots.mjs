// Visual QA: renders pages and every question (with its solution) in Chromium
// and saves screenshots for review.
//   node scripts/screenshots.mjs [outDir] [--only=M1-05,PH-03] [--pages] [--pagelist=home,bank]
//                                [--questions] [--tabs] [--dark] [--width=390]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const outDir = resolve(args.find((a) => !a.startsWith('--')) ?? 'build/shots');
const only = (args.find((a) => a.startsWith('--only=')) ?? '').replace('--only=', '').split(',').filter(Boolean);
const doPages = args.includes('--pages') || args.some((a) => a.startsWith('--pagelist=')) || (!args.includes('--questions') && !only.length);
const doQuestions = args.includes('--questions') || only.length > 0;
const dark = args.includes('--dark');
const width = Number((args.find((a) => a.startsWith('--width=')) ?? '--width=1100').split('=')[1]);
mkdirSync(outDir, { recursive: true });

const url = pathToFileURL(resolve('dist/index.html')).href;
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
const context = await browser.newContext({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: dark ? 'dark' : 'light',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

async function go(hash) {
  await page.goto(url + hash);
  await page.waitForTimeout(250);
  await page.evaluate(() => document.fonts && document.fonts.ready);
}

if (doPages) {
  const all = ['', '#paper', '#practice', '#bank', '#learn', '#learn.M4', '#learn.MM6', '#learn.P3', '#formulas', '#cards', '#drills', '#strategy', '#planner', '#progress', '#calculator', '#settings', '#about'];
  const pick = (args.find((a) => a.startsWith('--pagelist=')) ?? '').replace('--pagelist=', '').split(',').filter(Boolean);
  const pages = pick.length ? all.filter((h) => pick.includes(h.replace('#', '') || 'home')) : all;
  for (const h of pages) {
    await go(h);
    const name = (h.replace('#', '') || 'home').replace(/\./g, '-');
    await page.screenshot({ path: `${outDir}/page-${name}${dark ? '-dark' : ''}.png`, fullPage: true });
  }
}

if (doQuestions) {
  const ids = only.length
    ? only
    : [
        ...Array.from({ length: 27 }, (_, i) => `M1-${String(i + 1).padStart(2, '0')}`),
        ...Array.from({ length: 27 }, (_, i) => `PH-${String(i + 1).padStart(2, '0')}`),
        ...Array.from({ length: 27 }, (_, i) => `M2-${String(i + 1).padStart(2, '0')}`),
      ];
  for (const id of ids) {
    await go(`#question.${id}`);
    const btn = page.getByRole('button', { name: 'Show solution without answering' });
    await btn.click();
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${outDir}/q-${id}${dark ? '-dark' : ''}.png`, fullPage: true });
    if (args.includes('--tabs')) {
      for (const [tab, label] of [
        [/^Why not the others/, 'traps'],
        [/^Hints$/, 'hints'],
      ]) {
        await page.getByRole('tab', { name: tab }).click();
        await page.waitForTimeout(80);
        await page.locator('section.solution').screenshot({ path: `${outDir}/q-${id}-${label}${dark ? '-dark' : ''}.png` });
      }
    }
  }
}

await browser.close();
if (errors.length) {
  console.log('PAGE ERRORS:\n' + [...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Screenshots saved to ' + outDir);
}
