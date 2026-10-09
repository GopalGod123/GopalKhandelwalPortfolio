import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';

/** Accessible modal built on <dialog>: Esc to close, focus trapping and restoration are native. */
export default function Modal({ open, onClose, title, children, className = '' }) {
  const ref = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      aria-label={title}
      className={`m-auto w-[min(100%-2rem,48rem)] overflow-hidden rounded-3xl border border-line bg-elev p-0 text-ink shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm ${className}`}
    >
      {open && (
        <>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-medium">{title}</h2>
            <button onClick={onClose} className="rounded-full p-2 text-muted transition-colors hover:bg-soft hover:text-ink" aria-label="Close">
              <X size={18} />
            </button>
          </div>
          {children}
        </>
      )}
    </dialog>
  );
}
