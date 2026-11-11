import { useEffect, useState } from 'react';

import { reels } from './reelsData';

/** Current Posts feed index — preserved when opening Report Post. */
export let reelsFeedIndex = 0;

export function setReelsFeedIndex(index: number) {
  reelsFeedIndex = Math.max(0, index);
}

/** Reel selected for the Report Post screen. */
export let reportReelId: string = reels[0]?.id ?? 'reel-1';

const reportListeners = new Set<() => void>();

export function setReportReelId(id: string) {
  reportReelId = id;
  reportListeners.forEach((fn) => fn());
}

export function getReportReel() {
  return reels.find((r) => r.id === reportReelId) ?? reels[0];
}

export function useReportReel() {
  const [id, setId] = useState(reportReelId);
  useEffect(() => {
    const listener = () => setId(reportReelId);
    reportListeners.add(listener);
    return () => {
      reportListeners.delete(listener);
    };
  }, []);
  return reels.find((r) => r.id === id) ?? reels[0];
}

/** Prototype report submissions (no backend). */
export const reportedReelIds = new Set<string>();

/** Prototype blocked company accounts. */
export const blockedCompanies = new Set<string>();

const blockListeners = new Set<() => void>();

function notifyBlocks() {
  blockListeners.forEach((fn) => fn());
}

export function blockCompany(company: string) {
  blockedCompanies.add(company);
  notifyBlocks();
}

export function isCompanyBlocked(company: string) {
  return blockedCompanies.has(company);
}

export function useBlockedCompanies() {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const listener = () => setVersion((v) => v + 1);
    blockListeners.add(listener);
    return () => {
      blockListeners.delete(listener);
    };
  }, []);
  return { version, blocked: blockedCompanies };
}

export function markReelReported(id: string) {
  reportedReelIds.add(id);
}

export function isReelReported(id: string) {
  return reportedReelIds.has(id);
}

export const REPORT_REASONS = [
  'Spam or advertising',
  'Scam or fraud',
  'Harassment or bullying',
  'Hate or discrimination',
  'Inappropriate or sexual content',
  'Fake or misleading',
  'Other',
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];
