import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Menu,
  Home,
  Heart,
  Star,
  Shuffle,
  ArrowRight,
  HelpCircle,
  Trash2,
  X,
  Lock,
  Check,
  Camera,
  ChevronRight,
  BookOpen,
  Info,
} from "lucide-react";

/* ============================================================
   minimo-mono — English phrase quiz
   Web (React) build. Bento panels / skeleton buttons / round edges.
   All sizing is relative: container-query units (cqmin) + flex + %.
   ============================================================ */

/* ---------- Data ---------- */

const QUESTIONS = [
  {
    id: 1, word: "make a decision", meaning: "決定を下す", difficulty: 1,
    variations: [
      { id: "1-A", options: [
        { id: "a", text: "to choose after considering the options", isCorrect: true },
        { id: "b", text: "to postpone thinking about a problem" },
        { id: "c", text: "to ask someone else for their opinion" },
        { id: "d", text: "to regret a choice you have made" },
      ]},
      { id: "1-B", options: [
        { id: "a", text: "to reach a conclusion", isCorrect: true },
        { id: "b", text: "to start a completely new project" },
        { id: "c", text: "to make a careless mistake" },
        { id: "d", text: "to discover a hidden object" },
      ]},
    ],
  },
  {
    id: 2, word: "look forward to", meaning: "〜を楽しみに待つ", difficulty: 1,
    variations: [
      { id: "2-A", options: [
        { id: "a", text: "to feel pleased about something that will happen", isCorrect: true },
        { id: "b", text: "to look carefully at a distant object" },
        { id: "c", text: "to remember a past event fondly" },
        { id: "d", text: "to worry about an upcoming test" },
      ]},
    ],
  },
  {
    id: 3, word: "give up", meaning: "〜をあきらめる", difficulty: 1,
    variations: [
      { id: "3-A", options: [
        { id: "a", text: "to stop trying to do something", isCorrect: true },
        { id: "b", text: "to keep working on a task even when it has become extremely difficult and everyone around you has already walked away from it" },
        { id: "c", text: "to hand a gift to a friend" },
        { id: "d", text: "to try again with more effort" },
      ]},
    ],
  },
  {
    id: 4, word: "find out", meaning: "〜を知る、突き止める", difficulty: 1,
    variations: [
      { id: "4-A", options: [
        { id: "a", text: "to learn a fact by searching or asking", isCorrect: true },
        { id: "b", text: "to lose something in a crowded place" },
        { id: "c", text: "to leave a building in a hurry" },
        { id: "d", text: "to keep a secret from everyone" },
      ]},
    ],
  },
  {
    id: 5, word: "take care of", meaning: "〜の世話をする", difficulty: 1,
    variations: [
      { id: "5-A", options: [
        { id: "a", text: "to look after someone or something", isCorrect: true },
        { id: "b", text: "to carry a heavy box carefully" },
        { id: "c", text: "to warn a person about danger" },
        { id: "d", text: "to pay attention to a lecture" },
      ]},
    ],
  },
  {
    id: 6, word: "take advantage of", meaning: "〜を利用する、〜につけ込む", difficulty: 2,
    variations: [
      { id: "6-A", options: [
        { id: "a", text: "to use an opportunity to get a result", isCorrect: true },
        { id: "b", text: "to lose a chance to win a game" },
        { id: "c", text: "to give someone else a benefit" },
        { id: "d", text: "to wait for the right moment" },
      ]},
    ],
  },
  {
    id: 7, word: "come up with", meaning: "（案を）思いつく", difficulty: 2,
    variations: [
      { id: "7-A", options: [
        { id: "a", text: "to think of an idea or a plan", isCorrect: true },
        { id: "b", text: "to walk toward someone slowly" },
        { id: "c", text: "to agree with another person" },
        { id: "d", text: "to arrive later than expected" },
      ]},
    ],
  },
  {
    id: 8, word: "put up with", meaning: "〜を我慢する", difficulty: 2,
    variations: [
      { id: "8-A", options: [
        { id: "a", text: "to accept something unpleasant without complaining", isCorrect: true },
        { id: "b", text: "to hang a picture on a wall" },
        { id: "c", text: "to stay at a friend's house overnight" },
        { id: "d", text: "to argue loudly about a small thing" },
      ]},
      { id: "8-B", options: [
        { id: "a", text: "to tolerate a difficult person or situation", isCorrect: true },
        { id: "b", text: "to raise your hand before speaking" },
        { id: "c", text: "to catch up with a fast runner" },
        { id: "d", text: "to put an object back in its place" },
      ]},
    ],
  },
  {
    id: 9, word: "run out of", meaning: "〜を切らす", difficulty: 2,
    variations: [
      { id: "9-A", options: [
        { id: "a", text: "to use all of a supply and have none left", isCorrect: true },
        { id: "b", text: "to leave a room very quickly" },
        { id: "c", text: "to buy a large amount of something" },
        { id: "d", text: "to escape from a dangerous place" },
      ]},
    ],
  },
  {
    id: 10, word: "be in charge of", meaning: "〜を担当している", difficulty: 2,
    variations: [
      { id: "10-A", options: [
        { id: "a", text: "to have control or responsibility for something", isCorrect: true },
        { id: "b", text: "to pay a fee for a service" },
        { id: "c", text: "to fill a battery with power" },
        { id: "d", text: "to be a member of a large team" },
      ]},
    ],
  },
  {
    id: 11, word: "get the hang of", meaning: "〜のコツをつかむ", difficulty: 3,
    variations: [
      { id: "11-A", options: [
        { id: "a", text: "to learn how to do something with practice", isCorrect: true },
        { id: "b", text: "to hold onto a rope tightly" },
        { id: "c", text: "to give up on a difficult skill" },
        { id: "d", text: "to explain a method to a beginner" },
      ]},
    ],
  },
  {
    id: 12, word: "take for granted", meaning: "〜を当然のことと思う", difficulty: 3,
    variations: [
      { id: "12-A", options: [
        { id: "a", text: "to fail to appreciate something because it is always there", isCorrect: true },
        { id: "b", text: "to accept a gift with thanks" },
        { id: "c", text: "to allow someone to borrow money" },
        { id: "d", text: "to doubt a statement without evidence" },
      ]},
    ],
  },
  {
    id: 13, word: "cut corners", meaning: "手を抜く、経費を切り詰める", difficulty: 3,
    variations: [
      { id: "13-A", options: [
        { id: "a", text: "to do something cheaply or quickly, hurting quality", isCorrect: true },
        { id: "b", text: "to turn sharply while driving" },
        { id: "c", text: "to trim the edges of a paper" },
        { id: "d", text: "to finish a task ahead of schedule" },
      ]},
    ],
  },
  {
    id: 14, word: "keep track of", meaning: "〜を把握し続ける", difficulty: 3,
    variations: [
      { id: "14-A", options: [
        { id: "a", text: "to stay informed about how something changes", isCorrect: true },
        { id: "b", text: "to follow a path through a forest" },
        { id: "c", text: "to forget an appointment completely" },
        { id: "d", text: "to keep a train running on time" },
      ]},
    ],
  },
  {
    id: 15, word: "make up for", meaning: "〜の埋め合わせをする", difficulty: 3,
    variations: [
      { id: "15-A", options: [
        { id: "a", text: "to do something good to balance a mistake or loss", isCorrect: true },
        { id: "b", text: "to invent a story that is not true" },
        { id: "c", text: "to prepare a room for a guest" },
        { id: "d", text: "to decide on a final answer" },
      ]},
    ],
  },
  {
    id: 16, word: "bite the bullet", meaning: "覚悟を決めて耐える", difficulty: 4,
    variations: [
      { id: "16-A", options: [
        { id: "a", text: "to face something painful with courage", isCorrect: true },
        { id: "b", text: "to speak angrily to a rival" },
        { id: "c", text: "to eat a meal very quickly" },
        { id: "d", text: "to avoid a difficult conversation" },
      ]},
    ],
  },
  {
    id: 17, word: "throw in the towel", meaning: "敗北を認める、降参する", difficulty: 4,
    variations: [
      { id: "17-A", options: [
        { id: "a", text: "to admit defeat and stop competing", isCorrect: true },
        { id: "b", text: "to clean a surface with a cloth" },
        { id: "c", text: "to celebrate an unexpected victory" },
        { id: "d", text: "to join a contest at the last minute" },
      ]},
    ],
  },
  {
    id: 18, word: "hit the nail on the head", meaning: "的を射る、核心を突く", difficulty: 4,
    variations: [
      { id: "18-A", options: [
        { id: "a", text: "to describe a situation exactly right", isCorrect: true },
        { id: "b", text: "to injure yourself while working" },
        { id: "c", text: "to repair a broken piece of furniture" },
        { id: "d", text: "to criticize someone in public" },
      ]},
    ],
  },
  {
    id: 19, word: "beat around the bush", meaning: "遠回しに言う", difficulty: 4,
    variations: [
      { id: "19-A", options: [
        { id: "a", text: "to avoid saying the main point directly", isCorrect: true },
        { id: "b", text: "to search a garden for a lost key" },
        { id: "c", text: "to argue with someone for a long time" },
        { id: "d", text: "to repeat the same request politely" },
      ]},
    ],
  },
  {
    id: 20, word: "go the extra mile", meaning: "期待以上の努力をする", difficulty: 4,
    variations: [
      { id: "20-A", options: [
        { id: "a", text: "to make more effort than is expected", isCorrect: true },
        { id: "b", text: "to travel a long distance on foot" },
        { id: "c", text: "to finish a race in last place" },
        { id: "d", text: "to ask a colleague for extra help" },
      ]},
    ],
  },
];

const INFO = {
  classic: {
    title: "Classic",
    body:
      "全100問に挑戦するメインモードです。\n進むほど難易度が上がり、ライフは3つ。\nベストスコアはこのモードでのみ記録されます。",
  },
  dogrun: {
    title: "Dogrun（開発中）",
    body:
      "Classic の高難易度バージョンです。\n最初から上位レベルの問題だけが出題されます。\n\n現在開発中のため、まだ開けません。",
  },
  practice: {
    title: "Practice",
    body:
      "Lv.1〜4：選んだ難易度だけを繰り返し練習できます。\nList：全問題の確認と、星（ブックマーク）の管理。\nCustom：星をつけた問題だけを出題します。\n\nPracticeの各モードではスコアは記録されません。",
  },
  howto: {
    title: "How to play",
    body:
      "英語のフレーズに対して、正しい意味を4択から選びます。\n\n・制限時間は1問あたり15秒。\n・スコアは「基本点＋難易度ボーナス＋残り時間」で決まります。\n・間違い、または時間切れでライフが1つ減ります。\n・ライフが0になるとその回は終了です。\n\n気になったフレーズは★を押すと保存され、Customモードでまとめて復習できます。",
  },
  credits: {
    title: "Credits",
    body:
      "minimo-mono\nversion 0.1.0 — web preview\n\nDesign & build: you\nBuilt with React\n\n© minimo-mono",
  },
};

const ANIMALS = [
  "lion", "tiger", "panda", "koala", "penguin", "dolphin",
  "giraffe", "elephant", "rabbit", "squirrel", "hedgehog", "otter",
  "seal", "camel", "zebra", "kangaroo", "raccoon", "fox",
  "owl", "whale", "walrus", "hippo", "gorilla", "sheep",
  "deer", "crocodile", "flamingo", "peacock", "turtle", "bear",
];

/* ---------- Helpers ---------- */

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickDifficulty = (qNum) => {
  const target = 1 + 3 * ((qNum - 1) / 99);
  const weights = [1, 2, 3, 4].map((d) => ({ d, w: 1 / (1 + (target - d) ** 2) }));
  const total = weights.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const x of weights) {
    r -= x.w;
    if (r <= 0) return x.d;
  }
  return 4;
};

const ROUND_TIME = 15;
const CLASSIC_LENGTH = 100;

/* ---------- Sound (WebAudio, no assets) ---------- */

function useSound() {
  const ctxRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const stateRef = useRef({ volume, muted });
  stateRef.current = { volume, muted };

  const tone = useCallback((freq, dur, delay = 0, type = "sine") => {
    const { volume: v, muted: m } = stateRef.current;
    if (m || v <= 0) return;
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctxRef.current = new AC();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const t0 = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.22 * v, t0 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch (e) {
      /* audio is optional */
    }
  }, []);

  return {
    volume, setVolume, muted, setMuted,
    correct: useCallback(() => { tone(784, 0.12); tone(1175, 0.18, 0.09); }, [tone]),
    wrong: useCallback(() => { tone(196, 0.22, 0, "triangle"); }, [tone]),
    tick: useCallback(() => { tone(523, 0.1); }, [tone]),
    tap: useCallback(() => { tone(660, 0.05); }, [tone]),
  };
}

/* ---------- Small UI atoms ---------- */

const Ico = ({ as: C, s = 5, fill = "none" }) => (
  <span className="mm-ico" style={{ width: `${s}cqmin`, height: `${s}cqmin` }}>
    <C size="100%" strokeWidth={1.7} fill={fill} />
  </span>
);

const Panel = ({ children, className = "", style, grow }) => (
  <section
    className={`mm-panel ${className}`}
    style={{ ...(grow ? { flex: grow } : null), ...style }}
  >
    {children}
  </section>
);

const Eyebrow = ({ children, right }) => (
  <div className="mm-eyebrow-row">
    <span className="mm-eyebrow">{children}</span>
    {right}
  </div>
);

const Btn = ({ children, onClick, disabled, variant = "", className = "", title }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={`mm-btn ${variant ? `mm-btn--${variant}` : ""} ${className}`}
  >
    {children}
  </button>
);

/* ---------- Chrome: header / footer ---------- */

function Header({ screen, onHome, onOpenSettings }) {
  const homeEnabled = screen === "play" || screen === "list" || screen === "result";
  return (
    <header className="mm-panel mm-header">
      <Btn variant="icon" onClick={onOpenSettings} title="Settings">
        <Ico as={Menu} s={5} />
      </Btn>
      <span className="mm-wordmark">minimo<span className="mm-dash">-</span>mono</span>
      <Btn variant="icon" onClick={onHome} disabled={!homeEnabled} title="Home">
        <Ico as={Home} s={5} />
      </Btn>
    </header>
  );
}

function Footer({ note }) {
  return (
    <footer className="mm-footer">
      <span className="mm-footer-note">{note}</span>
      <span className="mm-footer-mark">© minimo-mono</span>
    </footer>
  );
}

/* ---------- Overlay (modal / settings) ---------- */

function Overlay({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="mm-overlay" onClick={onClose}>
      <div className="mm-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="mm-sheet-head">
          <span className="mm-eyebrow">{title}</span>
          <Btn variant="icon-sm" onClick={onClose} title="Close">
            <Ico as={X} s={4} />
          </Btn>
        </div>
        <div className="mm-sheet-body">{children}</div>
        {footer && <div className="mm-sheet-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Screen: Start ---------- */

function StartScreen({ onStart }) {
  return (
    <button className="mm-start" onClick={onStart}>
      <div className="mm-start-mark">
        <span className="mm-start-title">minimo</span>
        <span className="mm-start-rule" />
        <span className="mm-start-title mm-start-title--light">mono</span>
      </div>
      <span className="mm-start-cta">tap to start</span>
    </button>
  );
}

/* ---------- Screen: Home ---------- */

function ModeCard({ eyebrow, name, statValue, action, onInfo, locked }) {
  return (
    <Panel className={`mm-mode ${locked ? "mm-locked" : ""}`}>
      <Eyebrow right={<Btn variant="icon-sm" onClick={onInfo}><Ico as={HelpCircle} s={4} /></Btn>}>
        {eyebrow}
      </Eyebrow>
      <div className="mm-mode-row">
        <h2 className="mm-mode-name">{name}</h2>
        <div className="mm-stat">
          <span className="mm-stat-label">best</span>
          <span className="mm-stat-value">{statValue}</span>
        </div>
      </div>
      {action}
    </Panel>
  );
}

function HomeScreen({ best, bookmarks, onPlay, onList, onInfo, onNotice }) {
  return (
    <div className="mm-stack mm-fade">
      <ModeCard
        eyebrow="main mode"
        name="Classic"
        statValue={String(best).padStart(4, "0")}
        onInfo={() => onInfo("classic")}
        action={
          <Btn variant="solid" className="mm-wide" onClick={() => onPlay({ mode: "classic" })}>
            Start
          </Btn>
        }
      />

      <ModeCard
        locked
        eyebrow="hard mode"
        name="Dogrun"
        statValue="––––"
        onInfo={() => onInfo("dogrun")}
        action={
          <Btn className="mm-wide" disabled>
            <Ico as={Lock} s={4} />
            <span>Coming soon</span>
          </Btn>
        }
      />

      <Panel className="mm-practice">
        <Eyebrow right={<Btn variant="icon-sm" onClick={() => onInfo("practice")}><Ico as={HelpCircle} s={4} /></Btn>}>
          practice
        </Eyebrow>
        <div className="mm-grid">
          {[1, 2, 3, 4].map((d) => (
            <Btn key={d} onClick={() => onPlay({ mode: "practice", difficulty: d })}>
              <span className="mm-grid-label">Lv.{d}</span>
              <span className="mm-grid-sub">
                {QUESTIONS.filter((q) => q.difficulty === d).length} items
              </span>
            </Btn>
          ))}
        </div>
      </Panel>

      <Panel className="mm-shortcuts">
        <div className="mm-row-2">
          <Btn className="mm-tall" onClick={onList}>
            <span className="mm-grid-label">List</span>
          </Btn>
          <Btn
            className="mm-tall"
            onClick={() =>
              bookmarks.length
                ? onPlay({ mode: "custom", customIds: bookmarks })
                : onNotice()
            }
          >
            <span className="mm-grid-label">Custom</span>
            <span className="mm-grid-sub">{bookmarks.length} starred</span>
          </Btn>
        </div>
      </Panel>
    </div>
  );
}

/* ---------- Screen: Play ---------- */

const SEGMENTS = 26;

function Meter({ ratio }) {
  const filled = Math.ceil(ratio * SEGMENTS);
  return (
    <div className="mm-meter" aria-hidden="true">
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <span key={i} className={`mm-seg ${i < filled ? "on" : ""}`} />
      ))}
    </div>
  );
}

function PlayScreen({ config, sound, bookmarks, onToggleBookmark, onGameOver }) {
  const pool = useMemo(() => {
    if (config.mode === "practice")
      return QUESTIONS.filter((q) => q.difficulty === config.difficulty);
    if (config.mode === "custom") {
      const list = QUESTIONS.filter((q) => config.customIds.includes(q.id));
      return list.length ? list : QUESTIONS;
    }
    return QUESTIONS;
  }, [config]);

  const [counting, setCounting] = useState(config.mode === "classic");
  const [count, setCount] = useState(3);
  const [qNum, setQNum] = useState(1);
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [lives, setLives] = useState(3);
  const [picked, setPicked] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const overRef = useRef(false);

  const nextQuestion = useCallback(
    (n) => {
      let candidates = pool;
      if (config.mode === "classic") {
        const d = pickDifficulty(n);
        const byDiff = QUESTIONS.filter((q) => q.difficulty === d);
        candidates = byDiff.length ? byDiff : QUESTIONS;
      }
      const w = candidates[Math.floor(Math.random() * candidates.length)];
      const v = w.variations[Math.floor(Math.random() * w.variations.length)];
      setCurrent({
        id: w.id,
        word: w.word,
        meaning: w.meaning,
        difficulty: w.difficulty,
        options: shuffle(v.options),
      });
      setPicked(null);
      setTimeLeft(ROUND_TIME);
      setQNum(n);
    },
    [pool, config.mode]
  );

  useEffect(() => {
    if (!counting) {
      nextQuestion(1);
      return;
    }
    sound.tick();
    let c = 3;
    const id = setInterval(() => {
      c -= 1;
      if (c > 0) {
        setCount(c);
        sound.tick();
      } else {
        clearInterval(id);
        setCounting(false);
        nextQuestion(1);
      }
    }, 800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answered = picked !== null;

  const settle = useCallback(
    (isCorrect, remaining) => {
      let nextScore = score;
      let nextLives = lives;
      if (isCorrect) {
        nextScore += 100 + (current.difficulty - 1) * 20 + Math.ceil(remaining) * 5;
        setScore(nextScore);
        setCorrect((c) => c + 1);
        sound.correct();
      } else {
        nextLives -= 1;
        setLives(nextLives);
        sound.wrong();
      }
      overRef.current =
        nextLives <= 0 || (config.mode === "classic" && qNum >= CLASSIC_LENGTH);
      return nextScore;
    },
    [score, lives, current, qNum, config.mode, sound]
  );

  useEffect(() => {
    if (counting || answered || !current || timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, +(t - 0.1).toFixed(1)));
    }, 100);
    return () => clearInterval(id);
  }, [counting, answered, current, timeLeft <= 0]);

  useEffect(() => {
    if (counting || answered || !current || timeLeft > 0) return;
    setPicked("timeout");
    settle(false, 0);
  }, [timeLeft, counting, answered, current, settle]);

  const choose = (opt) => {
    if (answered) return;
    setPicked(opt.id);
    settle(!!opt.isCorrect, timeLeft);
  };

  const advance = () => {
    if (overRef.current)
      onGameOver({ score, mode: config.mode, reached: qNum, correct, answered: qNum });
    else nextQuestion(qNum + 1);
  };

  if (counting)
    return (
      <div className="mm-panel mm-count">
        <span className="mm-eyebrow">get ready</span>
        <span className="mm-count-num">{count}</span>
      </div>
    );

  if (!current) return <div className="mm-panel mm-count" />;

  const starred = bookmarks.includes(current.id);

  return (
    <div className="mm-stack mm-fade">
      <Panel className="mm-status">
        <div className="mm-status-left">
          <span className="mm-eyebrow">q</span>
          <span className="mm-qnum">
            {String(qNum).padStart(2, "0")}
            {config.mode === "classic" && <i>/{CLASSIC_LENGTH}</i>}
          </span>
        </div>
        <div className="mm-hearts">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < lives ? "mm-heart on" : "mm-heart"}>
              <Ico as={Heart} s={4.2} fill={i < lives ? "currentColor" : "none"} />
            </span>
          ))}
        </div>
        <div className="mm-status-right">
          <span className="mm-score">{score}</span>
          <span className="mm-badge">{config.mode}</span>
        </div>
      </Panel>

      <Panel className="mm-question">
        <div className="mm-question-top">
          <span className="mm-eyebrow">lv.{current.difficulty}</span>
          <Btn
            variant="icon-sm"
            onClick={() => onToggleBookmark(current.id)}
            title="Star this phrase"
            className={starred ? "mm-starred" : ""}
          >
            <Ico as={Star} s={5.2} fill={starred ? "currentColor" : "none"} />
          </Btn>
        </div>
        <div className="mm-question-body">
          <h2 className="mm-word">{current.word}</h2>
          <p className={`mm-meaning ${answered ? "show" : ""}`}>{current.meaning}</p>
        </div>
        <Meter ratio={timeLeft / ROUND_TIME} />
      </Panel>

      <div className="mm-options">
        {current.options.map((o) => {
          let state = "";
          if (answered) {
            if (o.isCorrect) state = "is-correct";
            else if (picked === o.id) state = "is-wrong";
            else state = "is-dim";
          }
          return (
            <Btn key={o.id} className={`mm-option ${state}`} onClick={() => choose(o)} disabled={answered}>
              <span className="mm-option-text">{o.text}</span>
              {state === "is-correct" && <Ico as={Check} s={4} />}
              {state === "is-wrong" && <Ico as={X} s={4} />}
            </Btn>
          );
        })}
      </div>

      <Btn variant="solid" className="mm-wide mm-next" onClick={advance} disabled={!answered}>
        <span>{overRef.current ? "See result" : "Next"}</span>
        <Ico as={ArrowRight} s={4.4} />
      </Btn>
    </div>
  );
}

/* ---------- Screen: Result ---------- */

function ResultScreen({ result, best, isBest, onAgain, onHome }) {
  const [share, setShare] = useState(false);

  return (
    <div className="mm-stack mm-fade">
      <Panel grow="1" className="mm-result">
        <div className="mm-result-head">
          <span className="mm-eyebrow">{result.mode}</span>
          <Btn variant="icon-sm" onClick={() => setShare(true)} title="Share this run">
            <Ico as={Camera} s={5} />
          </Btn>
        </div>
        <div className="mm-result-body">
          <span className="mm-result-score">{result.score}</span>
          {isBest && <span className="mm-newbest">new best score</span>}
        </div>
        <div className="mm-result-meta">
          <div>
            <span className="mm-stat-label">reached</span>
            <span className="mm-stat-value">Q{String(result.reached).padStart(2, "0")}</span>
          </div>
          <div>
            <span className="mm-stat-label">correct</span>
            <span className="mm-stat-value">
              {result.correct}<i>/{result.answered}</i>
            </span>
          </div>
          <div>
            <span className="mm-stat-label">best</span>
            <span className="mm-stat-value">{String(best).padStart(4, "0")}</span>
          </div>
        </div>
        {result.mode !== "classic" && (
          <p className="mm-note">Practice runs are not saved to your best score.</p>
        )}
      </Panel>
      <Panel className="mm-shortcuts">
        <div className="mm-row-2">
          <Btn className="mm-tall" onClick={onAgain}>
            <span className="mm-grid-label">Play again</span>
          </Btn>
          <Btn className="mm-tall" variant="solid" onClick={onHome}>
            <span className="mm-grid-label">Home</span>
          </Btn>
        </div>
      </Panel>

      <Overlay
        open={share}
        onClose={() => setShare(false)}
        title="share"
        footer={
          <Btn className="mm-wide" onClick={() => setShare(false)}>
            Close
          </Btn>
        }
      >
        <p className="mm-body-text">
          Screenshot sharing is not available yet.{"\n"}This feature is still in progress.
        </p>
      </Overlay>
    </div>
  );
}

/* ---------- Screen: List ---------- */

const FILTERS = [
  { id: "all", label: "All" },
  { id: "1", label: "Lv.1" },
  { id: "2", label: "Lv.2" },
  { id: "3", label: "Lv.3" },
  { id: "4", label: "Lv.4" },
  { id: "star", label: "Starred", icon: true },
];

function ListScreen({ bookmarks, onToggleBookmark }) {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState(QUESTIONS);

  const visible = items.filter((q) => {
    if (filter === "all") return true;
    if (filter === "star") return bookmarks.includes(q.id);
    return String(q.difficulty) === filter;
  });

  return (
    <div className="mm-stack mm-fade">
      <Panel className="mm-list-head">
        <Eyebrow
          right={
            <Btn variant="icon-sm" onClick={() => setItems(shuffle(items))} title="Shuffle">
              <Ico as={Shuffle} s={4} />
            </Btn>
          }
        >
          {visible.length} of {QUESTIONS.length} phrases
        </Eyebrow>
        <div className="mm-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`mm-chip ${filter === f.id ? "on" : ""} ${f.icon ? "mm-chip--star" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.icon && <Ico as={Star} s={3.4} fill="currentColor" />}
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel grow="1" className="mm-list-panel">
        <div className="mm-scroll">
          {visible.length === 0 && (
            <p className="mm-empty">No starred phrases yet. Tap a star to add one.</p>
          )}
          {visible.map((q) => {
            const on = bookmarks.includes(q.id);
            return (
              <div key={q.id} className="mm-list-item">
                <span className="mm-list-lv">{q.difficulty}</span>
                <div className="mm-list-text">
                  <span className="mm-list-word">{q.word}</span>
                  <span className="mm-list-meaning">{q.meaning}</span>
                </div>
                <button
                  className={`mm-star ${on ? "on" : ""}`}
                  onClick={() => onToggleBookmark(q.id)}
                  title="Star"
                  aria-label="Star this phrase"
                >
                  <Ico as={Star} s={5.4} fill={on ? "currentColor" : "none"} />
                </button>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/* ---------- App ---------- */

export default function MinimoMono() {
  const [screen, setScreen] = useState("start");
  const [config, setConfig] = useState({ mode: "classic" });
  const [result, setResult] = useState({
    score: 0, mode: "classic", reached: 1, correct: 0, answered: 1,
  });
  const [best, setBest] = useState(() => {
    try {
      const saved = localStorage.getItem("minimo-mono:best");
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  });
  const [isBest, setIsBest] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("minimo-mono:bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [runKey, setRunKey] = useState(0);
  const [info, setInfo] = useState(null);
  const [settings, setSettings] = useState(false);
  const [animal, setAnimal] = useState(ANIMALS[0]);
  const [confirmClear, setConfirmClear] = useState(false);
  const [deleteIn, setDeleteIn] = useState(3);
  const sound = useSound();

  useEffect(() => {
    if (!confirmClear) {
      setDeleteIn(3);
      return;
    }
    setDeleteIn(3);
    const t = setInterval(() => {
      setDeleteIn((n) => {
        if (n <= 1) {
          clearInterval(t);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [confirmClear]);

  const toggleBookmark = (id) =>
    setBookmarks((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));

  useEffect(() => {
    try {
      localStorage.setItem("minimo-mono:best", String(best));
    } catch (e) {
      /* storage unavailable; best score just won't persist */
    }
  }, [best]);

  useEffect(() => {
    try {
      localStorage.setItem("minimo-mono:bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      /* storage unavailable; stars just won't persist */
    }
  }, [bookmarks]);

  const startRun = (cfg) => {
    setConfig(cfg);
    setRunKey((k) => k + 1);
    setScreen("play");
  };

  const finishRun = (r) => {
    setAnimal(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
    const beat = r.mode === "classic" && r.score > best;
    if (beat) setBest(r.score);
    setIsBest(beat);
    setResult(r);
    setScreen("result");
  };

  const closeSettings = () => {
    setSettings(false);
    setConfirmClear(false);
  };

  const resetAll = () => {
    setBest(0);
    setBookmarks([]);
    setConfirmClear(false);
    setSettings(false);
    setScreen("start");
  };

  const footNote =
    screen === "home"
      ? `${QUESTIONS.length} phrases`
      : screen === "list"
      ? "tap the star to save a phrase"
      : screen === "result"
      ? animal
      : `best ${String(best).padStart(4, "0")}`;

  return (
    <div className="mm-root">
      <style>{CSS}</style>
      <div className="mm-frame">
        <div className="mm-shell">
          {screen === "start" ? (
            <StartScreen
              onStart={() => {
                sound.tap();
                setScreen("home");
              }}
            />
          ) : (
            <>
              <Header
                screen={screen}
                onOpenSettings={() => setSettings(true)}
                onHome={() => setScreen("home")}
              />
              <main className="mm-main">
                {screen === "home" && (
                  <HomeScreen
                    best={best}
                    bookmarks={bookmarks}
                    onPlay={startRun}
                    onList={() => setScreen("list")}
                    onInfo={(k) => setInfo(INFO[k])}
                    onNotice={() =>
                      setInfo({
                        title: "No starred phrases",
                        body: "Custom は星をつけた問題だけを出題します。\nList か Play 画面で ★ を押して追加してください。",
                      })
                    }
                  />
                )}
                {screen === "play" && (
                  <PlayScreen
                    key={runKey}
                    config={config}
                    sound={sound}
                    bookmarks={bookmarks}
                    onToggleBookmark={toggleBookmark}
                    onGameOver={finishRun}
                  />
                )}
                {screen === "result" && (
                  <ResultScreen
                    result={result}
                    best={best}
                    isBest={isBest}
                    onAgain={() => startRun(config)}
                    onHome={() => setScreen("home")}
                  />
                )}
                {screen === "list" && (
                  <ListScreen bookmarks={bookmarks} onToggleBookmark={toggleBookmark} />
                )}
              </main>
              <Footer note={footNote} />
            </>
          )}

          <Overlay
            open={settings}
            onClose={closeSettings}
            title="settings"
            footer={
              confirmClear ? (
                <div className="mm-confirm">
                  <p className="mm-note mm-note--center">
                    This clears your best score and every starred phrase.
                    It cannot be undone.
                  </p>
                  <div className="mm-confirm-row">
                    <Btn className="mm-wide" onClick={() => setConfirmClear(false)}>
                      Cancel
                    </Btn>
                    <Btn
                      className="mm-wide mm-danger mm-danger--solid"
                      onClick={resetAll}
                      disabled={deleteIn > 0}
                    >
                      {deleteIn > 0 ? `Delete (${deleteIn})` : "Delete"}
                    </Btn>
                  </div>
                </div>
              ) : (
                <Btn className="mm-wide mm-danger" onClick={() => setConfirmClear(true)}>
                  <Ico as={Trash2} s={4} />
                  <span>Clear score and stars</span>
                </Btn>
              )
            }
          >
            <label className="mm-field">
              <span className="mm-stat-label">sound</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sound.volume}
                onChange={(e) => sound.setVolume(parseFloat(e.target.value))}
                className="mm-range"
                style={{ "--fill": `${sound.volume * 100}%` }}
              />
            </label>
            <div className="mm-field mm-field--row">
              <span className="mm-stat-label">mute</span>
              <button
                className={`mm-switch ${sound.muted ? "on" : ""}`}
                onClick={() => sound.setMuted((m) => !m)}
                aria-pressed={sound.muted}
                aria-label="Mute"
              >
                <span className="mm-knob" />
              </button>
            </div>

            <div className="mm-menu">
              <button className="mm-menu-row" onClick={() => setInfo(INFO.howto)}>
                <Ico as={BookOpen} s={4.4} />
                <span>How to play</span>
                <Ico as={ChevronRight} s={4.4} />
              </button>
              <button className="mm-menu-row" onClick={() => setInfo(INFO.credits)}>
                <Ico as={Info} s={4.4} />
                <span>Credits</span>
                <Ico as={ChevronRight} s={4.4} />
              </button>
            </div>
            <span className="mm-version">version 0.1.0 · web preview</span>
          </Overlay>

          <Overlay open={!!info} onClose={() => setInfo(null)} title={info?.title || ""}>
            <p className="mm-body-text">{info?.body}</p>
          </Overlay>
        </div>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const CSS = `
.mm-root {
  --ink: #111113;
  --ink-70: rgba(17,17,19,.66);
  --ink-40: rgba(17,17,19,.34);
  --ink-15: rgba(17,17,19,.14);
  --line: #E2E2E6;
  --panel: #FFFFFF;
  --surface: #F1F1F3;
  --backdrop: #DDDDE1;
  --good: #1F6F52;
  --good-bg: rgba(31,111,82,.09);
  --bad: #A33A32;
  --bad-bg: rgba(163,58,50,.08);

  --sans: ui-sans-serif, -apple-system, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5%;
  background: var(--backdrop);
  font-family: var(--sans);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

.mm-frame {
  position: relative;
  height: 100%;
  aspect-ratio: 9 / 16;
  max-width: 100%;
  container-type: size;

  --gap: 2.2cqmin;
  --pad: 3.6cqmin;
  --bw: 0.4cqmin;
  --r-xl: 6cqmin;
  --r-lg: 4.6cqmin;
  --r-md: 3.4cqmin;
  --r-sm: 2.4cqmin;
  --fs-xs: 2.5cqmin;
  --fs-sm: 3.2cqmin;
  --fs-md: 3.9cqmin;
  --fs-lg: 5.4cqmin;
  --fs-xl: 8cqmin;
}

.mm-shell {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--gap);
  background: var(--surface);
  border: var(--bw) solid var(--line);
  border-radius: var(--r-xl);
  overflow: hidden;
}

.mm-panel {
  background: var(--panel);
  border: var(--bw) solid var(--line);
  border-radius: var(--r-lg);
  padding: var(--pad);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  min-height: 0;
  overflow: hidden;
}

.mm-main { flex: 1; min-height: 0; display: flex; }
.mm-stack { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: var(--gap); }

/* header + footer */
.mm-header {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--pad) * 0.5) calc(var(--pad) * 0.7);
}
.mm-wordmark {
  font-family: var(--mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.24em;
  text-transform: lowercase;
}
.mm-dash { color: var(--ink-40); }
.mm-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--pad) * 0.6);
  font-family: var(--mono);
  gap: 3cqmin;
  font-size: var(--fs-xs);
  letter-spacing: 0.14em;
  color: var(--ink-40);
  text-transform: lowercase;
}

.mm-footer-note { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mm-footer-mark { flex: 0 0 auto; }

/* labels */
.mm-eyebrow-row { display: flex; align-items: center; justify-content: space-between; gap: var(--gap); }
.mm-eyebrow {
  font-family: var(--mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-40);
}

/* buttons — skeleton first */
.mm-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6cqmin;
  padding: calc(var(--pad) * 0.55) calc(var(--pad) * 0.7);
  border: var(--bw) solid var(--ink-15);
  border-radius: var(--r-md);
  background: transparent;
  color: var(--ink);
  font-family: var(--sans);
  font-size: var(--fs-md);
  font-weight: 500;
  line-height: 1.25;
  cursor: pointer;
  transition: background .16s ease, border-color .16s ease, transform .12s ease, opacity .16s ease;
  -webkit-tap-highlight-color: transparent;
}
.mm-btn:active:not(:disabled) { transform: scale(.985); }
.mm-btn:disabled { opacity: .34; cursor: default; }
.mm-btn:focus-visible { outline: var(--bw) solid var(--ink); outline-offset: 0.6cqmin; }

.mm-btn--solid { background: var(--ink); border-color: var(--ink); color: #fff; font-weight: 600; }

.mm-btn--icon, .mm-btn--icon-sm {
  padding: 0;
  aspect-ratio: 1;
  border-radius: var(--r-sm);
  flex: 0 0 auto;
}
.mm-btn--icon { width: 9.5cqmin; }
.mm-btn--icon-sm { width: 7.4cqmin; border-color: transparent; color: var(--ink-40); }
.mm-starred { color: var(--ink) !important; }
.mm-ico { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; }

.mm-wide { width: 100%; flex-direction: row; gap: 1.6cqmin; }
.mm-tall { flex: 1; height: 100%; }
.mm-danger { color: var(--bad); border-color: rgba(163,58,50,.3); }

/* start */
.mm-start {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4cqmin;
  border: none;
  background: transparent;
  cursor: pointer;
  animation: mmFade .7s ease both;
}
.mm-start-mark { display: flex; align-items: center; gap: 2.4cqmin; }
.mm-start-title { font-size: var(--fs-xl); font-weight: 600; letter-spacing: -0.03em; }
.mm-start-title--light { font-weight: 300; color: var(--ink-70); }
.mm-start-rule { width: 6cqmin; height: var(--bw); background: var(--ink-40); border-radius: var(--bw); }
.mm-start-sub { font-size: var(--fs-sm); color: var(--ink-40); margin: 0; }
.mm-start-cta {
  margin-top: 6cqmin;
  font-family: var(--mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ink);
  padding: 2cqmin 5cqmin;
  border: var(--bw) solid var(--ink-15);
  border-radius: 99cqmin;
  animation: mmPulse 2.4s ease-in-out infinite;
}

/* home */
.mm-mode { flex: 0 0 auto; gap: var(--gap); padding: calc(var(--pad) * 0.8) var(--pad); }
.mm-mode-row { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--gap); }
.mm-mode-name { margin: 0; font-size: var(--fs-lg); font-weight: 600; letter-spacing: -0.02em; }
.mm-locked { background: transparent; }
.mm-locked .mm-mode-name { color: var(--ink-40); font-weight: 500; }
.mm-locked .mm-stat-value { color: var(--ink-15); }
.mm-practice { flex: 1 1 auto; min-height: 0; }
.mm-shortcuts { flex: 0 0 auto; }

.mm-stat { display: flex; flex-direction: column; align-items: flex-end; }
.mm-stat-label {
  font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--ink-40);
}
.mm-stat-value { font-family: var(--mono); font-size: var(--fs-lg); font-weight: 500; letter-spacing: -0.02em; }

.mm-grid {
  flex: 1; display: grid; grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(0, 1fr); gap: var(--gap); min-height: 0;
}
.mm-grid .mm-btn { gap: 1cqmin; }
.mm-grid-label { font-size: var(--fs-md); font-weight: 600; }
.mm-grid-sub { font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.12em; color: var(--ink-40); }
.mm-row-2 { flex: 1; display: flex; gap: var(--gap); min-height: 14cqmin; }

/* play */
.mm-status { flex-direction: row; align-items: center; justify-content: space-between; padding: calc(var(--pad) * 0.6) var(--pad); }
.mm-status-left { flex: 1 1 0; display: flex; flex-direction: column; align-items: flex-start; }
.mm-status-right { flex: 1 1 0; display: flex; flex-direction: column; align-items: flex-end; gap: 0.8cqmin; }
.mm-qnum { font-family: var(--mono); font-size: var(--fs-md); font-weight: 500; }
.mm-qnum i { font-style: normal; color: var(--ink-40); }
.mm-score { font-family: var(--mono); font-size: var(--fs-md); font-weight: 600; }
.mm-badge {
  font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink-40); border: var(--bw) solid var(--ink-15); border-radius: 99cqmin; padding: 0.4cqmin 1.6cqmin;
}
.mm-hearts { flex: 0 0 auto; display: flex; gap: 1.4cqmin; color: var(--ink-15); }
.mm-heart.on { color: var(--ink); }

.mm-question {
  flex: 0 0 auto;
  gap: calc(var(--gap) * 0.9);
  padding: calc(var(--pad) * 0.7) var(--pad) var(--pad);
}
.mm-question-top { display: flex; align-items: center; justify-content: space-between; }
.mm-question-body {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; gap: 1.2cqmin; padding: 1.5cqmin 0 3cqmin;
}
.mm-word { margin: 0; font-size: var(--fs-lg); font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; }
.mm-meaning {
  margin: 0; font-size: var(--fs-sm); color: var(--ink-40); min-height: 1.4em;
  opacity: 0; transform: translateY(0.8cqmin); transition: opacity .3s ease, transform .3s ease;
}
.mm-meaning.show { opacity: 1; transform: none; }

.mm-meter { display: flex; gap: 0.5cqmin; width: 100%; }
.mm-seg { flex: 1; height: 1.2cqmin; border-radius: 99cqmin; background: var(--ink-15); transition: background .15s linear; }
.mm-seg.on { background: var(--ink); }

.mm-options {
  flex: 1 1 auto; display: flex; flex-direction: column; gap: var(--gap);
  min-height: 0; overflow-y: auto; overflow-x: hidden; touch-action: pan-y;
}
.mm-options::-webkit-scrollbar { width: 1cqmin; }
.mm-options::-webkit-scrollbar-thumb { background: var(--ink-15); border-radius: 99cqmin; }
.mm-option {
  flex: 1 0 auto; min-height: 11cqmin; overflow-wrap: anywhere;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.6cqmin;
  background: var(--panel);
  border-color: var(--line);
  text-align: left;
  font-size: var(--fs-sm);
}
.mm-option-text { flex: 1; }
.mm-option.is-correct { opacity: 1; color: var(--good); border-color: var(--good); background: var(--good-bg); }
.mm-option.is-wrong { opacity: 1; color: var(--bad); border-color: var(--bad); background: var(--bad-bg); }
.mm-option.is-dim { opacity: .3; }
.mm-next { flex: 0 0 auto; }

.mm-count { flex: 1; align-items: center; justify-content: center; gap: 3cqmin; }
.mm-count-num { font-family: var(--mono); font-size: 22cqmin; font-weight: 300; letter-spacing: -0.04em; animation: mmPop .5s ease; }

/* result */
.mm-result { align-items: center; justify-content: flex-start; text-align: center; gap: 0; }
.mm-result-head { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.mm-result-body {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3cqmin; width: 100%;
}
.mm-result-score { font-family: var(--mono); font-size: 17cqmin; font-weight: 500; letter-spacing: -0.04em; line-height: 1; }
.mm-result-meta {
  display: flex; width: 100%;
  border-top: var(--bw) solid var(--line); padding-top: 3cqmin;
}
.mm-result-meta div { flex: 1; display: flex; flex-direction: column; gap: 0.6cqmin; align-items: center; }
.mm-result-meta div + div { border-left: var(--bw) solid var(--line); }
.mm-result .mm-note { margin-top: 2.6cqmin; }
.mm-result-meta .mm-stat-value i { font-style: normal; color: var(--ink-40); }
.mm-newbest {
  font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.24em; text-transform: uppercase;
  border: var(--bw) solid var(--ink); border-radius: 99cqmin; padding: 1cqmin 3cqmin;
}
.mm-note { margin: 0; font-size: var(--fs-xs); color: var(--ink-40); }
.mm-note--center { text-align: center; }

/* list */
.mm-list-head { gap: calc(var(--gap) * 1.2); }
.mm-filters { display: flex; flex-wrap: wrap; gap: 1.2cqmin; }
.mm-chip {
  flex: 1 0 auto; display: inline-flex; align-items: center; justify-content: center; gap: 1cqmin;
  padding: 2cqmin 2.6cqmin; border: var(--bw) solid var(--ink-15); border-radius: 99cqmin;
  background: transparent; color: var(--ink-70); font-family: var(--mono); font-size: var(--fs-xs);
  letter-spacing: 0.1em; cursor: pointer; transition: all .16s ease;
}
.mm-chip.on { background: var(--ink); border-color: var(--ink); color: #fff; }
.mm-chip--star { flex: 1 0 26%; color: var(--ink-40); }
.mm-chip--star.on { color: #fff; }
.mm-list-panel { padding: calc(var(--pad) * 0.4) var(--pad); }
.mm-scroll {
  flex: 1; min-height: 0; width: 100%;
  overflow-y: auto; overflow-x: hidden;
  overscroll-behavior-x: none; touch-action: pan-y;
  scrollbar-width: thin;
}
.mm-scroll::-webkit-scrollbar { width: 1cqmin; }
.mm-scroll::-webkit-scrollbar-thumb { background: var(--ink-15); border-radius: 99cqmin; }
.mm-list-item {
  display: flex; max-width: 100%; align-items: center; gap: 2.4cqmin;
  padding: 2.4cqmin 0; border-bottom: var(--bw) solid var(--line);
}
.mm-list-item:last-child { border-bottom: none; }
.mm-list-lv {
  font-family: var(--mono); font-size: var(--fs-xs); color: var(--ink-40);
  width: 5cqmin; height: 5cqmin; display: flex; align-items: center; justify-content: center;
  border: var(--bw) solid var(--line); border-radius: var(--r-sm); flex: 0 0 auto;
}
.mm-list-text { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.mm-list-text > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mm-list-word { font-size: var(--fs-sm); font-weight: 500; }
.mm-list-meaning { font-size: var(--fs-xs); color: var(--ink-40); }
.mm-star {
  display: flex; align-items: center; justify-content: center;
  width: 11cqmin; height: 11cqmin; flex: 0 0 auto; margin-right: -2cqmin;
  background: none; border: none; border-radius: 50%;
  color: var(--ink-15); cursor: pointer; transition: color .16s ease, background .16s ease;
  -webkit-tap-highlight-color: transparent;
}
.mm-star.on { color: var(--ink); }
.mm-star:active { transform: scale(.92); }
.mm-empty { font-size: var(--fs-sm); color: var(--ink-40); text-align: center; padding: 6cqmin 0; }

/* overlay */
.mm-overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  padding: 6%; background: rgba(17,17,19,.28); backdrop-filter: blur(0.8cqmin);
  animation: mmFade .18s ease both; z-index: 10;
}
.mm-sheet {
  width: 100%; max-height: 100%; overflow-y: auto; background: var(--panel);
  border: var(--bw) solid var(--line);
  border-radius: var(--r-lg); padding: var(--pad); display: flex; flex-direction: column; gap: var(--gap);
  animation: mmRise .22s ease both;
}
.mm-sheet-head { display: flex; align-items: center; justify-content: space-between; }
.mm-sheet-body { display: flex; flex-direction: column; gap: var(--gap); }
.mm-sheet-foot { padding-top: calc(var(--gap) * 0.5); }
.mm-body-text { margin: 0; font-size: var(--fs-sm); line-height: 1.7; color: var(--ink-70); white-space: pre-line; }
.mm-field { display: flex; flex-direction: column; gap: 1.4cqmin; }
.mm-field--row { flex-direction: row; align-items: center; justify-content: space-between; }

.mm-range {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 7cqmin; background: transparent; cursor: pointer;
}
.mm-range::-webkit-slider-runnable-track {
  height: 1.4cqmin; border-radius: 99cqmin;
  background: linear-gradient(var(--ink), var(--ink)) 0 / var(--fill, 50%) 100% no-repeat, var(--ink-15);
}
.mm-range::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 5.2cqmin; height: 5.2cqmin; margin-top: -1.9cqmin;
  border-radius: 50%; background: var(--ink); border: none;
  transition: transform .16s cubic-bezier(.2,.8,.2,1), box-shadow .16s ease;
}
.mm-range:active::-webkit-slider-thumb { transform: scale(1.18); }
.mm-range::-moz-range-track { height: 1.4cqmin; border-radius: 99cqmin; background: var(--ink-15); }
.mm-range::-moz-range-progress { height: 1.4cqmin; border-radius: 99cqmin; background: var(--ink); }
.mm-range::-moz-range-thumb {
  width: 5.2cqmin; height: 5.2cqmin; border: none; border-radius: 50%; background: var(--ink);
  transition: transform .16s cubic-bezier(.2,.8,.2,1);
}

.mm-switch {
  position: relative; width: 13cqmin; height: 7cqmin; border-radius: 99cqmin;
  border: var(--bw) solid var(--ink-15); background: transparent; padding: 0; cursor: pointer;
  transition: background .24s cubic-bezier(.2,.8,.2,1), border-color .24s ease;
  -webkit-tap-highlight-color: transparent;
}
.mm-switch.on { background: var(--ink); border-color: var(--ink); }
.mm-knob {
  position: absolute; top: 50%; left: 0.8cqmin;
  width: 5cqmin; height: 5cqmin; border-radius: 50%; background: var(--ink-40);
  transform: translate(0, -50%);
  transition: transform .34s cubic-bezier(.32,1.28,.5,1),
              width .22s cubic-bezier(.2,.8,.2,1),
              background .28s ease;
}
.mm-switch.on .mm-knob { background: #fff; transform: translate(5.6cqmin, -50%); }
.mm-switch:active .mm-knob { width: 6.4cqmin; }
.mm-switch.on:active .mm-knob { transform: translate(4.2cqmin, -50%); }

.mm-menu {
  display: flex; flex-direction: column;
  border-top: var(--bw) solid var(--line); margin-top: calc(var(--gap) * 0.5);
}
.mm-menu-row {
  display: flex; align-items: center; gap: 2.4cqmin;
  padding: 3cqmin 0; background: none; border: none; border-bottom: var(--bw) solid var(--line);
  color: var(--ink); font-family: var(--sans); font-size: var(--fs-sm); text-align: left;
  cursor: pointer; transition: opacity .16s ease;
}
.mm-menu-row span { flex: 1; }
.mm-menu-row .mm-ico:last-child { color: var(--ink-40); }
.mm-version {
  font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.14em;
  color: var(--ink-40); text-align: center;
}
.mm-confirm { display: flex; flex-direction: column; gap: var(--gap); }
.mm-confirm-row { display: flex; gap: var(--gap); }
.mm-danger--solid { background: var(--bad); border-color: var(--bad); color: #fff; }

.mm-card {
  display: flex; flex-direction: column; gap: 2cqmin;
  padding: var(--pad); border: var(--bw) solid var(--ink); border-radius: var(--r-md);
  background: var(--surface);
}
.mm-card-top { display: flex; align-items: center; justify-content: space-between; }
.mm-card-mark { font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.2em; }
.mm-card-mode {
  font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--ink-40);
}
.mm-card-score { font-family: var(--mono); font-size: 14cqmin; font-weight: 500; letter-spacing: -0.04em; line-height: 1; }
.mm-card-meta {
  display: flex; justify-content: space-between; gap: var(--gap);
  font-family: var(--mono); font-size: var(--fs-xs); letter-spacing: 0.1em; color: var(--ink-40);
}

/* pointer-only: keeps tapped buttons from staying highlighted on touch */
@media (hover: hover) and (pointer: fine) {
  .mm-btn:hover:not(:disabled) { border-color: var(--ink-40); background: rgba(17,17,19,.035); }
  .mm-btn--solid:hover:not(:disabled) { background: #26262a; border-color: #26262a; }
  .mm-btn--icon-sm:hover:not(:disabled) { color: var(--ink); border-color: var(--ink-15); }
  .mm-danger:hover { background: var(--bad-bg); border-color: var(--bad); }
  .mm-chip:hover { border-color: var(--ink-40); }
  .mm-star:hover { color: var(--ink-40); background: rgba(17,17,19,.04); }
  .mm-range:hover::-webkit-slider-thumb { box-shadow: 0 0 0 1.4cqmin rgba(17,17,19,.07); }
  .mm-menu-row:hover { opacity: .6; }
  .mm-danger--solid:hover { background: #8f322b; border-color: #8f322b; color: #fff; }
}

/* motion */
.mm-fade { animation: mmFade .32s ease both; }
@keyframes mmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes mmRise { from { opacity: 0; transform: translateY(2cqmin); } to { opacity: 1; transform: none; } }
@keyframes mmPop { from { opacity: 0; transform: scale(.86); } to { opacity: 1; transform: none; } }
@keyframes mmPulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@media (prefers-reduced-motion: reduce) {
  .mm-root *, .mm-root *::before, .mm-root *::after {
    animation-duration: .001ms !important; transition-duration: .001ms !important;
  }
}
`;
