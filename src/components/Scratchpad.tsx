import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const saved = new Map<string, string>();

/**
 * A full-screen drawing surface standing in for the erasable booklet you get
 * in the real test. Drawings persist per `padKey` for the life of the page.
 */
export function Scratchpad({ padKey, onClose }: { padKey: string; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const drawing = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const resize = () => {
      const snapshot = canvas.width ? canvas.toDataURL() : saved.get(padKey);
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (snapshot) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = snapshot;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
      try {
        saved.set(padKey, canvas.toDataURL());
      } catch {
        /* ignore */
      }
    };
  }, [padKey, onClose]);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent) => {
    canvasRef.current!.setPointerCapture(e.pointerId);
    drawing.current = pos(e);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = pos(e);
    const styles = getComputedStyle(document.documentElement);
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = styles.getPropertyValue('--ink').trim() || '#111';
    ctx.lineWidth = tool === 'eraser' ? 22 : e.pressure && e.pointerType === 'pen' ? 1 + e.pressure * 2.5 : 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(drawing.current.x, drawing.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    drawing.current = p;
  };

  const up = () => {
    drawing.current = null;
  };

  const clear = () => {
    const c = canvasRef.current!;
    c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className="scratch" role="dialog" aria-modal="true" aria-label="Scratchpad">
      <div className="scratch-bar">
        <strong>Scratchpad</strong>
        <span className="muted hide-sm" style={{ fontSize: '0.84rem' }}>
          Your working stays here until the module ends.
        </span>
        <span style={{ flex: 1 }} />
        <div className="seg" role="group" aria-label="Drawing tool">
          <button type="button" aria-pressed={tool === 'pen'} onClick={() => setTool('pen')}>
            <Icon name="pen" size={15} /> Pen
          </button>
          <button type="button" aria-pressed={tool === 'eraser'} onClick={() => setTool('eraser')}>
            <Icon name="eraser" size={15} /> Eraser
          </button>
        </div>
        <button type="button" className="btn btn-sm" onClick={clear}>
          <Icon name="trash" /> Clear
        </button>
        <button type="button" className="btn btn-sm btn-primary" onClick={onClose}>
          Back to question
        </button>
      </div>
      <canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up} />
    </div>
  );
}
