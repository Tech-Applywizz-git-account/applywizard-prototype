import { useEffect, useState } from 'react';

/** Prototype-only DigiLocker fetch state (no real API). */

export type DigiDocId = 'pan' | 'aadhaar' | 'class10' | 'class12' | 'degree';

export type DigiDocMeta = {
  id: DigiDocId;
  label: string;
  group: 'identity' | 'education';
};

export const DIGI_DOCS: DigiDocMeta[] = [
  { id: 'pan', label: 'PAN', group: 'identity' },
  { id: 'aadhaar', label: 'Aadhaar', group: 'identity' },
  { id: 'class10', label: 'Class 10 marksheet', group: 'education' },
  { id: 'class12', label: 'Class 12 marksheet', group: 'education' },
  { id: 'degree', label: 'Degree certificate', group: 'education' },
];

let fetchedDocs: DigiDocId[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function getFetchedDigiDocs(): DigiDocId[] {
  return [...fetchedDocs];
}

export function setFetchedDigiDocs(ids: DigiDocId[]) {
  fetchedDocs = [...ids];
  notify();
}

export function isDigiDocFetched(id: DigiDocId) {
  return fetchedDocs.includes(id);
}

export function useFetchedDigiDocs() {
  const [list, setList] = useState<DigiDocId[]>(() => [...fetchedDocs]);
  useEffect(() => {
    const listener = () => setList([...fetchedDocs]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return list;
}
