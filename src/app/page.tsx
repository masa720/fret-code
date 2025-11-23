"use client";

import { useMemo, useRef, useState } from "react";

type ChordShape = {
  id: string;
  name: string;
  label: string;
  strings: number[];
  fingers?: (number | null)[];
  quality: "major" | "minor" | "dominant" | "maj7" | "other";
  tags: string[];
  startFret?: number;
};

type ProgressionStyle = {
  id: string;
  label: string;
  accent: string;
  description: string;
  patterns: string[][];
};

type GeneratedProgression = {
  roman: string[];
  chords: { name: string; shape?: ChordShape }[];
  styleId: string;
  key: string;
};

const CHORD_LIBRARY: ChordShape[] = [
  {
    id: "c-major",
    name: "C",
    label: "C major",
    strings: [-1, 3, 2, 0, 1, 0],
    fingers: [null, 3, 2, null, 1, null],
    quality: "major",
    tags: ["campfire", "open", "bright"],
  },
  {
    id: "cmaj7",
    name: "Cmaj7",
    label: "C maj7",
    strings: [-1, 3, 2, 0, 0, 0],
    fingers: [null, 3, 2, null, null, null],
    quality: "maj7",
    tags: ["smooth", "jazzy"],
  },
  {
    id: "d-major",
    name: "D",
    label: "D major",
    strings: [-1, -1, 0, 2, 3, 2],
    fingers: [null, null, null, 1, 3, 2],
    quality: "major",
    tags: ["campfire", "open"],
  },
  {
    id: "dm",
    name: "Dm",
    label: "D minor",
    strings: [-1, -1, 0, 2, 3, 1],
    fingers: [null, null, null, 2, 3, 1],
    quality: "minor",
    tags: ["sad", "open"],
  },
  {
    id: "e-major",
    name: "E",
    label: "E major",
    strings: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    quality: "major",
    tags: ["open", "bright"],
  },
  {
    id: "em",
    name: "Em",
    label: "E minor",
    strings: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    quality: "minor",
    tags: ["ballad", "open"],
  },
  {
    id: "em7",
    name: "Em7",
    label: "E m7",
    strings: [0, 2, 2, 0, 3, 0],
    fingers: [0, 1, 2, 0, 3, 0],
    quality: "other",
    tags: ["lofi", "open"],
  },
  {
    id: "f-major",
    name: "F",
    label: "F major",
    strings: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    quality: "major",
    tags: ["barre", "essential"],
    startFret: 1,
  },
  {
    id: "fmaj7",
    name: "Fmaj7",
    label: "F maj7",
    strings: [1, 3, 2, 0, 1, 0],
    fingers: [1, 3, 2, 0, 4, 0],
    quality: "maj7",
    tags: ["dreamy", "open"],
    startFret: 1,
  },
  {
    id: "g-major",
    name: "G",
    label: "G major",
    strings: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    quality: "major",
    tags: ["campfire", "open"],
  },
  {
    id: "g7",
    name: "G7",
    label: "G7",
    strings: [3, 2, 0, 0, 0, 1],
    fingers: [2, 1, 0, 0, 0, 3],
    quality: "dominant",
    tags: ["tense", "blues"],
  },
  {
    id: "a-major",
    name: "A",
    label: "A major",
    strings: [-1, 0, 2, 2, 2, 0],
    fingers: [null, 0, 1, 2, 3, 0],
    quality: "major",
    tags: ["open", "pop"],
  },
  {
    id: "am",
    name: "Am",
    label: "A minor",
    strings: [-1, 0, 2, 2, 1, 0],
    fingers: [null, 0, 2, 3, 1, 0],
    quality: "minor",
    tags: ["ballad", "open"],
  },
  {
    id: "am7",
    name: "Am7",
    label: "A m7",
    strings: [-1, 0, 2, 0, 1, 0],
    fingers: [null, 0, 2, 0, 1, 0],
    quality: "other",
    tags: ["soul", "open"],
  },
  {
    id: "b-major",
    name: "B",
    label: "B major",
    strings: [-1, 2, 4, 4, 4, 2],
    fingers: [null, 1, 3, 4, 4, 1],
    quality: "major",
    tags: ["barre", "bright"],
    startFret: 2,
  },
  {
    id: "bm",
    name: "Bm",
    label: "B minor",
    strings: [-1, 2, 4, 4, 3, 2],
    fingers: [null, 1, 3, 4, 2, 1],
    quality: "minor",
    tags: ["barre", "pop"],
    startFret: 2,
  },
  {
    id: "b7",
    name: "B7",
    label: "B7",
    strings: [-1, 2, 1, 2, 0, 2],
    fingers: [null, 2, 1, 3, 0, 4],
    quality: "dominant",
    tags: ["bluesy", "v-of-e"],
    startFret: 1,
  },
  {
    id: "fsharp-minor",
    name: "F#m",
    label: "F# minor",
    strings: [2, 4, 4, 2, 2, 2],
    fingers: [1, 3, 4, 1, 1, 1],
    quality: "minor",
    tags: ["barre", "pop"],
    startFret: 2,
  },
  {
    id: "csharp-minor",
    name: "C#m",
    label: "C# minor",
    strings: [-1, 4, 6, 6, 5, 4],
    fingers: [null, 1, 3, 4, 2, 1],
    quality: "minor",
    tags: ["barre", "moody"],
    startFret: 4,
  },
  {
    id: "bb-major",
    name: "Bb",
    label: "Bb major",
    strings: [-1, 1, 3, 3, 3, 1],
    fingers: [null, 1, 3, 4, 4, 1],
    quality: "major",
    tags: ["barre", "soul"],
    startFret: 1,
  },
];

const PROGRESSION_STYLES: ProgressionStyle[] = [
  {
    id: "jpop",
    label: "J-POP Hook",
    accent: "from-amber-400 to-pink-500",
    description: "解決感の強い進行でサビにハマる定番",
    patterns: [
      ["I", "V", "vi", "IV"],
      ["vi", "IV", "I", "V"],
      ["IV", "V", "iii", "vi"],
    ],
  },
  {
    id: "ballad",
    label: "Ballad / Lofi",
    accent: "from-sky-400 to-indigo-500",
    description: "浮遊感と余白を残す静かなムード",
    patterns: [
      ["I", "vi", "IV", "V"],
      ["ii", "V", "I", "Imaj7"],
      ["I", "V", "IV", "IV"],
    ],
  },
  {
    id: "upbeat",
    label: "Upbeat / Rock",
    accent: "from-lime-400 to-emerald-500",
    description: "疾走感を出したいときにハマる",
    patterns: [
      ["I", "V", "vi", "V"],
      ["vi", "IV", "I", "V"],
      ["I", "IV", "V", "IV"],
    ],
  },
];

const KEYS = ["C", "G", "D", "A", "E", "F"] as const;

const OPEN_STRING_FREQ = [82.41, 110, 146.83, 196, 246.94, 329.63];

const DEGREE_MAP: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
};

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function romanToChordName(roman: string, key: string) {
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const keyIndex = noteNames.indexOf(key);
  const romanCore = roman.toLowerCase().replace(/[^iv]/g, "");
  const degree = DEGREE_MAP[romanCore];
  if (!degree || keyIndex < 0) return roman;

  const majorSteps = [0, 2, 4, 5, 7, 9, 11];
  const rootIndex = (keyIndex + majorSteps[degree - 1]) % 12;
  const root = noteNames[rootIndex];
  const isDim = roman.includes("°");
  const hasSeven = roman.includes("7");
  const isMinor = roman === roman.toLowerCase() && !isDim;
  const suffix = isDim ? "dim" : isMinor ? "m" : "";

  if (roman.includes("maj7")) return `${root}maj7`;
  if (hasSeven && !isDim && !isMinor) return `${root}7`;
  return `${root}${suffix}`;
}

function findChordShape(name: string) {
  return CHORD_LIBRARY.find((chord) => chord.name === name);
}

function getStartFret(strings: number[], explicit?: number) {
  const positive = strings.filter((fret) => fret > 0);
  const max = positive.length ? Math.max(...positive) : 1;
  let start = explicit ?? (max <= 4 ? 1 : Math.min(...positive));
  if (start + 3 < max) start = max - 3;
  return Math.max(start, 1);
}

function ChordDiagram({ chord }: { chord: ChordShape }) {
  const strings = chord.strings;
  const startFret = getStartFret(strings, chord.startFret);
  const positive = strings.filter((fret) => fret > 0);
  const max = positive.length ? Math.max(...positive) : 1;
  const fretSpan = Math.max(3, max - startFret);
  const height = 120;
  const width = 220;
  const fretCount = fretSpan + 1;
  const paddingX = 20;
  const paddingY = 18;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-semibold text-slate-100">{chord.label}</div>
      <svg
        role="img"
        aria-label={`Chord diagram for ${chord.label}`}
        viewBox={`0 0 ${width} ${height}`}
        className="drop-shadow-lg"
      >
        {strings.map((fret, index) => {
          const y =
            paddingY +
            ((strings.length - 1 - index) / (strings.length - 1)) * (height - paddingY * 2);
          return (
            <g key={index}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1.5}
              />
              {fret === 0 && (
                <circle
                  cx={paddingX - 10}
                  cy={y}
                  r={5}
                  fill="none"
                  stroke="white"
                  strokeWidth={1.5}
                />
              )}
              {fret === -1 && (
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize={10}
                >
                  x
                </text>
              )}
            </g>
          );
        })}

        {Array.from({ length: fretCount }).map((_, fret) => {
          const x = paddingX + (fret / fretSpan) * (width - paddingX * 2);
          const thickness = fret === 0 && startFret === 1 ? 4 : 2;
          return (
            <line
              key={fret}
              x1={x}
              y1={paddingY}
              x2={x}
              y2={height - paddingY}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={thickness}
            />
          );
        })}

        {strings.map((fret, index) => {
          if (fret <= 0) return null;
          const y =
            paddingY +
            ((strings.length - 1 - index) / (strings.length - 1)) * (height - paddingY * 2);
          const x =
            paddingX + ((fret - startFret + 0.5) / fretSpan) * (width - paddingX * 2);
          return (
            <g key={index}>
              <circle cx={x} cy={y} r={8} fill="white" opacity={0.9} />
              {chord.fingers?.[index] && (
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight="bold"
                  fill="#0f172a"
                >
                  {chord.fingers[index]}
                </text>
              )}
            </g>
          );
        })}

        {startFret > 1 && (
          <text
            x={paddingX - 8}
            y={paddingY + 12}
            fill="rgba(255,255,255,0.75)"
            fontSize={10}
            fontWeight="bold"
          >
            {startFret}fr
          </text>
        )}
      </svg>
      <div className="flex flex-wrap justify-center gap-1">
        {chord.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="fill-white">
      <path d="M5 3.867a1 1 0 0 1 1.515-.857l12 8a1 1 0 0 1 0 1.67l-12 8A1 1 0 0 1 5 19.823V3.867Z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="fill-white">
      <path d="M4 7a1 1 0 0 1 1-1h2.697a3 3 0 0 0 2.4-1.2l.806-1.074A3 3 0 0 1 13.303 2H18a1 1 0 1 1 0 2h-4.697a1 1 0 0 0-.8.4l-.806 1.074A5 5 0 0 1 7.697 7H5a1 1 0 0 1-1-1Zm0 10a1 1 0 0 1 1-1h2.697a3 3 0 0 0 2.4-1.2l3.2-4.26A5 5 0 0 1 16.303 9H18a1 1 0 1 1 0 2h-1.697a3 3 0 0 0-2.4 1.2l-3.2 4.26A5 5 0 0 1 7.697 18H5a1 1 0 0 1-1-1Zm0-5a1 1 0 0 0 1 1h1.697a3 3 0 0 0 2.4-1.2l.16-.214A1 1 0 1 0 9.346 9.8l-.16.214A1 1 0 0 1 7.697 11H5a1 1 0 0 0-1 1Zm12.293-2.707a1 1 0 0 1 1.414 0l2.5 2.5a1 1 0 0 1 0 1.414l-2.5 2.5a1 1 0 1 1-1.414-1.414L17.586 13l-1.293-1.293a1 1 0 0 1 0-1.414Z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="fill-white">
      <path d="M9.5 3a.5.5 0 0 1 .447.276l1.018 2.036 2.036 1.018a.5.5 0 0 1 0 .894l-2.036 1.018-1.018 2.036a.5.5 0 0 1-.894 0l-1.018-2.036-2.036-1.018a.5.5 0 0 1 0-.894l2.036-1.018L9.053 3.276A.5.5 0 0 1 9.5 3ZM18 10a.6.6 0 0 1 .537.331l.9 1.809 1.808.9a.6.6 0 0 1 0 1.08l-1.808.9-.9 1.809a.6.6 0 0 1-1.08 0l-.9-1.809-1.809-.9a.6.6 0 0 1 0-1.08l1.81-.9.9-1.809A.6.6 0 0 1 18 10ZM7 16a.4.4 0 0 1 .358.221l.6 1.179 1.179.6a.4.4 0 0 1 0 .72l-1.179.6-.6 1.179a.4.4 0 0 1-.716 0l-.6-1.18-1.18-.6a.4.4 0 0 1 0-.718l1.18-.6.6-1.18A.4.4 0 0 1 7 16Z" />
    </svg>
  );
}

export default function Home() {
  const [qualityFilter, setQualityFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(PROGRESSION_STYLES[0].id);
  const [selectedKey, setSelectedKey] = useState<(typeof KEYS)[number]>("C");
  const [progression, setProgression] = useState<GeneratedProgression | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const filteredChords = useMemo(() => {
    return CHORD_LIBRARY.filter((chord) => {
      const matchesQuality =
        qualityFilter === "all" ||
        chord.quality === qualityFilter ||
        (qualityFilter === "7th" && ["maj7", "dominant"].includes(chord.quality));
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        chord.name.toLowerCase().includes(term) ||
        chord.label.toLowerCase().includes(term) ||
        chord.tags.some((tag) => tag.includes(term));
      return matchesQuality && matchesSearch;
    });
  }, [qualityFilter, search]);

  const currentStyle = PROGRESSION_STYLES.find((style) => style.id === selectedStyle)!;

  function ensureAudioContext() {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    return audioContextRef.current;
  }

  function playChord(chord: ChordShape, when = 0) {
    const ctx = ensureAudioContext();
    const now = ctx.currentTime + when;
    chord.strings.forEach((fret, index) => {
      if (fret < 0) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const base = OPEN_STRING_FREQ[index];
      osc.frequency.value = base * Math.pow(2, fret / 12);
      osc.type = "sine";
      const velocity = fret === 0 ? 0.08 : 0.12;
      gain.gain.setValueAtTime(velocity, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.5);
    });
  }

  function playProgression(chords: { shape?: ChordShape }[]) {
    chords.forEach((item, index) => {
      if (!item.shape) return;
      playChord(item.shape, index * 1.4);
    });
  }

  function generateProgression() {
    const pattern =
      currentStyle.patterns[Math.floor(Math.random() * currentStyle.patterns.length)];
    const chords = pattern.map((roman) => {
      const name = romanToChordName(roman, selectedKey);
      const shape = findChordShape(name) || findChordShape(name.replace("maj7", "")) || undefined;
      return { name, shape };
    });
    setProgression({
      roman: pattern,
      chords,
      styleId: currentStyle.id,
      key: selectedKey,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
            <SparklesIcon />
            Fret Code – Dictionary + Generator
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                コード辞書 + 進行ジェネレーター
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-200/80">
                押さえ方を即座に可視化し、そのままワンクリックで鳴らせる。Key とテイストを指定して、
                ポップスからバラードまで即席で進行を提案。
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-300/10 px-4 py-2 text-sm font-semibold text-indigo-100">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              Audio Preview Ready
            </div>
          </div>
          <div className="grid gap-3 text-sm text-slate-200/80 md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.25em] text-indigo-200">
                Chord Dictionary
              </div>
              <div className="text-lg font-semibold">Chord Dictionary</div>
              <p className="text-slate-200/70">フォーム確認、ダイアグラム描画、個別試聴。</p>
            </div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-200">Generator</div>
              <div className="text-lg font-semibold">Progression Generator</div>
              <p className="text-slate-200/70">Key × テイストで4小節進行をオート生成。</p>
            </div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Extras
              </div>
              <div className="text-lg font-semibold">Audio + SVG</div>
              <p className="text-slate-200/70">Web Audio の簡易サンプルで鳴らし、SVG で描画。</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Dictionary</p>
                <h2 className="text-2xl font-semibold text-white">コード辞書</h2>
                <p className="text-sm text-slate-200/80">
                  開放弦・バレー混在のフォームを SVG で表示。個別に鳴らして確認。
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                {CHORD_LIBRARY.length} Voicings
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]">
              <label className="relative">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="C, Am7, barre, open..."
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <span className="pointer-events-none absolute right-4 top-3 text-xs text-slate-300/80">
                  Search
                </span>
              </label>
              <div className="flex gap-2">
                {[
                  { label: "All", value: "all" },
                  { label: "Major", value: "major" },
                  { label: "Minor", value: "minor" },
                  { label: "7th", value: "7th" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setQualityFilter(item.value)}
                    className={classNames(
                      "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                      qualityFilter === item.value
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        : "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {filteredChords.map((chord) => (
                <div
                  key={chord.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-lg shadow-black/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/10 opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">
                        {chord.quality}
                      </p>
                      <h3 className="text-xl font-semibold text-white">{chord.name}</h3>
                    </div>
                    <button
                      onClick={() => playChord(chord)}
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/40 transition hover:translate-y-[1px]"
                    >
                      <PlayIcon />
                      Play
                    </button>
                  </div>
                  <div className="mt-3">
                    <ChordDiagram chord={chord} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Generator</p>
                <h2 className="text-2xl font-semibold text-white">進行ジェネレーター</h2>
                <p className="text-sm text-slate-200/80">
                  Key とテイストを選ぶだけで 4 小節を提案。押さえ方付き。
                </p>
              </div>
              <button
                onClick={generateProgression}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:brightness-105"
              >
                <ShuffleIcon />
                生成
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Key
                </span>
                <div className="flex gap-2">
                  {KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedKey(key)}
                      className={classNames(
                        "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        selectedKey === key
                          ? "bg-white text-slate-900 shadow-lg"
                          : "border border-white/10 bg-white/10 text-white hover:border-white/20"
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Style
                </span>
                <div className="flex gap-2">
                  {PROGRESSION_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={classNames(
                        "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        selectedStyle === style.id
                          ? "bg-gradient-to-r from-white to-slate-200 text-slate-900 shadow-lg"
                          : "border border-white/10 bg-white/10 text-white hover:border-white/20"
                      )}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-inner">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                    {currentStyle.label}
                  </p>
                  <p className="text-sm text-slate-200/80">{currentStyle.description}</p>
                </div>
                <button
                  onClick={generateProgression}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/30"
                >
                  <SparklesIcon />
                  Randomize
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 p-4 text-center text-lg font-semibold text-white">
                {progression
                  ? progression.roman.join(" — ")
                  : "I — V — vi — IV"}
                <span className="ml-3 text-sm text-slate-300">
                  {progression ? `Key ${progression.key}` : `Key ${selectedKey}`}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200/80">
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold uppercase tracking-[0.2em]">
                  推奨
                </span>
                {currentStyle.patterns.map((pattern, idx) => (
                  <span
                    key={`${pattern.join("-")}-${idx}`}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                  >
                    {pattern.join(" – ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {(progression ?? {
                chords: [
                  { name: "C", shape: findChordShape("C") },
                  { name: "G", shape: findChordShape("G") },
                  { name: "Am", shape: findChordShape("Am") },
                  { name: "F", shape: findChordShape("F") },
                ],
                roman: ["I", "V", "vi", "IV"],
                styleId: "jpop",
                key: "C",
              }).chords.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                      {progression ? progression.roman[index] : ["I", "V", "vi", "IV"][index]}
                    </p>
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    {!item.shape && (
                      <p className="text-xs text-amber-200/80">
                        辞書にないフォームです。別キーを試してみてください。
                      </p>
                    )}
                  </div>
                  {item.shape && (
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block">
                        <ChordDiagram chord={item.shape} />
                      </div>
                      <button
                        onClick={() => item.shape && playChord(item.shape)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/30"
                      >
                        <PlayIcon />
                        音を鳴らす
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {progression && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    プレイバック
                  </p>
                  <p className="text-sm text-slate-200/80">
                    {progression.key} / {currentStyle.label} を連続再生
                  </p>
                </div>
                <button
                  onClick={() => playProgression(progression.chords)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:translate-y-[1px]"
                >
                  <PlayIcon />
                  再生
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
