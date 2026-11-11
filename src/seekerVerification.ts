import { useEffect, useState } from 'react';

/**
 * Prototype verification flag for US remote partner jobs.
 * Defaults to false so the verify-to-apply gate is visible in the demo.
 */
let seekerVerified = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function isSeekerVerified() {
  return seekerVerified;
}

export function setSeekerVerified(value: boolean) {
  seekerVerified = value;
  notify();
}

export function useSeekerVerified() {
  const [verified, setVerified] = useState(seekerVerified);
  useEffect(() => {
    const listener = () => setVerified(seekerVerified);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return verified;
}
