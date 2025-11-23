"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "../data/music";

const links = [
  { href: "/", label: "Top" },
  { href: "/dictionary", label: "Dictionary" },
  { href: "/generator", label: "Generator" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
        <span className="uppercase tracking-[0.2em] text-indigo-100">Fret Code</span>
      </div>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames(
              "rounded-xl px-3 py-1.5 transition",
              pathname === link.href
                ? "bg-white text-slate-900 shadow-lg"
                : "border border-white/10 bg-white/5 text-white hover:border-white/20"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
