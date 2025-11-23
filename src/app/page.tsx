import Link from "next/link";
import { Nav } from "./components/nav";
import { PlayIcon, ShuffleIcon, SparklesIcon } from "./components/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
        <Nav />

        <header className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
            <SparklesIcon />
            Fret Code
          </div>
          <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                コード辞書と進行ジェネレーターをひとまとめに
              </h1>
              <p className="text-lg text-slate-200/85">
                押さえ方の確認から、テイスト別のコード進行提案、音のプレビューまで。練習と作曲を往復できるギター特化の小さなツール群です。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dictionary"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:translate-y-[1px]"
                >
                  <PlayIcon />
                  Dictionary を開く
                </Link>
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30"
                >
                  <ShuffleIcon />
                  Generator を開く
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-white/5 to-emerald-400/15 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">Quick peek</p>
              <div className="mt-4 space-y-3 text-slate-100">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Library</p>
                    <p className="text-lg font-semibold">20 Voicings</p>
                  </div>
                  <PlayIcon />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Generator</p>
                    <p className="text-lg font-semibold">3 Styles × 6 Keys</p>
                  </div>
                  <ShuffleIcon />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Audio</p>
                    <p className="text-lg font-semibold">Web Audio Preview</p>
                  </div>
                  <SparklesIcon />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <Link
            href="/dictionary"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur transition hover:border-indigo-300/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-indigo-100">
              Library
              <span className="h-[1px] flex-1 bg-white/20" />
              Chord Shapes
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">コード辞書</h2>
            <p className="mt-2 text-sm text-slate-200/80">
              開放弦からバレーまで、押さえ方を SVG で確認。クリックでサウンドチェック。
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              View 20 voicings
            </div>
          </Link>

          <Link
            href="/generator"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur transition hover:border-amber-300/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-amber-100">
              Generator
              <span className="h-[1px] flex-1 bg-white/20" />
              4-bar ideas
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">進行ジェネレーター</h2>
            <p className="mt-2 text-sm text-slate-200/80">
              Key とスタイルを選ぶだけで 4 小節を提案。押さえ方と試聴ボタン付きで即チェック。
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              3 styles × 6 keys
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
