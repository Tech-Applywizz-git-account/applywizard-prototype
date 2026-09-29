import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

export const themeState = {
  mode: 'light' as ThemeMode,
};

const themeListeners = new Set<() => void>();

export function changeTheme(mode: ThemeMode) {
  themeState.mode = mode;
  themeListeners.forEach((fn) => fn());
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(themeState.mode);

  useEffect(() => {
    const listener = () => setMode(themeState.mode);
    themeListeners.add(listener);
    return () => {
      themeListeners.delete(listener);
    };
  }, []);

  return { mode, changeTheme };
}
