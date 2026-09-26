// Layout QA: opens every question (stem, options, solution, traps, hints) and
// every notes page at phone width in Chromium, and reports any formula,
// option or table that is wider than the space it has, plus any page that
// scrolls sideways.
//   node scripts/check-overflow.mjs [--width=375]
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const width = Number((process.argv.find((a) => a.startsWith('--width=')) ?? '--width=375').split('=')[1]);
const url = pathToFileURL(resolve('dist/index.html')).href;
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width, height: 800 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

async function go(hash) {
  await page.goto(url + hash);
  await page.waitForTimeout(120);
  await page.evaluate(() => document.fonts && document.fonts.ready);
}

/** Elements whose content is wider than their box (1 px tolerance). */
function measure(where) {
  return page.evaluate((where) => {
    const out = [];
    const doc = document.documentElement;
    if (doc.scrollWidth > doc.clientWidth + 1) out.push(`${where}: page scrolls sideways (${doc.scrollWidth} > ${doc.clientWidth})`);
    const sel = '.md, .opt-body, .table-wrap, .rich table, .diagram-frame, .formula-row';
    for (const el of document.querySelectorAll(sel)) {
      if (el.scrollWidth > el.clientWidth + 1) {
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70);
        out.push(`${where}: ${el.className.split(' ')[0]} overflows by ${el.scrollWidth - el.clientWidth}px: "${text}"`);
      }
    }
    return out;
  }, where);
}

const problems = [];
const ids = ['M1', 'PH', 'M2'].flatMap((m) => Array.from({ length: 27 }, (_, i) => `${m}-${String(i + 1).padStart(2, '0')}`));
for (const id of ids) {
  await go(`#question.${id}`);
  problems.push(...(await measure(`${id} question`)));
  await page.getByRole('button', { name: 'Show solution without answering' }).click();
  await page.waitForTimeout(60);
  problems.push(...(await measure(`${id} solution`)));
  for (const [name, label] of [
    [/^Why not the others/, 'traps'],
    [/^Hints$/, 'hints'],
  ]) {
    await page.getByRole('tab', { name }).click();
    await page.waitForTimeout(40);
    problems.push(...(await measure(`${id} ${label}`)));
  }
}

const topics = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'MM1', 'MM2', 'MM3', 'MM4', 'MM5', 'MM6', 'MM7', 'MM8'];
for (const t of topics) {
  await go(`#learn.${t}`);
  const btn = page.getByRole('button', { name: /show the solution/ });
  if (await btn.count()) await btn.click();
  problems.push(...(await measure(`notes ${t}`)));
}
for (const h of ['', '#paper', '#practice', '#bank', '#formulas', '#cards', '#drills', '#strategy', '#planner', '#progress', '#calculator', '#settings', '#about']) {
  await go(h);
  problems.push(...(await measure(`page ${h || 'home'}`)));
}

await browser.close();
if (errors.length) console.log('PAGE ERRORS:\n' + [...new Set(errors)].join('\n'));
if (problems.length) {
  console.log(`${problems.length} layout problem(s) at ${width}px:\n` + problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`No overflow at ${width}px across 81 questions (all tabs), 22 notes pages and 13 site pages.`);
}
