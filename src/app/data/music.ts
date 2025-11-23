import { CHORD_LIBRARY } from "./chords";

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

export { CHORD_LIBRARY } from "./chords";

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
