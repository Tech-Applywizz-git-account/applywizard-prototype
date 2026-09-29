/** Sample content only. Nothing here talks to the Applywizard API. */

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

export const job = {
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
};

export const secondJob = {
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
};

export const thirdJob = {
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
};

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
  'Offer sent',
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
];

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
