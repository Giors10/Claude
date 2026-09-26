import React, { Suspense, useEffect, useState } from 'react';
import { BrandMark, Icon } from './components/Icon';
import { getAttempt } from './lib/exam';
import { daysUntil, fmtDate } from './lib/format';
import { inArtifact } from './lib/platform';
import { href, navigate, useRoute } from './lib/router';
import { flush, useStore } from './lib/store';
import { mistakesDue } from './lib/exam';
import { HomePage } from './pages/Home';
import { PaperPage } from './pages/Paper';
import { ExamPage } from './pages/Exam';
import { ResultsPage } from './pages/Results';
import { ReviewPage } from './pages/Review';
import { PracticePage } from './pages/Practice';
import { BankPage } from './pages/Bank';
import { QuestionPage } from './pages/Question';
import { LearnPage } from './pages/Learn';
import { FlashcardsPage } from './pages/Flashcards';
import { DrillsPage } from './pages/Drills';
import { FormulasPage } from './pages/Formulas';
import { StrategyPage } from './pages/Strategy';
import { PlannerPage } from './pages/Planner';
import { ProgressPage } from './pages/Progress';
import { CalculatorPage } from './pages/Calculator';
import { SettingsPage } from './pages/Settings';
import { AboutPage } from './pages/About';

interface NavItem {
  route: string;
  label: string;
  icon: string;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: 'Prepare',
    items: [
      { route: 'home', label: 'Dashboard', icon: 'home' },
      { route: 'paper', label: 'Crucible paper', icon: 'paper' },
      { route: 'practice', label: 'Practice', icon: 'target' },
      { route: 'bank', label: 'Question bank', icon: 'bank' },
    ],
  },
  {
    group: 'Learn',
    items: [
      { route: 'learn', label: 'Topic notes', icon: 'learn' },
      { route: 'formulas', label: 'Formula sheet', icon: 'formula' },
      { route: 'cards', label: 'Flashcards', icon: 'cards' },
      { route: 'drills', label: 'Speed drills', icon: 'bolt' },
      { route: 'strategy', label: 'Exam strategy', icon: 'compass' },
    ],
  },
  {
    group: 'Track',
    items: [
      { route: 'progress', label: 'Progress', icon: 'chart' },
      { route: 'planner', label: 'Study planner', icon: 'calendar' },
      { route: 'calculator', label: 'Score calculator', icon: 'calculator' },
    ],
  },
];

const SECTION_OF: Record<string, string> = {
  results: 'paper',
  review: 'paper',
  exam: 'paper',
  question: 'bank',
};

function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const route = useRoute();
  const testDate = useStore((s) => s.settings.testDate);
  const dueCount = useStore((s) => mistakesDue(s).length);
  const active = SECTION_OF[route.name] ?? route.name;
  const days = daysUntil(testDate);
  return (
    <aside className="sidebar" data-open={open} aria-label="Main navigation">
      <a className="brand" href={href('home')} onClick={onNavigate}>
        <BrandMark className="brand-mark" />
        <span>
          <div className="brand-name">Crucible</div>
          <div className="brand-sub">ESAT preparation</div>
        </span>
      </a>
      <nav className="nav">
        {NAV.map((g) => (
          <React.Fragment key={g.group}>
            <div className="nav-group-label">{g.group}</div>
            {g.items.map((it) => (
              <a
                key={it.route}
                href={href(it.route)}
                className="nav-link"
                aria-current={active === it.route ? 'page' : undefined}
                onClick={onNavigate}
              >
                <Icon name={it.icon} />
                {it.label}
                {it.route === 'practice' && dueCount > 0 && <span className="nav-badge" title="Mistakes due for review">{dueCount}</span>}
              </a>
            ))}
          </React.Fragment>
        ))}
        <div className="nav-group-label">More</div>
        <a href={href('settings')} className="nav-link" aria-current={active === 'settings' ? 'page' : undefined} onClick={onNavigate}>
          <Icon name="settings" />
          Settings &amp; data
        </a>
        <a href={href('about')} className="nav-link" aria-current={active === 'about' ? 'page' : undefined} onClick={onNavigate}>
          <Icon name="info" />
          About &amp; scoring method
        </a>
      </nav>
      <a className="sidebar-foot" href={href('planner')} onClick={onNavigate} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="eyebrow">Your ESAT</div>
        {days > 0 ? (
          <>
            <div className="countdown-num tnum">{days}</div>
            <div className="muted" style={{ fontSize: '0.82rem' }}>
              day{days === 1 ? '' : 's'} to go · {fmtDate(new Date(testDate + 'T00:00:00').getTime())}
            </div>
          </>
        ) : days === 0 ? (
          <div style={{ fontWeight: 700 }}>Today. Good luck!</div>
        ) : (
          <div className="muted" style={{ fontSize: '0.84rem' }}>
            Set your next test date in the planner.
          </div>
        )}
      </a>
    </aside>
  );
}

function ResumeBanner() {
  const route = useRoute();
  const active = useStore((s) => getAttempt(s.activeId, s));
  if (!active || route.name === 'exam') return null;
  return (
    <div className="page" style={{ paddingBottom: 0, paddingTop: 18 }}>
      <div className="note note-warn row-between">
        <span>
          <strong>{active.title}</strong> is in progress{active.kind === 'mock' && active.strict ? '. The clock keeps running while you are away.' : '.'}
        </span>
        <a className="btn btn-sm btn-glow" href={href('exam')}>
          <Icon name="play" /> Resume
        </a>
      </div>
    </div>
  );
}

function Page() {
  const route = useRoute();
  const [a0, a1] = route.args;
  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'paper':
      return <PaperPage />;
    case 'exam':
      return <ExamPage />;
    case 'results':
      return <ResultsPage attemptId={a0} />;
    case 'review':
      return <ReviewPage attemptId={a0} qid={a1} />;
    case 'practice':
      return <PracticePage preset={a0} arg={a1} />;
    case 'bank':
      return <BankPage />;
    case 'question':
      return <QuestionPage qid={a0} />;
    case 'learn':
      return <LearnPage topic={a0} />;
    case 'cards':
      return <FlashcardsPage deck={a0} />;
    case 'drills':
      return <DrillsPage />;
    case 'formulas':
      return <FormulasPage />;
    case 'strategy':
      return <StrategyPage />;
    case 'planner':
      return <PlannerPage />;
    case 'progress':
      return <ProgressPage />;
    case 'calculator':
      return <CalculatorPage />;
    case 'settings':
      return <SettingsPage />;
    case 'about':
      return <AboutPage />;
    default:
      return (
        <div className="page">
          <div className="empty">
            That page does not exist. <a href={href('home')}>Go to the dashboard</a>
          </div>
        </div>
      );
  }
}

export function App() {
  const [open, setOpen] = useState(false);
  const route = useRoute();
  const theme = useStore((s) => s.settings.theme);
  const textSize = useStore((s) => s.settings.textSize);

  useEffect(() => {
    // Inside the claude.ai viewer the host controls the theme.
    if (inArtifact()) return;
    const root = document.documentElement;
    if (theme !== 'system') {
      root.setAttribute('data-theme', theme);
      root.dataset.themeSetBy = 'app';
    } else if (root.dataset.themeSetBy === 'app') {
      // Only undo a choice this app made; never remove a theme stamped by a host page.
      root.removeAttribute('data-theme');
      delete root.dataset.themeSetBy;
    }
  }, [theme]);

  useEffect(() => {
    const size = { m: '1.0625rem', l: '1.1875rem', xl: '1.3125rem' }[textSize];
    document.documentElement.style.setProperty('--q-size', size);
  }, [textSize]);

  useEffect(() => {
    const onHide = () => flush();
    window.addEventListener('pagehide', onHide);
    document.addEventListener('visibilitychange', onHide);
    return () => {
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, []);

  useEffect(() => setOpen(false), [route]);

  if (route.name === 'exam') {
    return <ExamPage />;
  }

  return (
    <div className="shell">
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      {open && <div className="sidebar-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
      <div className="main">
        <header className="topbar">
          <button type="button" className="icon-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <Icon name="menu" />
          </button>
          <a className="brand" href={href('home')} style={{ padding: 0 }}>
            <BrandMark className="brand-mark" />
            <span className="brand-name">Crucible</span>
          </a>
          <span style={{ flex: 1 }} />
          <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate('paper')}>
            <Icon name="play" /> Sit paper
          </button>
        </header>
        <ResumeBanner />
        <Suspense fallback={null}>
          <Page />
        </Suspense>
        <footer className="footer">
          ESAT Crucible is an independent study tool, not affiliated with or endorsed by UAT-UK, the University of Cambridge or Imperial College
          London. The predicted paper is original; scores are model-based estimates.
        </footer>
      </div>
    </div>
  );
}
