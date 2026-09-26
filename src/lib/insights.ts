import { topicName } from '../content/types';
import type { GradedModule } from './exam';
import { fmtDuration } from './format';

export interface Insight {
  tone: 'good' | 'warn' | 'bad' | 'info';
  title: string;
  detail: string;
}

/** Turn a graded module into specific, actionable feedback. */
export function moduleInsights(g: GradedModule, timed: boolean): Insight[] {
  const out: Insight[] = [];
  const items = g.items;
  const n = items.length;

  // 1. Unanswered questions (no negative marking).
  const blank = items.filter((i) => !i.answered);
  if (blank.length) {
    out.push({
      tone: 'bad',
      title: `${blank.length} question${blank.length > 1 ? 's' : ''} left blank`,
      detail: `There is no negative marking in the ESAT. Guessing on ${blank.length} question${blank.length > 1 ? 's' : ''} with 6 options would be worth about ${(blank.length / 6).toFixed(1)} marks on average. Always enter an answer before time runs out.`,
    });
  }

  // 2. Time sinks: well over target and still wrong.
  const sinks = items
    .filter((i) => i.ans.time > Math.max(150, i.q.time * 1.8) && !i.correct)
    .sort((a, b) => b.ans.time - a.ans.time)
    .slice(0, 3);
  if (sinks.length) {
    const lost = sinks.reduce((s, i) => s + i.ans.time - i.q.time, 0);
    out.push({
      tone: 'warn',
      title: 'Time sinks',
      detail: `${sinks.map((i) => `Q${i.q.n} (${fmtDuration(i.ans.time)})`).join(', ')} took far longer than planned and ${sinks.length > 1 ? 'were' : 'was'} still wrong, costing about ${fmtDuration(lost)}. Set yourself a hard limit of about 2½ minutes, flag the question and move on.`,
    });
  }

  // 3. Answer changes.
  const rightToWrong = items.filter((i) => i.ans.first === i.q.answer && i.ans.choice !== i.q.answer && i.ans.changes > 0).length;
  const wrongToRight = items.filter((i) => i.ans.first !== null && i.ans.first !== i.q.answer && i.ans.choice === i.q.answer).length;
  if (rightToWrong || wrongToRight) {
    out.push({
      tone: rightToWrong > wrongToRight ? 'warn' : 'good',
      title: 'Changing answers',
      detail: `You changed ${wrongToRight} answer${wrongToRight === 1 ? '' : 's'} from wrong to right and ${rightToWrong} from right to wrong. ${
        rightToWrong > wrongToRight ? 'Only change an answer when you have found a concrete error, not on a hunch.' : 'Your second looks are paying off. Keep checking flagged questions.'
      }`,
    });
  }

  // 4. Pacing at the halfway point.
  if (timed && n >= 10) {
    const half = Math.floor(n / 2);
    const usedHalf = items.slice(0, half).reduce((s, i) => s + i.ans.time, 0);
    const target = (g.run.limit || 2400) * (half / n);
    if (usedHalf > target * 1.2) {
      out.push({
        tone: 'warn',
        title: 'Slow first half',
        detail: `You used ${fmtDuration(usedHalf)} on the first ${half} questions against an even-pace target of ${fmtDuration(target)}. Later questions are usually harder, so bank time early.`,
      });
    } else if (usedHalf < target * 0.7 && g.raw < n * 0.6) {
      out.push({
        tone: 'info',
        title: 'Fast first half',
        detail: `You reached question ${half} in ${fmtDuration(usedHalf)}. Speed is good, but some early mistakes look avoidable. Spend a few more seconds checking units and signs.`,
      });
    }
  }

  // 5. Careless errors on easier questions.
  const easyWrong = items.filter((i) => i.q.difficulty <= 2 && i.answered && !i.correct);
  if (easyWrong.length) {
    out.push({
      tone: 'warn',
      title: 'Slips on easier questions',
      detail: `You dropped ${easyWrong.map((i) => 'Q' + i.q.n).join(', ')}, rated among the more accessible questions. These are the cheapest marks to recover: re-read the question and check units before committing.`,
    });
  }

  // 6. Hard questions answered correctly.
  const hardRight = items.filter((i) => i.q.difficulty >= 4 && i.correct);
  if (hardRight.length >= 2) {
    out.push({
      tone: 'good',
      title: 'Strong on the hardest questions',
      detail: `You got ${hardRight.length} of the ${items.filter((i) => i.q.difficulty >= 4).length} hardest questions right (${hardRight.map((i) => 'Q' + i.q.n).join(', ')}). That is what pushes a score above 7.`,
    });
  }

  // 7. Confidence calibration.
  const rated = items.filter((i) => i.ans.confidence && i.answered);
  if (rated.length >= 5) {
    const sureWrong = rated.filter((i) => i.ans.confidence === 'sure' && !i.correct);
    const guessRight = rated.filter((i) => i.ans.confidence === 'guess' && i.correct);
    const sure = rated.filter((i) => i.ans.confidence === 'sure');
    const sureAcc = sure.length ? Math.round((100 * sure.filter((i) => i.correct).length) / sure.length) : 0;
    out.push({
      tone: sureWrong.length > 1 ? 'warn' : 'good',
      title: 'Confidence check',
      detail: `When you were sure you were right ${sureAcc}% of the time.${
        sureWrong.length ? ` Confident but wrong on ${sureWrong.map((i) => 'Q' + i.q.n).join(', ')}: these point to misconceptions, so review them first.` : ''
      }${guessRight.length ? ` ${guessRight.length} guess${guessRight.length > 1 ? 'es' : ''} came off.` : ''}`,
    });
  }

  // 8. Weakest topics.
  const byTopic = new Map<string, { c: number; t: number }>();
  items.forEach((i) => {
    const e = byTopic.get(i.q.topic) ?? { c: 0, t: 0 };
    e.t++;
    if (i.correct) e.c++;
    byTopic.set(i.q.topic, e);
  });
  const weak = [...byTopic.entries()].filter(([, e]) => e.t >= 2 && e.c / e.t < 0.5).sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t);
  if (weak.length) {
    out.push({
      tone: 'info',
      title: 'Topics to revise next',
      detail: weak
        .slice(0, 3)
        .map(([k, e]) => `${topicName(k)} (${k}, ${e.c}/${e.t})`)
        .join(', ') + '. Each links to notes in the Learn section.',
    });
  }

  if (!out.length) {
    out.push({ tone: 'good', title: 'Clean run', detail: 'No pacing problems, no blanks and no costly slips. Try the paper again in strict mode, or move on to timed topic drills.' });
  }
  return out;
}
