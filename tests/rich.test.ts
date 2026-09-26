import { describe, expect, it } from 'vitest';
import { parseInline, parseRich } from '../src/lib/rich';

describe('rich text parser', () => {
  it('splits paragraphs on blank lines and keeps maths intact', () => {
    const blocks = parseRich('First $a + b$ line\ncontinues.\n\n$$x^2$$');
    expect(blocks.map((b) => b.kind)).toEqual(['p', 'p']);
    expect(JSON.stringify(blocks[0])).toContain('"t":"math","v":"a + b"');
    expect(JSON.stringify(blocks[1])).toContain('"t":"dmath","v":"x^2"');
  });

  it('starts a list directly after an introductory sentence', () => {
    const blocks = parseRich('Longer than 25 minutes:\n- half of one bar;\n- the whole of another.');
    expect(blocks.map((b) => b.kind)).toEqual(['p', 'ul']);
    const ul = blocks[1];
    expect(ul.kind === 'ul' && ul.items.length).toBe(2);
  });

  it('continues a list item on an indented line', () => {
    const blocks = parseRich('- first item\n  carries on\n- second');
    expect(blocks).toHaveLength(1);
    const ul = blocks[0];
    expect(ul.kind).toBe('ul');
    if (ul.kind === 'ul') expect(JSON.stringify(ul.items[0])).toContain('first item carries on');
  });

  it('numbers ordered lists from their first item', () => {
    const blocks = parseRich('3. three\n4. four');
    expect(blocks[0]).toMatchObject({ kind: 'ol', start: 3 });
  });

  it('parses tables with a header row and ignores the rule row', () => {
    const blocks = parseRich('| Q | Time |\n|---|---|\n| 9 | 13:20 |');
    expect(blocks[0].kind).toBe('table');
    if (blocks[0].kind === 'table') {
      expect(blocks[0].head).toHaveLength(2);
      expect(blocks[0].rows).toHaveLength(1);
    }
  });

  it('parses bold and italic around maths', () => {
    const parts = parseInline('**Find $a$.** then *check*');
    expect(parts[0]).toMatchObject({ t: 'bold' });
    expect(parts.some((p) => p.t === 'em')).toBe(true);
  });

  it('does not treat a dollar amount inside maths delimiters as two formulas', () => {
    const parts = parseInline(String.raw`costs $\$5$ each`);
    expect(parts.filter((p) => p.t === 'math')).toHaveLength(1);
  });
});
