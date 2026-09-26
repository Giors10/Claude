// Bundle the TypeScript content with esbuild (a Vite dependency) and dump it
// as JSON so that non-JavaScript tools (the Python answer checker) can read it.
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';

const result = await build({
  entryPoints: ['src/content/paper/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
});
const code = result.outputFiles[0].text;
const mod = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
mkdirSync('build', { recursive: true });
writeFileSync('build/content.json', JSON.stringify(mod.ALL_QUESTIONS, null, 2));
console.log(`Exported ${mod.ALL_QUESTIONS.length} questions to build/content.json`);
