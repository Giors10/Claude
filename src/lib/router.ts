import { useSyncExternalStore } from 'react';

/**
 * Tiny hash router. Routes are plain tokens separated by dots
 * (e.g. "#learn.MM6", "#results.abc123"), which keeps deep links valid
 * inside sandboxed viewers that only pass simple fragments through.
 */
export interface Route {
  name: string;
  args: string[];
}

function parse(hash: string): Route {
  const h = hash.replace(/^#\/?/, '');
  if (!h) return { name: 'home', args: [] };
  const [name, ...args] = h.split('.');
  return { name: name || 'home', args };
}

let current: Route = typeof window === 'undefined' ? { name: 'home', args: [] } : parse(window.location.hash);
const listeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    current = parse(window.location.hash);
    listeners.forEach((l) => l());
  });
}

export function navigate(name: string, ...args: (string | number)[]): void {
  const token = [name, ...args.map(String)].join('.');
  const next = token === 'home' ? '' : '#' + token;
  if (typeof window === 'undefined') return;
  if (window.location.hash === next || (next === '' && window.location.hash === '')) {
    current = parse(next);
    listeners.forEach((l) => l());
  } else if (next === '') {
    // Clear the hash without adding a stray "#".
    try {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    } catch {
      window.location.hash = '';
    }
    current = parse('');
    listeners.forEach((l) => l());
  } else {
    window.location.hash = next;
  }
  window.scrollTo({ top: 0 });
}

export function href(name: string, ...args: (string | number)[]): string {
  const token = [name, ...args.map(String)].join('.');
  return token === 'home' ? '#' : '#' + token;
}

export function useRoute(): Route {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => current,
  );
}
