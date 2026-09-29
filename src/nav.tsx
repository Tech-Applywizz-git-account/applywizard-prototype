import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { scrollMemory } from './scrollMemory';

export type Transition = 'push' | 'fade';
export type OverlayId = 'filters' | 'drawer' | null;

type Entry = { id: string; transition: Transition };

type Nav = {
  current: Entry;
  depth: number;
  overlay: OverlayId;
  push: (id: string) => void;
  swap: (id: string) => void;
  reset: (id: string) => void;
  back: () => void;
  jump: (id: string) => void;
  open: (id: Exclude<OverlayId, null>) => void;
  close: () => void;
};

const NavContext = createContext<Nav | null>(null);

export function useNav() {
  const nav = useContext(NavContext);
  if (!nav) throw new Error('useNav outside NavProvider');
  return nav;
}

export function NavProvider({ initial, children }: { initial: string; children: ReactNode }) {
  const [stack, setStack] = useState<Entry[]>([{ id: initial, transition: 'fade' }]);
  const [overlay, setOverlay] = useState<OverlayId>(null);

  const push = useCallback((id: string) => {
    setOverlay(null);
    setStack((current) => [...current, { id, transition: 'push' }]);
  }, []);

  const swap = useCallback((id: string) => {
    setOverlay(null);
    setStack((current) => {
      const leaving = current[current.length - 1];
      if (leaving) scrollMemory.clear(leaving.id);
      return [...current.slice(0, -1), { id, transition: 'fade' }];
    });
  }, []);

  const reset = useCallback((id: string) => {
    setOverlay(null);
    scrollMemory.clearAll();
    setStack([{ id, transition: 'fade' }]);
  }, []);

  const back = useCallback(() => {
    if (overlay) {
      setOverlay(null);
      return;
    }
    setStack((current) => {
      if (current.length <= 1) return current;
      const leaving = current[current.length - 1];
      scrollMemory.clear(leaving.id);
      return current.slice(0, -1);
    });
  }, [overlay]);

  const value = useMemo<Nav>(
    () => ({
      current: stack[stack.length - 1],
      depth: stack.length,
      overlay,
      push,
      swap,
      reset,
      back,
      jump: reset,
      open: (id) => setOverlay(id),
      close: () => setOverlay(null),
    }),
    [stack, overlay, push, swap, reset, back],
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
