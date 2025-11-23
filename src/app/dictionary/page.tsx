"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ChordDiagram } from "../components/chord-diagram";
import { Nav } from "../components/nav";
import { PlayIcon, SparklesIcon } from "../components/icons";
import { CHORD_LIBRARY, OPEN_STRING_FREQ, classNames, ChordShape } from "../data/music";

export default function DictionaryPage() {
  const [qualityFilter, setQualityFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);

  function normalize(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9#]+/g, "");
  }

  const filteredChords = useMemo(() => {
    return CHORD_LIBRARY.filter((chord) => {
      const matchesQuality =
        qualityFilter === "all" ||
        chord.quality === qualityFilter ||
        (qualityFilter === "7th" && ["maj7", "dominant"].includes(chord.quality));
      const term = search.trim().toLowerCase();
      const norm = normalize(term);
      const matchesSearch =
        !term ||
        chord.name.toLowerCase().includes(term) ||
        chord.label.toLowerCase().includes(term) ||
        normalize(chord.name).includes(norm) ||
        normalize(chord.label).includes(norm) ||
        chord.tags.some((tag) => normalize(tag).includes(norm)) ||
        normalize(chord.id).includes(norm);
      return matchesQuality && matchesSearch;
    });
  }, [qualityFilter, search]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <Nav />

        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
            <SparklesIcon />
            Chord Dictionary
          </div>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">コード辞書</h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-200/80">
                開放弦・バレー混在のフォームを SVG で表示。ワンクリックで鳴らしながら形を覚える。
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-300/10 px-4 py-2 text-sm font-semibold text-indigo-100">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              Audio Preview Ready
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Library</p>
              <h2 className="text-2xl font-semibold text-white">フォーム一覧</h2>
              <p className="text-sm text-slate-200/80">
                開放弦からバレーまで、基本コードを収録。タッチでダイアグラムと音を確認。
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

        <div className="flex flex-wrap gap-3 text-sm text-slate-200/80">
          <Link
            href="/"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:border-white/30"
          >
            ← Back to Top
          </Link>
          <Link
            href="/generator"
            className="rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2 font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 hover:translate-y-[1px]"
          >
            Go to Generator →
          </Link>
        </div>
      </div>
    </div>
  );
}
