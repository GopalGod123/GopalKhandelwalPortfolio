import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ASSISTANT_OPEN_EVENT } from '@/lib/assistant';

// The panel pulls in react-markdown; only load it once someone opens the chat.
const AssistantPanel = lazy(() => import('./AssistantPanel'));

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const closePanel = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => {
      setLoaded(true);
      setOpen(true);
    };
    window.addEventListener(ASSISTANT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASSISTANT_OPEN_EVENT, onOpen);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {loaded && (
        <Suspense fallback={null}>
          <AssistantPanel open={open} onClose={closePanel} />
        </Suspense>
      )}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, delay: loaded ? 0 : 1.2 }}
            onClick={() => {
              setLoaded(true);
              setOpen(true);
            }}
            onPointerEnter={() => setLoaded(true)}
            className="group flex items-center gap-2.5 rounded-full border border-line bg-elev/90 py-2 pl-2 pr-4 text-sm font-medium shadow-[0_10px_40px_-10px_rgb(0_0_0/0.35)] backdrop-blur-xl transition-colors hover:border-accent/60"
            aria-label="Open AI assistant"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-ink">
              <Sparkles size={15} />
            </span>
            Ask my AI
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
