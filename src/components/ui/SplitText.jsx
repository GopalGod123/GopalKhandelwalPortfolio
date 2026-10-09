import { Children, Fragment, isValidElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/motion';

const word = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(6px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
};

/** Glues trailing punctuation onto the word before it, so "AI." doesn't render as "AI ." */
const attachPunctuation = (parts) =>
  parts.reduce((out, part) => {
    if (typeof part === 'string' && /^[.,!?;:]+$/.test(part) && out.length) {
      const prev = out.pop();
      out.push(<Fragment key={out.length}>{prev}{part}</Fragment>);
    } else {
      out.push(part);
    }
    return out;
  }, []);

/** Splits strings into words; elements (e.g. a styled accent span) stay whole and animate as one word. */
const toWords = (children) => attachPunctuation(splitWords(children));

const splitWords = (children) =>
  Children.toArray(children).flatMap((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child).split(/(\s+)/).filter(Boolean);
    if (isValidElement(child) && child.type === Fragment) return splitWords(child.props.children);
    return isValidElement(child) ? [child] : [];
  });

/**
 * Word-by-word masked reveal: each word rises out of its own clipping line.
 * `inView` plays on scroll; otherwise it plays on mount.
 */
export default function SplitText({ children, as = 'span', className = '', delay = 0, stagger = 0.06, inView = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' };

  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {toWords(children).map((part, index) =>
        typeof part === 'string' && /^\s+$/.test(part) ? (
          ' '
        ) : (
          // Vertical padding keeps descenders and italic overhangs inside the clip.
          <span key={index} className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] pr-[0.04em] align-bottom">
            <motion.span variants={word} className="inline-block will-change-transform">
              {part}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  );
}
