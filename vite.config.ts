/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * KaTeX ships every font as woff2, woff and ttf. Every browser we target
 * understands woff2, so drop the other two before the fonts are inlined.
 */
function katexWoff2Only(): Plugin {
  return {
    name: 'katex-woff2-only',
    enforce: 'pre',
    transform(code, id) {
      if (!/katex(\.min)?\.css$/.test(id.split('?')[0])) return null;
      return code
        .replace(/,\s*url\([^)]*\.woff\)\s*format\(["']woff["']\)/g, '')
        .replace(/,\s*url\([^)]*\.ttf\)\s*format\(["']truetype["']\)/g, '');
    },
  };
}

export default defineConfig(({ mode }) => {
  // The artifact build loads React, ReactDOM and KaTeX from a CDN as UMD
  // globals; the standard build bundles everything into one offline file.
  const artifact = mode === 'artifact';
  return {
    base: './',
    esbuild: {
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
    plugins: [katexWoff2Only(), viteSingleFile({ removeViteModuleLoader: true })],
    define: {
      __ARTIFACT__: JSON.stringify(artifact),
    },
    build: {
      outDir: artifact ? 'build/artifact' : 'dist',
      emptyOutDir: true,
      assetsInlineLimit: 100_000_000,
      cssCodeSplit: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: artifact
        ? {
            external: ['react', 'react-dom', 'react-dom/client', 'katex'],
            output: {
              format: 'iife',
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react-dom/client': 'ReactDOM',
                katex: 'katex',
              },
            },
          }
        : undefined,
    },
    test: {
      environment: 'node',
      include: ['tests/**/*.test.ts'],
    },
  };
});
