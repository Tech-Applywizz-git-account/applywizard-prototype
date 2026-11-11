/** Reels content for the jobseeker prototype — uses local public videos only. */

export type ReelCategory = 'For You' | 'Jobs' | 'Career Tips' | 'Company Life' | 'Interview Tips';

export type ReelComment = {
  id: string;
  user: string;
  initials: string;
  color: string;
  text: string;
  likes: number;
  liked?: boolean;
  time: string;
};

export type ReelModel = {
  id: string;
  category: Exclude<ReelCategory, 'For You'>;
  videoUrl: string;
  posterColor: string;
  company: string;
  initials: string;
  logoColor: string;
  verified: boolean;
  jobTitle?: string;
  location?: string;
  employmentType?: string;
  salary?: string;
  description: string;
  jobId?: string;
  likes: number;
  comments: number;
  shares: number;
  commentList: ReelComment[];
};

export const REEL_CATEGORIES: ReelCategory[] = [
  'For You',
  'Jobs',
  'Career Tips',
  'Company Life',
  'Interview Tips',
];

/** Local videos from /public — do not replace with external URLs. */
export const reels: ReelModel[] = [
  {
    id: 'reel-1',
    category: 'Jobs',
    videoUrl: '/video1.mp4',
    posterColor: '#1e1b4b',
    company: 'Tech Solutions',
    initials: 'TS',
    logoColor: '#4432ff',
    verified: true,
    jobTitle: 'Software Developer Opportunities',
    location: 'Hyderabad',
    employmentType: 'FULL TIME',
    salary: '₹4–8 LPA',
    description:
      'Explore exciting software development opportunities and take your career forward.',
    jobId: 'job-5',
    likes: 1240,
    comments: 48,
    shares: 36,
    commentList: [
      {
        id: 'c1',
        user: 'rahul.dev',
        initials: 'RD',
        color: '#2563eb',
        text: 'Is this open for freshers too?',
        likes: 14,
        time: '2h',
      },
      {
        id: 'c2',
        user: 'meera.codes',
        initials: 'MC',
        color: '#db2777',
        text: 'Salary range looks good for Hyderabad.',
        likes: 22,
        time: '4h',
      },
      {
        id: 'c3',
        user: 'vikram.s',
        initials: 'VS',
        color: '#0d9488',
        text: 'Just applied via Quick Apply!',
        likes: 9,
        time: '1d',
      },
    ],
  },
  {
    id: 'reel-2',
    category: 'Company Life',
    videoUrl: '/video2.mp4',
    posterColor: '#0f172a',
    company: 'ApplyWizz',
    initials: 'AW',
    logoColor: '#4432ff',
    verified: true,
    jobTitle: 'Discover Our Workplace',
    location: 'Hyderabad',
    employmentType: 'FULL TIME',
    description: 'Get a glimpse of our workplace, team culture and employee experience.',
    likes: 2180,
    comments: 96,
    shares: 71,
    commentList: [
      {
        id: 'c1',
        user: 'priya.h',
        initials: 'PH',
        color: '#4432ff',
        text: 'Love the office vibe!',
        likes: 41,
        time: '1h',
      },
      {
        id: 'c2',
        user: 'arjun.m',
        initials: 'AM',
        color: '#0284c7',
        text: 'Would love to work here someday.',
        likes: 18,
        time: '5h',
      },
    ],
  },
  {
    id: 'reel-3',
    category: 'Interview Tips',
    videoUrl: '/video3.mp4',
    posterColor: '#312e81',
    company: 'Career Guidance',
    initials: 'CG',
    logoColor: '#16a34a',
    verified: true,
    jobTitle: 'Career Growth & Interview Tips',
    location: 'India',
    description: 'Learn useful interview tips and improve your career opportunities.',
    likes: 3560,
    comments: 184,
    shares: 220,
    commentList: [
      {
        id: 'c1',
        user: 'divya.n',
        initials: 'DN',
        color: '#db2777',
        text: 'These tips are so practical. Saving this!',
        likes: 67,
        time: '30m',
      },
      {
        id: 'c2',
        user: 'imran.a',
        initials: 'IA',
        color: '#0d9488',
        text: 'Please make one on system design next.',
        likes: 29,
        time: '3h',
      },
      {
        id: 'c3',
        user: 'lakshmi.v',
        initials: 'LV',
        color: '#ea580c',
        text: 'Helped me prep for my interview yesterday.',
        likes: 33,
        time: '8h',
      },
    ],
  },
];
