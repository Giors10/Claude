import React, { useRef, useState } from 'react';
import { MODULE_ORDER, MODULES } from '../content/types';
import { Icon } from '../components/Icon';
import { Modal, useToast } from '../components/Modal';
import { inArtifact, saveFile } from '../lib/platform';
import { exportJson, importJson, resetAll, storageAvailable, updateSettings, useStore } from '../lib/store';

export function SettingsPage() {
  const settings = useStore((s) => s.settings);
  const attemptCount = useStore((s) => s.attempts.length);
  const answeredCount = useStore((s) => Object.keys(s.qstats).length);
  const cardCount = useStore((s) => Object.keys(s.cards).length);
  const [confirmReset, setConfirmReset] = useState(false);
  // Copy/paste fallback for hosts where files cannot be saved (e.g. downloads declined in the claude.ai viewer).
  const [copyText, setCopyText] = useState<string | null>(null);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const copyRef = useRef<HTMLTextAreaElement>(null);
  const [toast, showToast] = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const hostTheme = inArtifact();

  const doExport = async () => {
    const json = exportJson();
    const ok = await saveFile(`esat-crucible-backup-${new Date().toISOString().slice(0, 10)}.json`, json);
    if (ok) showToast('Backup saved');
    else setCopyText(json);
  };

  const copyBackup = async () => {
    try {
      await navigator.clipboard.writeText(copyText ?? '');
      showToast('Backup copied. Paste it into a note or email to keep it.');
    } catch {
      copyRef.current?.select();
      showToast('Press Ctrl+C (or ⌘C) to copy the selected text.');
    }
  };

  const doImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = importJson(String(reader.result ?? ''));
      showToast(res.ok ? 'Backup restored' : res.error);
    };
    reader.readAsText(file);
  };

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Settings</span>
        <h1>Settings and data</h1>
      </header>

      <section className="card stack-l">
        <h3>Display</h3>
        {hostTheme ? (
          <p className="muted">The colour theme follows your Claude app setting.</p>
        ) : (
          <div className="stack">
            <span className="field-label">Theme</span>
            <div className="seg" role="group" aria-label="Theme">
              {(
                [
                  ['system', 'Match system'],
                  ['light', 'Light'],
                  ['dark', 'Dark'],
                ] as const
              ).map(([v, label]) => (
                <button key={v} type="button" aria-pressed={settings.theme === v} onClick={() => updateSettings({ theme: v })}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="stack">
          <span className="field-label">Question text size</span>
          <div className="seg" role="group" aria-label="Question text size">
            {(
              [
                ['m', 'Standard'],
                ['l', 'Large'],
                ['xl', 'Extra large'],
              ] as const
            ).map(([v, label]) => (
              <button key={v} type="button" aria-pressed={settings.textSize === v} onClick={() => updateSettings({ textSize: v })}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card stack-l">
        <h3>Exams</h3>
        <label className="check">
          <input type="checkbox" checked={settings.showTimer} onChange={(e) => updateSettings({ showTimer: e.target.checked })} />
          Show the countdown timer during papers
        </label>
        <label className="check">
          <input type="checkbox" checked={settings.timeWarnings} onChange={(e) => updateSettings({ timeWarnings: e.target.checked })} />
          Warn me at 10, 5 and 1 minutes remaining
        </label>
        <label className="check">
          <input type="checkbox" checked={settings.confidence} onChange={(e) => updateSettings({ confidence: e.target.checked })} />
          Ask for my confidence after each answer
        </label>
        <div className="stack">
          <span className="field-label">Target scores</span>
          <div className="grid grid-3">
            {MODULE_ORDER.map((m) => (
              <div key={m} className="field">
                <label htmlFor={`target-${m}`}>{MODULES[m].name}</label>
                <select
                  id={`target-${m}`}
                  className="input"
                  value={settings.targets[m]}
                  onChange={(e) => updateSettings({ targets: { ...settings.targets, [m]: Number(e.target.value) } })}
                >
                  {[4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((v) => (
                    <option key={v} value={v}>
                      {v.toFixed(1)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card stack-l">
        <h3>Your data</h3>
        <p className="muted" style={{ fontSize: '0.92rem' }}>
          Everything ({attemptCount} attempts, {answeredCount} questions with history, {cardCount} flashcards) is stored only in this browser.
          Nothing is sent to a server. Save a backup to move it to another device.
        </p>
        {!storageAvailable() && <p className="note note-warn">This browser is blocking storage, so progress will be lost when you close the page. Save a backup.</p>}
        <div className="row">
          <button type="button" className="btn" onClick={doExport}>
            <Icon name="download" /> Save a backup
          </button>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            <Icon name="upload" /> Restore from a backup
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setPasteOpen(true)}>
            Paste backup text
          </button>
          <input
            ref={fileRef}
            id="restore-file"
            type="file"
            accept="application/json,.json"
            className="visually-hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) doImport(f);
              e.target.value = '';
            }}
          />
          <button type="button" className="btn btn-danger" onClick={() => setConfirmReset(true)}>
            <Icon name="trash" /> Delete all progress
          </button>
        </div>
      </section>

      {copyText !== null && (
        <Modal
          title="Copy your backup"
          onClose={() => setCopyText(null)}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setCopyText(null)}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={copyBackup}>
                Copy backup text
              </button>
            </>
          }
        >
          <p className="muted" style={{ margin: 0 }}>
            This page cannot save files here, so your backup is shown as text. Copy it somewhere safe; to restore it, use “Paste backup text”.
          </p>
          <textarea ref={copyRef} className="input mono" readOnly value={copyText} rows={8} style={{ fontSize: '0.78rem' }} onFocus={(e) => e.currentTarget.select()} aria-label="Backup text" />
        </Modal>
      )}

      {pasteOpen && (
        <Modal
          title="Restore from backup text"
          onClose={() => setPasteOpen(false)}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setPasteOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!pasteText.trim()}
                onClick={() => {
                  const res = importJson(pasteText);
                  showToast(res.ok ? 'Backup restored' : res.error);
                  if (res.ok) {
                    setPasteOpen(false);
                    setPasteText('');
                  }
                }}
              >
                Restore
              </button>
            </>
          }
        >
          <p className="muted" style={{ margin: 0 }}>
            Paste the text of an ESAT Crucible backup. It replaces the progress saved in this browser.
          </p>
          <textarea className="input mono" rows={8} value={pasteText} onChange={(e) => setPasteText(e.target.value)} style={{ fontSize: '0.78rem' }} aria-label="Backup text to restore" />
        </Modal>
      )}

      {confirmReset && (
        <Modal
          title="Delete all progress?"
          onClose={() => setConfirmReset(false)}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                  showToast('All progress deleted');
                }}
              >
                Delete everything
              </button>
            </>
          }
        >
          <p>This removes every attempt, score, note, flashcard schedule and drill result from this browser. It cannot be undone.</p>
        </Modal>
      )}
      {toast}
    </div>
  );
}
