export type ChordShape = {
  id: string;
  name: string;
  label: string;
  strings: number[];
  fingers?: (number | null)[];
  quality: "major" | "minor" | "dominant" | "maj7" | "other";
  tags: string[];
  startFret?: number;
};

export type ProgressionStyle = {
  id: string;
  label: string;
  accent: string;
  description: string;
  patterns: string[][];
};

export const CHORD_LIBRARY: ChordShape[] = [
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

export const PROGRESSION_STYLES: ProgressionStyle[] = [
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

export const KEYS = ["C", "G", "D", "A", "E", "F"] as const;

export const OPEN_STRING_FREQ = [82.41, 110, 146.83, 196, 246.94, 329.63];

const DEGREE_MAP: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
};

export function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function getStartFret(strings: number[], explicit?: number) {
  const positive = strings.filter((fret) => fret > 0);
  const max = positive.length ? Math.max(...positive) : 1;
  let start = explicit ?? (max <= 4 ? 1 : Math.min(...positive));
  if (start + 3 < max) start = max - 3;
  return Math.max(start, 1);
}

export function romanToChordName(roman: string, key: string) {
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

export function findChordShape(name: string) {
  return CHORD_LIBRARY.find((chord) => chord.name === name);
}
