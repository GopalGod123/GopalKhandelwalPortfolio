/**
 * Turns files a visitor attaches to the chat into plain text, entirely in the browser.
 * The PDF and Word parsers are heavy, so they are only downloaded when such a file is picked.
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_DOCUMENTS = 3;
export const MAX_DOCUMENT_CHARS = 100_000; // matches the server-side cap in api/_lib/prompt.js
export const ACCEPTED_FILES = '.pdf,.docx,.txt,.md,.markdown,.csv,.json,.html,.htm';

const TEXT_TYPES = /\.(txt|md|markdown|csv|json)$/i;

async function pdfText(file) {
  const [pdfjs, { default: workerUrl }] = await Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]);
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let n = 1; n <= pdf.numPages; n += 1) {
    const content = await (await pdf.getPage(n)).getTextContent();
    pages.push(content.items.map((item) => `${item.str}${item.hasEOL ? '\n' : ''}`).join(''));
    if (pages.join('\n\n').length > MAX_DOCUMENT_CHARS) break;
  }
  await pdf.destroy();
  return pages.join('\n\n');
}

async function docxText(file) {
  const { default: mammoth } = await import('mammoth/mammoth.browser.js');
  const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return value;
}

function htmlText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script,style,noscript').forEach((el) => el.remove());
  return doc.body?.innerText || doc.body?.textContent || '';
}

/** File → { name, text, chars, truncated }. Throws an Error with a visitor-friendly message. */
export async function extractDocument(file) {
  if (file.size > MAX_FILE_BYTES) throw new Error(`${file.name} is larger than 10 MB.`);
  const name = file.name;
  let text;
  if (/\.pdf$/i.test(name) || file.type === 'application/pdf') text = await pdfText(file);
  else if (/\.docx$/i.test(name)) text = await docxText(file);
  else if (/\.html?$/i.test(name)) text = htmlText(await file.text());
  else if (TEXT_TYPES.test(name) || file.type.startsWith('text/')) text = await file.text();
  else throw new Error(`${name}: only PDF, Word (.docx), text, Markdown, CSV, JSON and HTML files are supported.`);

  const clean = text.replaceAll('\u0000', '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  if (!clean) throw new Error(`${name} has no readable text (scanned PDFs need OCR first).`);
  return { name, text: clean.slice(0, MAX_DOCUMENT_CHARS), chars: clean.length, truncated: clean.length > MAX_DOCUMENT_CHARS };
}
