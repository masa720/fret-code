"use client";

import { ChordShape, getStartFret } from "../data/music";

export function ChordDiagram({ chord }: { chord: ChordShape }) {
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
