/**
 * Integration with the claude.ai artifact runtime, when present.
 * Everything here degrades gracefully: on a normal web host `window.claude`
 * does not exist and every helper returns null / falls back.
 */

interface ClaudeRuntime {
  use: (name: string) => Promise<unknown>;
}

declare global {
  interface Window {
    claude?: ClaudeRuntime;
  }
}

export function inArtifact(): boolean {
  return typeof window !== 'undefined' && typeof window.claude?.use === 'function';
}

const cache = new Map<string, Promise<unknown>>();

export function capability<T = unknown>(name: string): Promise<T | null> {
  if (!inArtifact()) return Promise.resolve(null);
  if (!cache.has(name)) {
    cache.set(
      name,
      window.claude!.use(name).catch(() => null),
    );
  }
  return cache.get(name) as Promise<T | null>;
}

interface DownloadsCap {
  save: (file: { filename: string; data: string | Blob }) => Promise<unknown>;
}

/** Offer a file to the viewer. Returns false if the viewer or browser declined. */
export async function saveFile(filename: string, data: string, mime = 'application/json'): Promise<boolean> {
  const dl = await capability<DownloadsCap>('downloads');
  if (dl) {
    try {
      await dl.save({ filename, data });
      return true;
    } catch {
      return false;
    }
  }
  // The viewer's sandbox ignores download links, so report failure rather than a save that never happened.
  if (inArtifact()) return false;
  try {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return true;
  } catch {
    return false;
  }
}

export function canPrint(): boolean {
  return !inArtifact() && typeof window !== 'undefined' && typeof window.print === 'function';
}
