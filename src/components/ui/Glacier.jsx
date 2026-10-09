/**
 * Original low-poly glacier illustrations. Each peak is split into lit, mid and
 * shadow facets so it reads as faceted ice; colours are fixed ice tones that work
 * on both the frost-white and midnight themes.
 */

const FRONT = ['#f1f6fb', '#d6e4f1', '#bcd2e8', '#8eb0d3', '#6489b5', '#466c98'];
// Distant range: pale haze on the light theme, deep glacier blue at night (see --glacier-back-* tokens).
const BACK = [1, 2, 3, 4, 5, 6].map((n) => `rgb(var(--glacier-back-${n}))`);

const lerp = ([x1, y1], [x2, y2], t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
const pts = (...points) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function Peak({ x, y, w, base, palette, cap = true }) {
  const A = [x, y];
  const L = [x - w, base];
  const R = [x + w, base];
  const M = [x + w * 0.1, base];
  const P = [x - w * 0.35, y + (base - y) * 0.55];
  const Q = [x + w * 0.45, y + (base - y) * 0.5];
  const [lit, lit2, lit3, mid, shade, deep] = palette;
  return (
    <g>
      <polygon points={pts(A, L, P)} fill={lit} />
      <polygon points={pts(A, P, M)} fill={lit2} />
      <polygon points={pts(P, L, M)} fill={lit3} />
      <polygon points={pts(A, M, Q)} fill={mid} />
      <polygon points={pts(A, Q, R)} fill={shade} />
      <polygon points={pts(Q, M, R)} fill={deep} />
      <polyline points={pts(L, A, R)} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" opacity="0.75" />
      <line x1={A[0]} y1={A[1]} x2={Q[0]} y2={Q[1]} stroke="#ffffff" strokeWidth="1" opacity="0.45" />
      {cap && <polygon points={pts(A, lerp(A, L, 0.2), [x - w * 0.04, y + (base - y) * 0.26], lerp(A, Q, 0.42), lerp(A, R, 0.16))} fill="#ffffff" opacity="0.92" />}
    </g>
  );
}

const BACK_PEAKS = [[120, 120, 170], [380, 70, 200], [650, 130, 160], [910, 50, 220], [1190, 110, 190], [1400, 140, 150]];
const FRONT_PEAKS = [[30, 190, 150], [255, 140, 170], [520, 180, 150], [770, 105, 190], [1035, 165, 170], [1270, 125, 180], [1450, 200, 150]];

function Range({ base }) {
  return (
    <>
      <g>
        {BACK_PEAKS.map(([x, y, w]) => <Peak key={x} x={x} y={y} w={w} base={base} palette={BACK} />)}
      </g>
      {FRONT_PEAKS.map(([x, y, w]) => <Peak key={x} x={x} y={y} w={w} base={base} palette={FRONT} />)}
    </>
  );
}

const FLOES = [[210, 334, 54], [470, 352, 34], [690, 326, 70], [960, 346, 44], [1180, 330, 58], [1360, 356, 30]];

/** Wide glacier panorama. `water` adds a reflective sea with floating ice floes. */
export function GlacierRange({ water = true, className = '' }) {
  const base = 300;
  const height = water ? 400 : 300;
  return (
    <svg viewBox={`0 0 1440 ${height}`} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      {water && <defs>
        <linearGradient id="glacier-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fa6cc" />
          <stop offset="1" stopColor="#36608c" />
        </linearGradient>
        <clipPath id="glacier-sea-clip">
          <rect x="0" y={base} width="1440" height={height - base} />
        </clipPath>
      </defs>}
      <Range base={base} />
      {water && (
        <>
          <rect x="0" y={base} width="1440" height={height - base} fill="url(#glacier-sea)" />
          <g clipPath="url(#glacier-sea-clip)" opacity="0.28" transform={`translate(0 ${base * 1.6}) scale(1 -0.6)`}>
            {FRONT_PEAKS.map(([x, y, w]) => <Peak key={x} x={x} y={y} w={w} base={base} palette={FRONT} cap={false} />)}
          </g>
          <line x1="0" y1={base} x2="1440" y2={base} stroke="#f1f6fb" strokeWidth="2" opacity="0.7" />
          {[[90, 318, 160], [620, 312, 220], [1080, 322, 180], [300, 372, 120], [840, 382, 200]].map(([x, y, w]) => (
            <line key={`${x}-${y}`} x1={x} y1={y} x2={x + w} y2={y} stroke="#f1f6fb" strokeWidth="1.5" opacity="0.28" strokeLinecap="round" />
          ))}
          {FLOES.map(([x, y, w]) => (
            <g key={x}>
              <polygon points={pts([x - w, y], [x - w * 0.7, y - 7], [x + w * 0.6, y - 8], [x + w, y])} fill="#f1f6fb" />
              <polygon points={pts([x - w, y], [x + w, y], [x + w * 0.85, y + 5], [x - w * 0.9, y + 4])} fill="#9ab7d5" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

/** Circular emblem: a small peak above the waterline, a much larger mass beneath it. */
export function Iceberg({ className = '' }) {
  const w = 190;
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Illustration of an iceberg, mostly hidden below the waterline">
      <defs>
        <clipPath id="iceberg-circle"><circle cx="200" cy="200" r="198" /></clipPath>
        <linearGradient id="iceberg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3e2f2" />
          <stop offset="1" stopColor="#f1f6fb" />
        </linearGradient>
        <linearGradient id="iceberg-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f98c4" />
          <stop offset="1" stopColor="#2a4f7a" />
        </linearGradient>
      </defs>
      <g clipPath="url(#iceberg-circle)">
        <rect width="400" height={w} fill="url(#iceberg-sky)" />
        {[[60, 40], [110, 80], [300, 50], [340, 110], [250, 30], [40, 130], [170, 40]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#ffffff" opacity="0.95" />
        ))}
        <rect y={w} width="400" height={400 - w} fill="url(#iceberg-sea)" />
        <g opacity="0.55">
          <polygon points={pts([110, w], [200, w], [150, 300])} fill="#bcd2e8" />
          <polygon points={pts([200, w], [300, w], [250, 330])} fill="#8eb0d3" />
          <polygon points={pts([150, 300], [200, w], [250, 330])} fill="#d6e4f1" />
          <polygon points={pts([110, w], [150, 300], [90, 280])} fill="#6489b5" />
          <polygon points={pts([150, 300], [250, 330], [195, 375])} fill="#6489b5" />
          <polygon points={pts([300, w], [330, 260], [250, 330])} fill="#466c98" />
        </g>
        <Peak x={205} y={95} w={85} base={w} palette={FRONT} />
        <line x1="0" y1={w} x2="400" y2={w} stroke="#f1f6fb" strokeWidth="2" opacity="0.8" />
      </g>
      <circle cx="200" cy="200" r="198" fill="none" stroke="rgb(var(--line))" strokeWidth="2" />
    </svg>
  );
}
