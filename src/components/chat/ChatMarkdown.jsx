import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* eslint-disable no-unused-vars -- `node` is destructured out so it isn't spread onto DOM elements. */
const components = {
  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
  ul: ({ node, ...props }) => <ul className="my-2 list-disc space-y-1 pl-4" {...props} />,
  ol: ({ node, ...props }) => <ol className="my-2 list-decimal space-y-1 pl-4" {...props} />,
  a: ({ node, ...props }) => <a className="break-words underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
  code: ({ node, ...props }) => <code className="rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10" {...props} />,
};
/* eslint-enable no-unused-vars */

export default function ChatMarkdown({ children }) {
  return (
    <div className="break-words leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children || ''}
      </ReactMarkdown>
    </div>
  );
}
