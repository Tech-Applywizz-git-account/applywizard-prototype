import { useEffect, useState } from 'react';

import { candidates as seedCandidates } from './data';

export type CandidateRecord = {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: string;
  match: number;
  stage: string;
};

/** Forward hiring pipeline (Reject is a separate action). */
export const STAGE_FLOW = [
  'Pending review',
  'Applied',
  'Under review',
  'Shortlisted',
  'Phone screen',
  'Assessment',
  'Interview',
  'Offer Sent',
  'Hired',
] as const;

export type PipelineStage = (typeof STAGE_FLOW)[number] | 'Rejected';

export const candidatesState: CandidateRecord[] = seedCandidates.map((c, index) => ({
  id: `cand-${index + 1}`,
  ...c,
  stage: c.stage === 'Offer sent' ? 'Offer Sent' : c.stage,
}));

let selectedCandidateId: string = candidatesState[0]?.id ?? '';
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function setSelectedCandidateId(id: string) {
  selectedCandidateId = id;
  notify();
}

export function getSelectedCandidate(): CandidateRecord {
  return candidatesState.find((c) => c.id === selectedCandidateId) ?? candidatesState[0];
}

export function useSelectedCandidate() {
  const [id, setId] = useState(selectedCandidateId);
  useEffect(() => {
    const listener = () => setId(selectedCandidateId);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return candidatesState.find((c) => c.id === id) ?? candidatesState[0];
}

export function useCandidates() {
  const [list, setList] = useState<CandidateRecord[]>(() => [...candidatesState]);
  useEffect(() => {
    const listener = () => setList([...candidatesState]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return list;
}

export function nextStageFor(stage: string): string | null {
  const index = STAGE_FLOW.indexOf(stage as (typeof STAGE_FLOW)[number]);
  if (index < 0 || index >= STAGE_FLOW.length - 1) return null;
  return STAGE_FLOW[index + 1];
}

export function setCandidateStage(id: string, stage: string) {
  const person = candidatesState.find((c) => c.id === id);
  if (!person) return;
  person.stage = stage;
  notify();
}

export function advanceCandidate(id: string) {
  const person = candidatesState.find((c) => c.id === id);
  if (!person) return { ok: false as const, error: 'Candidate not found.' };
  const next = nextStageFor(person.stage);
  if (!next) {
    return { ok: false as const, error: person.stage === 'Hired' || person.stage === 'Rejected' ? 'This candidate is already at a final stage.' : 'No next stage available.' };
  }
  person.stage = next;
  notify();
  return { ok: true as const, stage: next };
}
