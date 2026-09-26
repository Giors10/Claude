import katex from 'katex';

/** Macros available in every formula. */
export const KATEX_MACROS: Record<string, string> = {
  '\\dd': '\\mathrm{d}',
};

const cache = new Map<string, string>();

/** Render TeX to an HTML string (cached). Errors render as the raw source rather than throwing. */
export function texToHtml(tex: string, display = false): string {
  const key = (display ? 'D:' : 'I:') + tex;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  let html: string;
  try {
    html = katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: 'ignore',
      macros: { ...KATEX_MACROS },
      output: 'htmlAndMathml',
    });
  } catch {
    html = `<code class="tex-error">${escapeHtml(tex)}</code>`;
  }
  cache.set(key, html);
  return html;
}

/** Strict render used by the content tests: throws on any KaTeX error or warning. */
export function assertTex(tex: string, display = false): void {
  katex.renderToString(tex, {
    displayMode: display,
    throwOnError: true,
    strict: 'error',
    macros: { ...KATEX_MACROS },
  });
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
