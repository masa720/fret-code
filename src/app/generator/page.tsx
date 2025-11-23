"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChordDiagram } from "../components/chord-diagram";
import { Nav } from "../components/nav";
import { PlayIcon, ShuffleIcon, SparklesIcon } from "../components/icons";
import {
  KEYS,
  OPEN_STRING_FREQ,
  PROGRESSION_STYLES,
  classNames,
  findChordShape,
  romanToChordName,
  ChordShape,
} from "../data/music";

type GeneratedProgression = {
  roman: string[];
  chords: { name: string; shape?: ChordShape }[];
  styleId: string;
  key: string;
};

export default function GeneratorPage() {
  const [selectedStyle, setSelectedStyle] = useState(PROGRESSION_STYLES[0].id);
  const [selectedKey, setSelectedKey] = useState<(typeof KEYS)[number]>("C");
  const [progression, setProgression] = useState<GeneratedProgression | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

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

  const preview = progression ?? {
    chords: [
      { name: "C", shape: findChordShape("C") },
      { name: "G", shape: findChordShape("G") },
      { name: "Am", shape: findChordShape("Am") },
      { name: "F", shape: findChordShape("F") },
    ],
    roman: ["I", "V", "vi", "IV"],
    styleId: "jpop",
    key: "C",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <Nav />

        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
            <SparklesIcon />
            Progression Generator
          </div>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                進行ジェネレーター
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-200/80">
                Key とテイストを選ぶだけ。4 小節の進行とコードダイアグラムをまとめて提示、ワンクリックで試聴。
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
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-300">Key</span>
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
              <span className="text-xs uppercase tracking-[0.2em] text-slate-300">Style</span>
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
              {preview.roman.join(" — ")}
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
            {preview.chords.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    {preview.roman[index]}
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
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">プレイバック</p>
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

        <div className="flex flex-wrap gap-3 text-sm text-slate-200/80">
          <Link
            href="/"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:border-white/30"
          >
            ← Back to Top
          </Link>
          <Link
            href="/dictionary"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:border-white/30"
          >
            Go to Dictionary →
          </Link>
        </div>
      </div>
    </div>
  );
}
