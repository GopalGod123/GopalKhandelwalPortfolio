/**
 * Small, dependency-free retrieval: chunking + BM25 ranking.
 * Runs inside the serverless function, so there is no vector DB to host or keep in sync.
 */

const STOPWORDS = new Set(
  'a an and are as at be but by can could did do does for from had has have he her his how i if in into is it its me my of on or our she so than that the their them then there these they this to up was we were what when where which who why will with would you your about tell does did any all also just more some'.split(' '),
);

// Light stemming so "agents"/"agent" and "built"/"build" meet in the index.
const IRREGULAR = { built: 'build', ran: 'run', made: 'make', worked: 'work', led: 'lead', wrote: 'write' };
function stem(word) {
  if (IRREGULAR[word]) return IRREGULAR[word];
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

export function tokenize(text) {
  return (String(text).toLowerCase().match(/[a-z0-9][a-z0-9+#.]*/g) || [])
    .map((t) => t.replace(/\.+$/, ''))
    .filter((t) => t && !STOPWORDS.has(t))
    .map(stem);
}

/** Splits long text into overlapping chunks, preferring paragraph and sentence boundaries. */
export function chunkText(text, { size = 1200, overlap = 150 } = {}) {
  const clean = String(text).replace(/\r/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  if (!clean) return [];
  const chunks = [];
  let start = 0;
  while (start < clean.length) {
    let end = Math.min(start + size, clean.length);
    if (end < clean.length) {
      const window = clean.slice(start + size * 0.5, end);
      const cut = Math.max(window.lastIndexOf('\n\n'), window.lastIndexOf('. '), window.lastIndexOf('\n'));
      if (cut > 0) end = start + size * 0.5 + cut + 1;
    }
    chunks.push(clean.slice(start, end).trim());
    if (end >= clean.length) break;
    start = Math.max(end - overlap, start + 1);
  }
  return chunks.filter(Boolean);
}

/** docs: [{ text, ...anything }] → index usable by `search`. */
export function createIndex(docs, { k1 = 1.4, b = 0.75 } = {}) {
  const tokens = docs.map((d) => tokenize(`${d.title || ''} ${d.text}`));
  const df = new Map();
  for (const list of tokens) for (const t of new Set(list)) df.set(t, (df.get(t) || 0) + 1);
  const avgLen = tokens.reduce((sum, list) => sum + list.length, 0) / (tokens.length || 1);
  const tf = tokens.map((list) => {
    const counts = new Map();
    for (const t of list) counts.set(t, (counts.get(t) || 0) + 1);
    return counts;
  });
  return { docs, tf, lengths: tokens.map((l) => l.length), df, avgLen, n: docs.length, k1, b };
}

/** Returns [{ doc, score }] for the best matches, highest first. */
export function search(index, query, limit = 6) {
  const terms = [...new Set(tokenize(query))];
  if (!terms.length || !index.n) return [];
  const { tf, lengths, df, avgLen, n, k1, b } = index;
  const scored = index.docs.map((doc, i) => {
    let score = 0;
    for (const term of terms) {
      const f = tf[i].get(term);
      if (!f) continue;
      const idf = Math.log(1 + (n - df.get(term) + 0.5) / (df.get(term) + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * lengths[i]) / (avgLen || 1))));
    }
    return { doc, score };
  });
  return scored.filter((s) => s.score > 0).sort((x, y) => y.score - x.score).slice(0, limit);
}
