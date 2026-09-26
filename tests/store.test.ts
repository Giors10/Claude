import { describe, expect, it } from 'vitest';
import { exportJson, getState, importJson, setState } from '../src/lib/store';

describe('backups', () => {
  it('round-trips progress through export and import', () => {
    setState((s) => ({ ...s, planDone: { 'day1-task1': true }, settings: { ...s.settings, testDate: '2027-01-05' } }));
    const text = exportJson();
    setState((s) => ({ ...s, planDone: {}, settings: { ...s.settings, testDate: '2026-10-12' } }));
    expect(importJson(text)).toEqual({ ok: true });
    expect(getState().planDone).toEqual({ 'day1-task1': true });
    expect(getState().settings.testDate).toBe('2027-01-05');
  });

  it('rejects text that is not a backup, without changing progress', () => {
    const before = exportJson();
    expect(importJson('{"hello": 1}').ok).toBe(false);
    expect(importJson('not json at all').ok).toBe(false);
    expect(JSON.parse(exportJson()).state).toEqual(JSON.parse(before).state);
  });
});
