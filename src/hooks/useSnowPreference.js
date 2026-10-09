import { useCallback, useState } from 'react';

const KEY = 'snow';

const read = () => {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
};

/** Snowfall on/off, remembered per visitor. */
export function useSnowPreference() {
  const [enabled, setEnabled] = useState(read);

  const toggle = useCallback(() => {
    setEnabled((value) => {
      try {
        localStorage.setItem(KEY, value ? 'off' : 'on');
      } catch {
        // Storage unavailable — preference lasts for this visit only.
      }
      return !value;
    });
  }, []);

  return [enabled, toggle];
}
