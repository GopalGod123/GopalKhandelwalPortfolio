/**
 * Abstract, on-brand illustrations for projects without real screenshots.
 * Drawn with theme tokens so they adapt to light/dark automatically.
 */
const C = {
  line: 'rgb(var(--line))',
  faint: 'rgb(var(--faint))',
  muted: 'rgb(var(--muted))',
  ink: 'rgb(var(--ink))',
  elev: 'rgb(var(--elev))',
  accent: 'rgb(var(--accent))',
  accentInk: 'rgb(var(--accent-ink))',
  // Lime in dark mode, deep olive in light mode — readable as a stroke/text on both.
  accentText: 'rgb(var(--accent-text))',
};

const mono = { fontFamily: '"Geist Mono", ui-monospace, monospace' };

function Graph() {
  const nodes = [
    [120, 110], [250, 80], [400, 120], [520, 90], [160, 260], [320, 230], [470, 280], [560, 220], [240, 360], [420, 370],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [6, 7], [3, 7], [4, 8], [8, 9], [9, 6], [1, 5]];
  const path = [4, 5, 6, 7];
  const onPath = (a, b) => path.some((n, i) => (n === a && path[i + 1] === b) || (n === b && path[i + 1] === a));
  return (
    <svg viewBox="0 0 640 440" className="h-full w-full">
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={onPath(a, b) ? C.accentText : C.line} strokeWidth={onPath(a, b) ? 2.5 : 1.5} strokeDasharray={onPath(a, b) ? '6 6' : undefined}>
          {onPath(a, b) && <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />}
        </line>
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} transform={`translate(${x - 18} ${y - 22})`}>
          <rect width="36" height="44" rx="6" fill={C.elev} stroke={path.includes(i) ? C.accentText : C.line} strokeWidth="1.5" />
          {[12, 20, 28].map((ly) => <rect key={ly} x="8" y={ly} width={ly === 28 ? 12 : 20} height="3" rx="1.5" fill={C.faint} opacity="0.6" />)}
        </g>
      ))}
      <g transform="translate(60 395)">
        <rect width="300" height="30" rx="15" fill={C.accent} />
        <text x="16" y="20" fontSize="12" fill={C.accentInk} style={mono}>{'compare(“clause 4”, “clause 7”) →'}</text>
      </g>
    </svg>
  );
}

function Wave() {
  const bars = Array.from({ length: 36 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 0.55)) * 0.75);
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 px-[8%]">
      <div className="flex items-center gap-3 font-mono text-[11px] text-faint">
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" /> LIVE · voice session
      </div>
      <div className="flex h-28 items-center gap-[3px]">
        {bars.map((height, i) => (
          <span
            key={i}
            className="w-full origin-center animate-wave rounded-full bg-accent"
            style={{ height: `${height * 100}%`, animationDelay: `${(i % 9) * -0.15}s`, opacity: 0.35 + height * 0.65 }}
          />
        ))}
      </div>
      <div className="space-y-2 font-mono text-xs">
        <p className="text-muted"><span className="text-faint">user ›</span> I’ve had a headache since morning…</p>
        <p className="text-ink"><span className="text-accent-text">meera ›</span> I’m sorry to hear that. Have you had water today?</p>
      </div>
    </div>
  );
}

function Rank() {
  const rows = [['Candidate A', 0.94], ['Candidate B', 0.88], ['Candidate C', 0.71], ['Candidate D', 0.52], ['Candidate E', 0.38]];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2.5 px-[8%]">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Role · Senior React Engineer</p>
      {rows.map(([name, score], i) => (
        <div key={name} className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${i === 0 ? 'border-accent bg-accent/10' : 'border-line bg-elev'}`}>
          <span className="w-5 font-mono text-xs text-faint">{i + 1}</span>
          <span className="w-28 text-sm">{name}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-soft">
            <span className={`block h-full rounded-full ${i < 2 ? 'bg-accent' : 'bg-faint/50'}`} style={{ width: `${score * 100}%` }} />
          </span>
          <span className="w-10 text-right font-mono text-xs text-muted">{score.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function Scan() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 640 440" className="h-full w-full">
        <path
          d="M70 300 Q70 262 102 256 L190 244 L252 192 Q266 182 292 182 L420 182 Q446 182 462 198 L508 244 L560 254 Q586 260 586 288 L586 300 Z"
          fill={C.elev}
          stroke={C.muted}
          strokeWidth="2"
        />
        <path d="M262 200 L300 200 L300 242 L210 242 Z M318 200 L410 200 Q428 200 440 214 L462 242 L318 242 Z" fill={C.line} />
        {[170, 480].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="300" r="33" fill={C.elev} stroke={C.muted} strokeWidth="6" />
            <circle cx={cx} cy="300" r="9" fill={C.muted} />
          </g>
        ))}
        <g>
          <rect x="350" y="250" width="110" height="52" rx="6" fill="none" stroke={C.accentText} strokeWidth="2.5" />
          <rect x="350" y="226" width="96" height="22" rx="4" fill={C.accent} />
          <text x="358" y="241" fontSize="11" fill={C.accentInk} style={mono}>dent · 0.92</text>
        </g>
        <g>
          <rect x="84" y="262" width="62" height="32" rx="6" fill="none" stroke={C.muted} strokeWidth="2" strokeDasharray="5 4" />
          <text x="84" y="362" fontSize="11" fill={C.muted} style={mono}>scratch · 0.67</text>
          <line x1="100" y1="296" x2="100" y2="348" stroke={C.muted} strokeDasharray="3 3" />
        </g>
      </svg>
      <span className="absolute inset-x-[8%] top-[22%] h-px animate-scan bg-accent shadow-[0_0_24px_4px_rgb(var(--accent)/0.5)] [--scan-distance:160px]" />
    </div>
  );
}

function Drive() {
  return (
    <svg viewBox="0 0 640 440" className="h-full w-full">
      <line x1="0" y1="170" x2="640" y2="170" stroke={C.line} strokeWidth="1.5" />
      <polygon points="120,440 520,440 340,170 300,170" fill={C.elev} opacity="0.7" />
      <line x1="120" y1="440" x2="300" y2="170" stroke={C.accentText} strokeWidth="3" />
      <line x1="520" y1="440" x2="340" y2="170" stroke={C.accentText} strokeWidth="3" />
      <line x1="320" y1="440" x2="320" y2="170" stroke={C.muted} strokeWidth="3" strokeDasharray="22 18">
        <animate attributeName="stroke-dashoffset" from="0" to="40" dur="0.8s" repeatCount="indefinite" />
      </line>
      <polygon points="190,440 450,440 330,215 310,215" fill={C.accent} opacity="0.08" />

      <g transform="translate(410 34)">
        <rect width="196" height="150" rx="16" fill={C.elev} stroke={C.line} strokeWidth="1.5" />
        <text x="14" y="24" fontSize="10" fill={C.faint} style={mono}>DRIVER CAM</text>
        <circle cx="98" cy="74" r="22" fill="none" stroke={C.muted} strokeWidth="2" />
        <path d="M58 132 Q62 104 98 102 Q134 104 138 132" fill="none" stroke={C.muted} strokeWidth="2" />
        {[[66, 42, 1, 1], [130, 42, -1, 1], [66, 112, 1, -1], [130, 112, -1, -1]].map(([x, y, dx, dy]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y + 12 * dy} L${x} ${y} L${x + 12 * dx} ${y}`} fill="none" stroke={C.accentText} strokeWidth="2.5" />
        ))}
      </g>
      <g transform="translate(410 196)">
        <rect width="150" height="26" rx="13" fill={C.accent} />
        <text x="14" y="17" fontSize="11" fill={C.accentInk} style={mono}>verified · 0.95</text>
      </g>

      <g style={mono} fontSize="11" fill={C.muted}>
        <text x="32" y="372">LANE · CENTRED</text>
        <text x="32" y="394">EYES · ON ROAD</text>
        <text x="32" y="416" fill={C.accentText}>● SESSION RECORDING</text>
      </g>
    </svg>
  );
}

const variants = { graph: Graph, wave: Wave, rank: Rank, scan: Scan, drive: Drive };

export default function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <>
        <img src={project.image} alt={`${project.title} in use`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </>
    );
  }
  const Visual = variants[project.visual] ?? Graph;
  return (
    <div className="grid-bg h-full w-full" aria-hidden="true">
      <Visual />
    </div>
  );
}
