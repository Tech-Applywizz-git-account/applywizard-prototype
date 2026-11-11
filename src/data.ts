/** Sample content only. Nothing here talks to the Applywizard API. */

export const accountDeletionState = {
  requested: false,
};

export const accountState = {
  deletionRequested: false,
  deactivated: false,
};

export const savedJobIds = new Set<string>(['job-1', 'job-8', 'job-9']);

export const seeker = {
  name: 'Ananya Rao',
  handle: '@ananya.rao',
  email: 'ananya@example.com',
  phone: '98490 11223',
  city: 'Hyderabad, Telangana',
  dob: '14-08-2001',
  gender: 'Female',
  bio: 'B.Com graduate with 2 years in accounts payable. Comfortable with Tally Prime, GST filing and Excel.',
  trustScore: 78,
  education: "Master's / PG",
  resumeFile: 'Ananya-Rao-Resume.pdf',
  resumeSize: '248 KB · uploaded 12 Jun 2026',
  skills: ['Tally Prime', 'GST Filing', 'Excel Advanced', 'Accounting', 'English', 'Telugu'],
  categories: ['Finance', 'Banking'],
};

export const trustBreakdown = [
  { label: 'Phone verified', points: 10 },
  { label: 'Email verified', points: 10 },
  { label: 'Aadhaar + face match (94%)', points: 30 },
  { label: 'Class 10 marksheet', points: 10 },
  { label: 'Class 12 marksheet', points: 10 },
  { label: 'B.Tech enrollment proof', points: 8 },
];

export type JobModel = {
  id: string;
  title: string;
  company: string;
  initials: string;
  logoColor: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  salary: string;
  posted: string;
  match: number;
  applicationType: 'QUICK_APPLY' | 'APPLY_NOW';
  applyUrl?: string;
  deadline?: string;
  mode?: string;
  about?: string;
  responsibilities?: string[];
  requirements?: string[];
  /** US partner remote roles — visible to all, apply requires verification. */
  remotePartner?: boolean;
  openGlobally?: boolean;
  confidential?: boolean;
  schedule?: string;
  payDetail?: string;
  locationDetail?: string;
  jobTypeDetail?: string;
  descriptionBody?: string;
};

export const allJobs: JobModel[] = [
  {
    id: 'job-1',
    title: 'Software Engineer',
    company: 'Google',
    initials: 'GO',
    logoColor: '#4285f4',
    department: 'ENGG & TECH',
    type: 'FULL TIME',
    experience: 'FRESHER',
    location: 'HYDERABAD',
    salary: 'Salary not disclosed',
    posted: '4 hours ago',
    match: 80,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://careers.google.com',
  },
  {
    id: 'job-2',
    title: 'data engineer',
    company: 'Applywizz',
    initials: 'AP',
    logoColor: '#2563eb',
    department: 'ENGG & TECH',
    type: 'FULL TIME',
    experience: 'MID',
    location: 'HYDERABAD',
    salary: 'Salary not disclosed',
    posted: '5 days ago',
    match: 98,
    applicationType: 'QUICK_APPLY',
  },
  {
    id: 'job-3',
    title: 'Sr. Analyst - Business Data Services 4B',
    company: 'Genpact',
    initials: 'GP',
    logoColor: '#111827',
    department: 'BUSINESS ANALYST',
    type: 'FULL TIME',
    experience: 'FRESHER',
    location: 'MH',
    salary: 'Salary not disclosed',
    posted: '4 hours ago',
    match: 68,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://www.genpact.com/careers',
  },
  {
    id: 'job-4',
    title: 'Lead UX Designer',
    company: 'Gartner',
    initials: 'GT',
    logoColor: '#0284c7',
    department: 'BUSINESS INTELLIGENCE ENGINEER',
    type: 'FULL TIME',
    experience: '7+ YEARS',
    location: 'HR',
    salary: 'Salary not disclosed',
    posted: '4 hours ago',
    match: 68,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://jobs.gartner.com',
  },
  {
    id: 'job-5',
    title: 'Mobile Engineer (Android)',
    company: 'Applywizz',
    initials: 'AP',
    logoColor: '#db2777',
    department: 'ENGG & TECH',
    type: 'FULL TIME',
    experience: '3 - 6 YEARS',
    location: 'REMOTE',
    salary: '₹8 - 15 LPA',
    posted: '4 days ago',
    match: 68,
    applicationType: 'QUICK_APPLY',
  },
  {
    id: 'job-6',
    title: 'Investment Banking Senior Analyst',
    company: 'Wells Fargo',
    initials: 'WF',
    logoColor: '#dc2626',
    department: 'FINANCIAL ANALYST',
    type: 'FULL TIME',
    experience: '4+ YEARS',
    location: 'HYDERABAD',
    salary: 'Salary not disclosed',
    posted: '11 Sept',
    match: 68,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://www.wellsfargojobs.com',
  },
  {
    id: 'job-7',
    title: 'Junior Accountant',
    company: 'BrightPath Finance',
    initials: 'BF',
    logoColor: '#0d9488',
    department: 'FINANCE',
    type: 'Full-time',
    experience: '0-1 yrs',
    location: 'Hyderabad, Telangana',
    salary: '₹3.6–4.8 LPA',
    posted: '2 days ago',
    match: 92,
    applicationType: 'QUICK_APPLY',
    deadline: '30-10-2026',
    mode: 'On-site',
    about:
      'BrightPath Finance handles bookkeeping and compliance for 120+ small businesses across Telangana. You will own day-to-day ledgers for a set of clients.',
    responsibilities: [
      'Record purchase and sales entries in Tally Prime',
      'Prepare monthly GST working and file GSTR-1 and GSTR-3B',
      'Reconcile bank statements and vendor ledgers',
      'Support the senior accountant during quarterly closing',
    ],
    requirements: [
      'B.Com or M.Com',
      'Tally Prime and Excel',
      'Basic understanding of GST and TDS',
      'Willing to work from the Madhapur office',
    ],
  },
  {
    id: 'job-8',
    title: 'Accounts Executive',
    company: 'Sruthi Traders',
    initials: 'ST',
    logoColor: '#ea580c',
    department: 'FINANCE',
    type: 'Full-time',
    experience: '1-3 yrs',
    location: 'Secunderabad, Telangana',
    salary: '₹22,000/mo',
    posted: '5 days ago',
    match: 81,
    applicationType: 'QUICK_APPLY',
  },
  {
    id: 'job-9',
    title: 'SAP FICO Associate',
    company: 'Novatek Systems',
    initials: 'NS',
    logoColor: '#7c3aed',
    department: 'SAP / CLOUD',
    type: 'Full-time',
    experience: '1-3 yrs',
    location: 'Bengaluru, Karnataka',
    salary: '₹6–9 LPA',
    posted: '1 week ago',
    match: 74,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://www.novateksystems.com/careers',
  },
  {
    id: 'job-us-1',
    title: 'Rust Architect / Backend Developer',
    company: 'Confidential company',
    initials: 'CC',
    logoColor: '#db2777',
    department: 'ENGG & TECH',
    type: 'FULL-TIME',
    experience: 'FRESHER',
    location: 'GLOBAL',
    salary: 'Salary not disclosed',
    posted: '24 Oct',
    match: 20,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://careers.example-us-partner.com/rust-architect',
    mode: 'Remote',
    remotePartner: true,
    openGlobally: true,
    confidential: true,
    payDetail: '$50–$70/hour',
    locationDetail: 'Global, fully remote',
    jobTypeDetail: 'Contractor (~15 hours per week)',
    schedule:
      'Flexible—you can choose the hours and days you work, including weekends if desired (As long as you\'re active)',
    about: 'Rust Architect / Backend Developer',
    descriptionBody:
      'We are looking for a highly skilled Rust Architect / Backend Developer to contribute to an AI-training project involving production Rust, backend architecture, asynchronous and concurrent systems, service design, infrastructure, and technical debugging. The role requires strong programming ability and the judgment to evaluate whether systems are correct, reliable, maintainable, and production-ready.',
    requirements: [
      'Strong production Rust experience',
      'Backend architecture and service design',
      'Async / concurrent systems expertise',
      'Comfortable debugging complex distributed systems',
    ],
  },
  {
    id: 'job-us-2',
    title: 'Senior Frontend Engineer',
    company: 'Confidential company',
    initials: 'CC',
    logoColor: '#7c3aed',
    department: 'ENGG & TECH',
    type: 'FULL-TIME',
    experience: '3-5 yrs',
    location: 'GLOBAL',
    salary: 'Salary not disclosed',
    posted: '18 Oct',
    match: 34,
    applicationType: 'APPLY_NOW',
    applyUrl: 'https://careers.example-us-partner.com/frontend',
    mode: 'Remote',
    remotePartner: true,
    openGlobally: true,
    confidential: true,
    payDetail: '$45–$65/hour',
    locationDetail: 'Global, fully remote',
    jobTypeDetail: 'Contractor (~20 hours per week)',
    schedule: 'Flexible schedule across US time zones',
    about: 'Senior Frontend Engineer',
    descriptionBody:
      'Join a US-based product team building high-performance web interfaces. You will own React architecture, design systems, and accessibility for customer-facing products used worldwide.',
    requirements: [
      'Strong React and TypeScript',
      'Design system experience',
      'Remote collaboration across time zones',
    ],
  },
];

export const job = allJobs[6];
export const secondJob = allJobs[7];
export const thirdJob = allJobs[8];

export const employer = {
  name: 'Priya Sharma',
  email: 'priya@brightpath.in',
  designation: 'HR Manager',
  company: 'BrightPath Finance Pvt Ltd',
  cin: 'U72900TS2019PTC012345',
  gstin: '36AAFCA1234K1ZP',
  pan: 'AAFCA1234K',
  website: 'brightpathfinance.in',
  city: 'Hyderabad',
  size: '51–200 employees',
  industry: 'Accounting & Compliance',
  about:
    'BrightPath Finance keeps books clean for growing businesses. We hire for accounts, audit and compliance roles across Telangana.',
};

export const applicant = {
  name: 'Ananya Rao',
  initials: 'AR',
  email: 'ananya@example.com',
  phone: '98490 11223',
  role: 'Junior Accountant',
  match: 92,
  stage: 'Shortlisted',
  applied: 'Applied 2 days ago',
  city: 'Hyderabad',
  experience: '2 yrs',
  notice: 'Immediate',
  expected: '₹4.2 LPA',
};

export const pipelineStages = [
  'Applied',
  'Under review',
  'Shortlisted',
  'Phone screen',
  'Assessment',
  'Interview',
  'Offer Sent',
  'Hired',
  'Rejected',
];

export const funnelCounts = [42, 18, 9, 6, 4, 3, 2, 1, 5];

export const funnelColors = [
  '#3b82f6',
  '#14b8a6',
  '#8b5cf6',
  '#f59e0b',
  '#f97316',
  '#06b6d4',
  '#10b981',
  '#22c55e',
  '#ef4444',
];

export const candidates = [
  { name: 'Ananya Rao', initials: 'AR', color: '#4432ff', role: 'Junior Accountant', match: 92, stage: 'Shortlisted' },
  { name: 'Rahul Verma', initials: 'RV', color: '#8b5cf6', role: 'Junior Accountant', match: 84, stage: 'Interview' },
  { name: 'Sneha Iyer', initials: 'SI', color: '#10b981', role: 'Accounts Executive', match: 78, stage: 'Under review' },
  { name: 'Imran Khan', initials: 'IK', color: '#f59e0b', role: 'Accounts Executive', match: 71, stage: 'Applied' },
  { name: 'Priya Nair', initials: 'PN', color: '#0284c7', role: 'Junior Accountant', match: 88, stage: 'Phone screen' },
  { name: 'Karthik Menon', initials: 'KM', color: '#db2777', role: 'Accounts Executive', match: 76, stage: 'Assessment' },
  { name: 'Meera Joshi', initials: 'MJ', color: '#0d9488', role: 'Junior Accountant', match: 90, stage: 'Offer Sent' },
  { name: 'Vikram Shah', initials: 'VS', color: '#16a34a', role: 'Accounts Executive', match: 86, stage: 'Hired' },
  { name: 'Divya Reddy', initials: 'DR', color: '#dc2626', role: 'Junior Accountant', match: 62, stage: 'Rejected' },
  { name: 'Arjun Patel', initials: 'AP', color: '#ea580c', role: 'Accounts Executive', match: 74, stage: 'Pending review' },
  { name: 'Neha Kapoor', initials: 'NK', color: '#6366f1', role: 'Junior Accountant', match: 81, stage: 'Applied' },
  { name: 'Rohan Das', initials: 'RD', color: '#0891b2', role: 'Accounts Executive', match: 69, stage: 'Applied' },
  { name: 'Aisha Begum', initials: 'AB', color: '#7c3aed', role: 'Junior Accountant', match: 83, stage: 'Under review' },
  { name: 'Sanjay Pillai', initials: 'SP', color: '#059669', role: 'Accounts Executive', match: 77, stage: 'Under review' },
  { name: 'Lakshmi Devi', initials: 'LD', color: '#4f46e5', role: 'Junior Accountant', match: 91, stage: 'Shortlisted' },
  { name: 'Farhan Ali', initials: 'FA', color: '#c026d3', role: 'Accounts Executive', match: 79, stage: 'Shortlisted' },
  { name: 'Pooja Kulkarni', initials: 'PK', color: '#2563eb', role: 'Junior Accountant', match: 85, stage: 'Phone screen' },
  { name: 'Nikhil Rao', initials: 'NR', color: '#ca8a04', role: 'Accounts Executive', match: 72, stage: 'Assessment' },
  { name: 'Shreya Banerjee', initials: 'SB', color: '#0ea5e9', role: 'Junior Accountant', match: 87, stage: 'Interview' },
  { name: 'Aditya Malhotra', initials: 'AM', color: '#14b8a6', role: 'Accounts Executive', match: 80, stage: 'Interview' },
  { name: 'Kavya Krishnan', initials: 'KK', color: '#a855f7', role: 'Junior Accountant', match: 89, stage: 'Offer Sent' },
  { name: 'Harshita Goud', initials: 'HG', color: '#ef4444', role: 'Accounts Executive', match: 58, stage: 'Rejected' },
  { name: 'Mohit Agarwal', initials: 'MA', color: '#f97316', role: 'Junior Accountant', match: 70, stage: 'Pending review' },
  { name: 'Tanvi Desai', initials: 'TD', color: '#22c55e', role: 'Accounts Executive', match: 82, stage: 'Pending review' },
  { name: 'Yash Thakur', initials: 'YT', color: '#3b82f6', role: 'Junior Accountant', match: 75, stage: 'Applied' },
  { name: 'Ishita Bose', initials: 'IB', color: '#ec4899', role: 'Accounts Executive', match: 73, stage: 'Applied' },
  { name: 'Gaurav Singh', initials: 'GS', color: '#64748b', role: 'Junior Accountant', match: 68, stage: 'Under review' },
  { name: 'Ritu Sharma', initials: 'RS', color: '#8b5cf6', role: 'Accounts Executive', match: 84, stage: 'Shortlisted' },
  { name: 'Abhinav Gupta', initials: 'AG', color: '#06b6d4', role: 'Junior Accountant', match: 78, stage: 'Phone screen' },
  { name: 'Sana Qureshi', initials: 'SQ', color: '#10b981', role: 'Accounts Executive', match: 81, stage: 'Assessment' },
  { name: 'Deepak Nair', initials: 'DN', color: '#6366f1', role: 'Junior Accountant', match: 86, stage: 'Interview' },
  { name: 'Anjali Menon', initials: 'AM', color: '#d97706', role: 'Accounts Executive', match: 77, stage: 'Pending review' },
  { name: 'Varun Chopra', initials: 'VC', color: '#0d9488', role: 'Junior Accountant', match: 66, stage: 'Rejected' },
  { name: 'Nisha Varghese', initials: 'NV', color: '#7c3aed', role: 'Accounts Executive', match: 88, stage: 'Hired' },
  { name: 'Kiran Babu', initials: 'KB', color: '#2563eb', role: 'Junior Accountant', match: 74, stage: 'Applied' },
  { name: 'Swathi Reddy', initials: 'SR', color: '#db2777', role: 'Accounts Executive', match: 79, stage: 'Under review' },
  { name: 'Manish Tiwari', initials: 'MT', color: '#16a34a', role: 'Junior Accountant', match: 83, stage: 'Shortlisted' },
  { name: 'Bhavna Sethi', initials: 'BS', color: '#0284c7', role: 'Accounts Executive', match: 76, stage: 'Phone screen' },
  { name: 'Pranav Iyer', initials: 'PI', color: '#ea580c', role: 'Junior Accountant', match: 80, stage: 'Assessment' },
  { name: 'Rekha Sinha', initials: 'RS', color: '#4f46e5', role: 'Accounts Executive', match: 85, stage: 'Interview' },
  { name: 'Aman Gill', initials: 'AG', color: '#059669', role: 'Junior Accountant', match: 91, stage: 'Offer Sent' },
  { name: 'Chitra Rao', initials: 'CR', color: '#c026d3', role: 'Accounts Executive', match: 72, stage: 'Pending review' },
  { name: 'Siddharth Jain', initials: 'SJ', color: '#f59e0b', role: 'Junior Accountant', match: 67, stage: 'Rejected' },
  { name: 'Pallavi Nair', initials: 'PN', color: '#0ea5e9', role: 'Accounts Executive', match: 81, stage: 'Applied' },
  { name: 'Harish Kumar', initials: 'HK', color: '#8b5cf6', role: 'Junior Accountant', match: 78, stage: 'Under review' },
  { name: 'Jyoti Pandey', initials: 'JP', color: '#14b8a6', role: 'Accounts Executive', match: 87, stage: 'Shortlisted' },
  { name: 'Omkar Patil', initials: 'OP', color: '#2563eb', role: 'Junior Accountant', match: 75, stage: 'Phone screen' },
  { name: 'Zara Sheikh', initials: 'ZS', color: '#a855f7', role: 'Accounts Executive', match: 82, stage: 'Assessment' },
  { name: 'Ravi Teja', initials: 'RT', color: '#22c55e', role: 'Junior Accountant', match: 84, stage: 'Interview' },
  { name: 'Megha Chauhan', initials: 'MC', color: '#ef4444', role: 'Accounts Executive', match: 70, stage: 'Pending review' },
];

export const interviews = [
  { time: '9:00 AM', name: 'Ananya Rao', initials: 'AR', color: '#4432ff', role: 'Junior Accountant · Round 1', status: 'Confirmed' },
  { time: '11:00 AM', name: 'Rahul Verma', initials: 'RV', color: '#8b5cf6', role: 'Junior Accountant · Round 2', status: 'Pending' },
  { time: '2:00 PM', name: 'Sneha Iyer', initials: 'SI', color: '#10b981', role: 'Accounts Executive · Round 1', status: 'Declined' },
];

export const FILTER_CITIES = [
  'Hyderabad',
  'Warangal',
  'Karimnagar',
  'Nizamabad',
  'Khammam',
  'Mahbubnagar',
  'Nalgonda',
  'Adilabad',
  'Suryapet',
  'Siddipet',
  'Remote',
  'Global',
];

export const FILTER_WORK_MODES = ['Remote', 'Hybrid', 'On-site'];

export const FILTER_CATEGORIES = [
  'Finance',
  'SAP / Cloud',
  'Gov Exams',
  'Sales',
  'Marketing',
  'Engg & Tech',
  'Healthcare',
  'Education',
  'Legal',
  'Banking',
];

export const FILTER_EXPERIENCE = ['Fresher', '0-1 yrs', '1-3 yrs', '3-5 yrs', '5-7 yrs', '7-10 yrs', '10+ yrs'];

export const FILTER_EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];

export const FILTER_APPLICATION_TYPES = ['All', 'Quick Apply', 'Apply Now'];

export const FILTER_DATE_POSTED = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'last7', label: 'Last 7 days' },
  { id: 'thisMonth', label: 'This month' },
  { id: 'custom', label: 'Custom date' },
];

export const filterCategories = FILTER_CATEGORIES;

export const verificationSteps = [
  { key: 'basic', title: 'Basic Details', subtitle: 'Name, city, DOB' },
  { key: 'education', title: 'Education', subtitle: 'Highest qualification' },
  { key: 'resume', title: 'Resume', subtitle: 'Upload or build in 1 min' },
  { key: 'skills', title: 'Skills Profile', subtitle: 'At least 3 skills for +5 trust score' },
  { key: 'documents', title: 'Documents (Optional)', subtitle: 'ID & marksheets' },
  { key: 'review', title: 'Final Review', subtitle: 'Submit and get trust score' },
];

export const educationLevels = [
  { id: 'class_10', title: 'Class 10 (SSC / Matric)', subtitle: '10 years of schooling' },
  { id: 'class_12', title: 'Class 12 (Intermediate / HSC / PUC)', subtitle: '+2 — Science / Commerce / Arts' },
  { id: 'iti', title: 'ITI (Trade certificate)', subtitle: 'NCVT / SCVT • Electrician, Fitter, COPA...' },
  { id: 'diploma', title: 'Diploma / Polytechnic', subtitle: '3 yrs after 10th • Civil, Mech, EEE, CSE...' },
  { id: 'bachelors', title: "Bachelor's degree", subtitle: 'B.A / B.Sc / B.Com / B.Tech / B.E / LLB / MBBS' },
  { id: 'masters', title: "Master's / PG", subtitle: 'M.A / M.Sc / M.Com / M.Tech / MBA / LLM' },
];

export const suggestedSkills = [
  'Telugu',
  'English',
  'Hindi',
  'MS Office',
  'Data Entry',
  'Customer Service',
  'Communication',
  'Typing',
  'Tally Prime',
  'Excel Advanced',
  'GST Filing',
  'Accounting',
];
