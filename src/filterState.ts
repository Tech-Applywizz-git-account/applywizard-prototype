import { useEffect, useState } from 'react';

export type JobFilters = {
  cities: string[];
  categories: string[];
  experience: string[];
  types: string[];
  workModes: string[];
  appType: string;
  datePosted: string | null;
};

export const defaultJobFilters: JobFilters = {
  cities: [],
  categories: [],
  experience: [],
  types: [],
  workModes: [],
  appType: 'All',
  datePosted: null,
};

let currentFilters: JobFilters = { ...defaultJobFilters };
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function getJobFilters() {
  return currentFilters;
}

export function setJobFilters(next: JobFilters) {
  currentFilters = { ...next };
  notify();
}

export function clearJobFilters() {
  currentFilters = { ...defaultJobFilters };
  notify();
}

export function useJobFilters() {
  const [filters, setFilters] = useState<JobFilters>(() => ({ ...currentFilters }));
  useEffect(() => {
    const listener = () => setFilters({ ...currentFilters });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return filters;
}
