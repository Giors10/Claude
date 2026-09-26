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
  const [toast, showToast] = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const hostTheme = inArtifact();

  const doExport = async () => {
    const ok = await saveFile(`esat-crucible-backup-${new Date().toISOString().slice(0, 10)}.json`, exportJson());
    showToast(ok ? 'Backup saved' : 'The download was blocked. Your data is still saved in this browser.');
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
