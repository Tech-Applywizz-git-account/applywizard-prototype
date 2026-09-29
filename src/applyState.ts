import { useEffect, useState } from 'react';

import type { JobModel } from './data';
import { allJobs, job, secondJob, thirdJob, seeker } from './data';

export type ApplicationRecord = {
  id: string;
  jobId: string;
  title: string;
  company: string;
  initials: string;
  logoColor: string;
  status: 'Applied' | 'Under review' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  stageIndex: number;
  daysAgo: string;
  email: string;
  phone: string;
  resumeFile: string;
  jobAlerts: boolean;
  appliedAt: number;
};

/** Currently selected job for details / quick apply. */
export let selectedJobId: string = job.id;

const selectedJobListeners = new Set<() => void>();

export function setSelectedJobId(id: string) {
  selectedJobId = id;
  selectedJobListeners.forEach((fn) => fn());
}

export function getSelectedJob(): JobModel {
  return allJobs.find((j) => j.id === selectedJobId) ?? allJobs[0];
}

export function useSelectedJob() {
  const [id, setId] = useState(selectedJobId);
  useEffect(() => {
    const listener = () => setId(selectedJobId);
    selectedJobListeners.add(listener);
    return () => {
      selectedJobListeners.delete(listener);
    };
  }, []);
  return allJobs.find((j) => j.id === id) ?? allJobs[0];
}

/** Seeded applications from the existing Applied screen demo data. */
export const applications: ApplicationRecord[] = [
  {
    id: 'app-seed-1',
    jobId: job.id,
    title: job.title,
    company: job.company,
    initials: job.initials,
    logoColor: job.logoColor,
    status: 'Shortlisted',
    stageIndex: 2,
    daysAgo: 'Applied today',
    email: seeker.email,
    phone: seeker.phone,
    resumeFile: seeker.resumeFile,
    jobAlerts: true,
    appliedAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: 'app-seed-2',
    jobId: secondJob.id,
    title: secondJob.title,
    company: secondJob.company,
    initials: secondJob.initials,
    logoColor: secondJob.logoColor,
    status: 'Applied',
    stageIndex: 1,
    daysAgo: 'Applied 4 days ago',
    email: seeker.email,
    phone: seeker.phone,
    resumeFile: seeker.resumeFile,
    jobAlerts: false,
    appliedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: 'app-seed-3',
    jobId: thirdJob.id,
    title: thirdJob.title,
    company: thirdJob.company,
    initials: thirdJob.initials,
    logoColor: thirdJob.logoColor,
    status: 'Rejected',
    stageIndex: 0,
    daysAgo: 'Applied 2 weeks ago',
    email: seeker.email,
    phone: seeker.phone,
    resumeFile: seeker.resumeFile,
    jobAlerts: false,
    appliedAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
];

const applicationListeners = new Set<() => void>();

export function useApplications() {
  const [list, setList] = useState<ApplicationRecord[]>(() => [...applications]);
  useEffect(() => {
    const listener = () => setList([...applications]);
    applicationListeners.add(listener);
    return () => {
      applicationListeners.delete(listener);
    };
  }, []);
  return list;
}

export function hasAppliedToJob(jobId: string) {
  return applications.some((a) => a.jobId === jobId && a.status !== 'Rejected');
}

export function submitApplication(input: {
  job: JobModel;
  email: string;
  phone: string;
  resumeFile: string;
  jobAlerts: boolean;
}): { ok: true; application: ApplicationRecord } | { ok: false; error: string } {
  if (hasAppliedToJob(input.job.id)) {
    return { ok: false, error: 'You already applied to this job.' };
  }

  const record: ApplicationRecord = {
    id: `app-${Date.now()}`,
    jobId: input.job.id,
    title: input.job.title,
    company: input.job.company,
    initials: input.job.initials,
    logoColor: input.job.logoColor,
    status: 'Applied',
    stageIndex: 0,
    daysAgo: 'Applied just now',
    email: input.email,
    phone: input.phone,
    resumeFile: input.resumeFile,
    jobAlerts: input.jobAlerts,
    appliedAt: Date.now(),
  };

  applications.unshift(record);
  applicationListeners.forEach((fn) => fn());
  return { ok: true, application: record };
}

export type ResumeItem = {
  id: string;
  fileName: string;
  label: string;
  size: string;
};

/** Resume library from existing seeker profile data. */
export function getResumeLibrary(): ResumeItem[] {
  return [
    {
      id: 'resume-1',
      fileName: seeker.resumeFile,
      label: 'Latest resume',
      size: seeker.resumeSize,
    },
  ];
}

export function seekerInitials() {
  return seeker.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function seekerCityShort() {
  return seeker.city.split(',')[0]?.trim() || seeker.city;
}

export function seekerEducationLine() {
  return `${seeker.education} · ${seeker.categories.slice(0, 2).join(' & ') || 'Learning'}`;
}
