import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders assistant / user chat text with GitHub-flavored markdown (bold, lists, links, code).
 * `variant`: "bot" bubbles use surface colors; "user" uses on-accent contrast.
 */
export default function ChatMarkdown({ children, variant = 'bot', isDark = false }) {
  const isUser = variant === 'user';

  const components = {
    p: ({ node: _n, ...props }) => <p className="mb-1.5 last:mb-0 first:mt-0" {...props} />,
    strong: ({ node: _n, ...props }) => (
      <strong
        className={
          isUser
            ? 'font-semibold text-white'
            : isDark
              ? 'font-semibold text-white'
              : 'font-semibold text-surface-900'
        }
        {...props}
      />
    ),
    em: ({ node: _n, ...props }) => (
      <em className={isUser ? 'italic text-white/95' : isDark ? 'italic text-surface-300' : 'italic text-surface-600'} {...props} />
    ),
    ul: ({ node: _n, ...props }) => (
      <ul className={`my-1.5 pl-4 space-y-0.5 list-disc ${isUser ? 'text-white/95' : ''}`} {...props} />
    ),
    ol: ({ node: _n, ...props }) => (
      <ol className={`my-1.5 pl-4 space-y-0.5 list-decimal ${isUser ? 'text-white/95' : ''}`} {...props} />
    ),
    li: ({ node: _n, ...props }) => <li className="leading-relaxed" {...props} />,
    a: ({ node: _n, ...props }) => (
      <a
        className={`underline underline-offset-2 font-medium break-words ${
          isUser ? 'text-white hover:text-white/90' : 'text-accent hover:text-accent-dark'
        }`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    code: ({ node: _n, inline, className, children, ...props }) =>
      inline ? (
        <code
          className={`px-1 py-0.5 rounded text-[0.85em] font-mono ${
            isUser ? 'bg-white/20 text-white' : isDark ? 'bg-surface-700 text-surface-100' : 'bg-surface-200 text-surface-800'
          } ${className || ''}`}
          {...props}
        >
          {children}
        </code>
      ) : (
        <pre
          className={`my-2 p-3 rounded-xl text-xs font-mono overflow-x-auto ${
            isUser ? 'bg-black/25 text-white border border-white/10' : isDark ? 'bg-surface-950 border border-surface-700' : 'bg-surface-100 border border-surface-200'
          }`}
        >
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ),
    h1: ({ node: _n, ...props }) => <h4 className="text-sm font-semibold mt-2 mb-1 first:mt-0" {...props} />,
    h2: ({ node: _n, ...props }) => <h4 className="text-sm font-semibold mt-2 mb-1 first:mt-0" {...props} />,
    h3: ({ node: _n, ...props }) => <h4 className="text-sm font-semibold mt-2 mb-1 first:mt-0" {...props} />,
    blockquote: ({ node: _n, ...props }) => (
      <blockquote
        className={`border-l-2 pl-2 my-1.5 italic ${
          isUser ? 'border-white/40 text-white/90' : isDark ? 'border-surface-600 text-surface-400' : 'border-surface-300 text-surface-600'
        }`}
        {...props}
      />
    ),
    hr: () => <hr className={`my-2 ${isUser ? 'border-white/20' : isDark ? 'border-surface-700' : 'border-surface-200'}`} />,
  };

  return (
    <div className="chat-markdown text-sm leading-relaxed break-words [&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children || ''}
      </ReactMarkdown>
    </div>
  );
}
