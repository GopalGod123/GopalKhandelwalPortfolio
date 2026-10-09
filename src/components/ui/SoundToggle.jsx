import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const KEY = 'sound';
const SRC = '/audio/snow-ambience.mp3';
const VOLUME = 0.35;
const FADE_MS = 1200;

const readEnabled = () => {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
};

const saveEnabled = (on) => {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    // Storage unavailable: the choice lasts for this visit only.
  }
};

/**
 * Looping ambient snow sound with a mute button. Browsers only allow audio after the
 * visitor interacts with the page, so playback starts on the first click, tap or key
 * press (unless they muted it before). Fades in and out, and pauses in hidden tabs.
 */
export default function SoundToggle() {
  const audioRef = useRef(null);
  const fadeRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  const audio = () => {
    if (!audioRef.current) {
      const el = new Audio(SRC);
      el.loop = true;
      el.preload = 'auto';
      el.volume = 0;
      audioRef.current = el;
    }
    return audioRef.current;
  };

  const fadeTo = (target, done) => {
    const el = audioRef.current;
    if (!el) return;
    cancelAnimationFrame(fadeRef.current);
    const from = el.volume;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      el.volume = from + (target - from) * t;
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const play = useCallback(() => {
    const el = audio();
    return el.play().then(
      () => {
        setPlaying(true);
        fadeTo(VOLUME);
      },
      () => setPlaying(false),
    );
  }, []);

  const pause = useCallback(() => {
    setPlaying(false);
    fadeTo(0, () => audioRef.current?.pause());
  }, []);

  // Start on the first interaction anywhere on the page, unless the visitor muted it.
  useEffect(() => {
    if (!readEnabled()) return undefined;
    const events = ['pointerdown', 'keydown', 'touchstart'];
    const unlock = (event) => {
      if (event.target instanceof Element && event.target.closest('[data-sound-toggle]')) return;
      events.forEach((name) => window.removeEventListener(name, unlock));
      if (readEnabled()) play();
    };
    events.forEach((name) => window.addEventListener(name, unlock, { passive: true }));
    return () => events.forEach((name) => window.removeEventListener(name, unlock));
  }, [play]);

  // Silence background tabs; resume when the visitor comes back.
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current;
      if (!el || !readEnabled()) return;
      if (document.hidden) el.pause();
      else if (playing) el.play().catch(() => setPlaying(false));
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing]);

  useEffect(() => () => {
    cancelAnimationFrame(fadeRef.current);
    audioRef.current?.pause();
  }, []);

  const toggle = () => {
    if (playing) {
      saveEnabled(false);
      pause();
    } else {
      saveEnabled(true);
      play();
    }
  };

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggle}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/30 ${playing ? 'text-accent-text' : 'text-faint'}`}
      aria-label={playing ? 'Mute background sound' : 'Play background sound'}
      aria-pressed={playing}
      title={playing ? 'Sound on' : 'Sound off'}
    >
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
