import { useId } from 'react';
import type { ProjectPlate } from '../data/portfolioData';

interface ExhibitionPlateProps {
  variant: ProjectPlate['variant'];
  title: string;
  className?: string;
}

export function ExhibitionPlate({ variant, title, className = '' }: ExhibitionPlateProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <div
      className={`relative overflow-hidden bg-[var(--surface-subtle)] select-none ${className}`}
      role="img"
      aria-label={title}
    >
      <svg
        viewBox="0 0 800 560"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`sky-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--plate-sky-1)' }} />
            <stop offset="52%" style={{ stopColor: 'var(--plate-sky-2)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--plate-sky-3)' }} />
          </linearGradient>
          <radialGradient id={`sun-${uid}`} cx="74%" cy="22%" r="48%">
            <stop offset="0%" stopColor="#f5b69e" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#8db9f0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8db9f0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`cool-${uid}`} cx="22%" cy="76%" r="55%">
            <stop offset="0%" stopColor="#8db9f0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8db9f0" stopOpacity="0" />
          </radialGradient>
          <pattern id={`grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              style={{ stroke: 'var(--plate-grid)' }}
              strokeOpacity="0.1"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        <rect width="800" height="560" fill={`url(#sky-${uid})`} />
        <rect width="800" height="560" fill={`url(#sun-${uid})`} />
        <rect width="800" height="560" fill={`url(#cool-${uid})`} />
        <rect width="800" height="560" fill={`url(#grid-${uid})`} />

        {/* Technical diagram corner ticks */}
        <g style={{ stroke: 'var(--plate-ink)' }} strokeOpacity="0.24" strokeWidth="1">
          <line x1="36" y1="36" x2="54" y2="36" />
          <line x1="36" y1="36" x2="36" y2="54" />
          <line x1="764" y1="36" x2="746" y2="36" />
          <line x1="764" y1="36" x2="764" y2="54" />
          <line x1="36" y1="524" x2="54" y2="524" />
          <line x1="36" y1="524" x2="36" y2="506" />
          <line x1="764" y1="524" x2="746" y2="524" />
          <line x1="764" y1="524" x2="764" y2="506" />
        </g>

        {variant === 'booking-flow' && (
          <g>
            {/* Calendar & Slot Scheduling Grid */}
            <rect
              x="120"
              y="108"
              width="340"
              height="340"
              rx="18"
              style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }}
              fillOpacity="0.88"
              strokeOpacity="0.35"
            />
            <rect x="148" y="138" width="180" height="18" rx="6" fill="#8db9f0" fillOpacity="0.45" />
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const isBooked = row === 1 && col === 1;
                const isAvail = (row === 0 && col === 2) || (row === 2 && col === 0);
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={148 + col * 98}
                    y={182 + row * 78}
                    width="82"
                    height="56"
                    rx="10"
                    style={{
                      fill: isBooked ? '#f5b69e' : isAvail ? '#8db9f0' : 'var(--plate-water)',
                      stroke: 'var(--plate-ink)',
                    }}
                    fillOpacity={isBooked ? 0.65 : isAvail ? 0.45 : 0.6}
                    strokeOpacity="0.32"
                  />
                );
              })
            )}
            {/* Confirmation Connector */}
            <path d="M 460 278 L 520 278" style={{ stroke: 'var(--plate-grid)' }} strokeWidth="2.2" strokeDasharray="5 4" />
            <rect
              x="520"
              y="168"
              width="172"
              height="220"
              rx="16"
              style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }}
              fillOpacity="0.9"
              strokeOpacity="0.38"
            />
            <circle cx="606" cy="228" r="30" fill="#8db9f0" fillOpacity="0.4" style={{ stroke: 'var(--plate-ink)' }} strokeOpacity="0.4" />
            <rect x="556" y="280" width="100" height="14" rx="4" fill="#f5b69e" fillOpacity="0.65" />
            <rect x="556" y="308" width="84" height="12" rx="4" fill="#8db9f0" fillOpacity="0.45" />
            <rect x="556" y="334" width="66" height="12" rx="4" fill="#8db9f0" fillOpacity="0.35" />
          </g>
        )}

        {variant === 'booking-schema' && (
          <g>
            {/* Normalized ER Diagram: Doctors - Schedules - Appointments */}
            <rect x="112" y="132" width="166" height="128" rx="12" style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }} fillOpacity="0.88" strokeOpacity="0.38" />
            <rect x="112" y="132" width="166" height="32" rx="12" fill="#8db9f0" fillOpacity="0.4" />
            <rect x="317" y="216" width="166" height="128" rx="12" style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }} fillOpacity="0.9" strokeOpacity="0.42" />
            <rect x="317" y="216" width="166" height="32" rx="12" fill="#f5b69e" fillOpacity="0.52" />
            <rect x="522" y="132" width="166" height="128" rx="12" style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }} fillOpacity="0.88" strokeOpacity="0.38" />
            <rect x="522" y="132" width="166" height="32" rx="12" fill="#8db9f0" fillOpacity="0.4" />
            <line x1="278" y1="196" x2="317" y2="270" style={{ stroke: 'var(--plate-grid)' }} strokeWidth="2" />
            <line x1="522" y1="196" x2="483" y2="270" style={{ stroke: 'var(--plate-grid)' }} strokeWidth="2" />
            <rect x="317" y="384" width="166" height="68" rx="10" style={{ fill: 'var(--plate-water)', stroke: 'var(--plate-ink)' }} fillOpacity="0.7" strokeOpacity="0.35" />
            <line x1="400" y1="344" x2="400" y2="384" stroke="#f5b69e" strokeWidth="2" strokeDasharray="4 3" />
          </g>
        )}

        {(variant === 'expense-ledger' || variant === 'expense-analytics') && (
          <g>
            {/* Ledger Rows + Category Bar Chart */}
            <rect
              x="116"
              y="114"
              width="290"
              height="332"
              rx="16"
              style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }}
              fillOpacity="0.88"
              strokeOpacity="0.36"
            />
            {[152, 206, 260, 314, 368].map((y, idx) => (
              <g key={y}>
                <rect
                  x="144"
                  y={y}
                  width="234"
                  height="36"
                  rx="8"
                  style={{ fill: 'var(--plate-water)', stroke: 'var(--plate-ink)' }}
                  fillOpacity="0.55"
                  strokeOpacity="0.22"
                />
                <rect
                  x="160"
                  y={y + 11}
                  width={110 - idx * 10}
                  height="12"
                  rx="4"
                  fill={idx % 2 === 0 ? '#8db9f0' : '#f5b69e'}
                  fillOpacity="0.6"
                />
                <rect x="318" y={y + 11} width="44" height="12" rx="4" fill="#8db9f0" fillOpacity="0.45" />
              </g>
            ))}
            <rect
              x="434"
              y="148"
              width="250"
              height="264"
              rx="16"
              style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }}
              fillOpacity="0.88"
              strokeOpacity="0.36"
            />
            {[0, 1, 2, 3].map((i) => {
              const heights = [120, 170, 92, 148];
              const h = heights[i];
              return (
                <rect
                  key={i}
                  x={468 + i * 48}
                  y={370 - h}
                  width="32"
                  height={h}
                  rx="6"
                  fill={i === 1 ? '#f5b69e' : '#8db9f0'}
                  fillOpacity="0.58"
                  style={{ stroke: 'var(--plate-ink)' }}
                  strokeOpacity="0.3"
                />
              );
            })}
          </g>
        )}

        {(variant === 'todo-board' || variant === 'todo-workflow') && (
          <g>
            {/* Three-Column Task Board */}
            {[0, 1, 2].map((col) => (
              <g key={col}>
                <rect
                  x={116 + col * 196}
                  y="118"
                  width="176"
                  height="324"
                  rx="14"
                  style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }}
                  fillOpacity="0.86"
                  strokeOpacity="0.35"
                />
                <rect
                  x={134 + col * 196}
                  y="140"
                  width="88"
                  height="14"
                  rx="4"
                  fill={col === 2 ? '#f5b69e' : '#8db9f0'}
                  fillOpacity="0.6"
                />
                {[0, 1, 2].map((card) => (
                  <g key={card}>
                    <rect
                      x={134 + col * 196}
                      y={178 + card * 82}
                      width="140"
                      height="64"
                      rx="10"
                      style={{ fill: 'var(--plate-water)', stroke: 'var(--plate-ink)' }}
                      fillOpacity="0.65"
                      strokeOpacity="0.28"
                    />
                    <circle
                      cx={154 + col * 196}
                      cy={210 + card * 82}
                      r="8"
                      fill={col === 2 ? '#8db9f0' : 'none'}
                      style={{ stroke: 'var(--plate-ink)' }}
                      strokeOpacity="0.55"
                      strokeWidth="1.5"
                    />
                    <rect
                      x={172 + col * 196}
                      y={204 + card * 82}
                      width="84"
                      height="11"
                      rx="4"
                      fill="#8db9f0"
                      fillOpacity="0.45"
                    />
                  </g>
                ))}
              </g>
            ))}
          </g>
        )}

        {(variant === 'api-vision' || variant === 'api-voice') && (
          <g>
            {/* API Gateway -> Image Gen / BG Remover / Voice Assistant Nodes */}
            <circle
              cx="230"
              cy="280"
              r="58"
              fill="#8db9f0"
              fillOpacity="0.32"
              style={{ stroke: 'var(--plate-ink)' }}
              strokeOpacity="0.45"
              strokeWidth="1.6"
            />
            <circle cx="230" cy="280" r="22" fill="#f5b69e" fillOpacity="0.68" />
            {[148, 280, 412].map((y, idx) => (
              <g key={y}>
                <path
                  d={`M 288 280 C 360 280, 360 ${y}, 442 ${y}`}
                  fill="none"
                  style={{ stroke: idx === 1 ? '#f5b69e' : 'var(--plate-grid)' }}
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
                <rect
                  x="442"
                  y={y - 38}
                  width="238"
                  height="76"
                  rx="12"
                  style={{ fill: 'var(--plate-fill)', stroke: 'var(--plate-ink)' }}
                  fillOpacity="0.88"
                  strokeOpacity="0.38"
                />
                <rect
                  x="466"
                  y={y - 16}
                  width="126"
                  height="14"
                  rx="4"
                  fill={idx === 1 ? '#f5b69e' : '#8db9f0'}
                  fillOpacity="0.55"
                />
                <rect
                  x="466"
                  y={y + 8}
                  width="180"
                  height="10"
                  rx="4"
                  fill="#8db9f0"
                  fillOpacity="0.32"
                />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
