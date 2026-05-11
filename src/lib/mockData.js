/**
 * mockData.js
 * Single source of truth for all mock data used across the app.
 * When Supabase tables are ready, replace these with real API calls.
 */

// ─────────────────────────────────────────────
// Workers
// ─────────────────────────────────────────────
export const mockWorkers = [
  {
    id: 'w1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@dev.in',
    role: 'Senior Frontend Engineer',
    location: 'Bangalore, India',
    status: 'active',
    kyc: 'verified',
    contract: 'signed',
    initials: 'AS',
    joinDate: '12 Feb 2026',
    rate: '£2,450/mo',
    monthlyRateGBP: 2450,
    onboarding: 4,
  },
  {
    id: 'w2',
    name: 'Priya Nair',
    email: 'priya.nair@logic.in',
    role: 'Backend Engineer',
    location: 'Mumbai, India',
    status: 'onboarding',
    kyc: 'pending',
    contract: 'pending',
    initials: 'PN',
    joinDate: '01 May 2026',
    rate: '£2,100/mo',
    monthlyRateGBP: 2100,
    onboarding: 2,
  },
  {
    id: 'w3',
    name: 'Rahul Verma',
    email: 'rahul.v@tech.in',
    role: 'DevOps Engineer',
    location: 'Hyderabad, India',
    status: 'invited',
    kyc: 'none',
    contract: 'none',
    initials: 'RV',
    joinDate: 'Pending',
    rate: '£1,900/mo',
    monthlyRateGBP: 1900,
    onboarding: 0,
  },
  {
    id: 'w4',
    name: 'Prosoon Mandal',
    email: 'prosoon.m@logicwave.co.uk',
    role: 'Blog Writer',
    location: 'Delhi, India',
    status: 'active',
    kyc: 'verified',
    contract: 'signed',
    initials: 'PM',
    joinDate: '09 May 2026',
    rate: '£120/mo',
    monthlyRateGBP: 120,
    onboarding: 4,
  },
];

// ─────────────────────────────────────────────
// Blog Posts
// ─────────────────────────────────────────────
export const mockBlogs = [
  {
    id: 'b1',
    title: 'How to Hire Remote Talent in India: A Complete Guide',
    slug: 'hire-remote-talent-india-guide',
    status: 'Published',
    views: '1,240',
    ctr: '3.2%',
    lastModified: '12 May 2026',
    author: 'Prosoon Mandal',
    seoScore: 92,
  },
  {
    id: 'b2',
    title: 'UK vs India Payroll: Key Differences You Need to Know',
    slug: 'uk-india-payroll-differences',
    status: 'Draft',
    views: '0',
    ctr: '0%',
    lastModified: '08 May 2026',
    author: 'Prosoon Mandal',
    seoScore: 78,
  },
  {
    id: 'b3',
    title: 'The Future of Global HR in 2026',
    slug: 'future-global-hr-2026',
    status: 'Published',
    views: '850',
    ctr: '2.8%',
    lastModified: '01 May 2026',
    author: 'Prosoon Mandal',
    seoScore: 85,
  },
];

// ─────────────────────────────────────────────
// Payroll / Earnings Records
// ─────────────────────────────────────────────
export const mockPayrolls = [
  { id: 'p1', workerId: 'w1', workerName: 'Arjun Sharma', month: 'April 2026', amountGBP: 2450, status: 'paid', paidOn: '30 Apr 2026' },
  { id: 'p2', workerId: 'w2', workerName: 'Priya Nair',   month: 'April 2026', amountGBP: 2100, status: 'paid', paidOn: '30 Apr 2026' },
  { id: 'p3', workerId: 'w3', workerName: 'Rahul Verma',  month: 'April 2026', amountGBP: 0,    status: 'pending', paidOn: null },
  { id: 'p4', workerId: 'w4', workerName: 'Prosoon Mandal', month: 'May 2026', amountGBP: 120,  status: 'pending', paidOn: null },
];

// ─────────────────────────────────────────────
// Contracts
// ─────────────────────────────────────────────
export const mockContracts = [
  { id: 'c1', workerId: 'w1', workerName: 'Arjun Sharma',   title: 'Frontend Engineering Agreement', status: 'active',  signedOn: '12 Feb 2026' },
  { id: 'c2', workerId: 'w2', workerName: 'Priya Nair',     title: 'Backend Engineering Agreement',  status: 'pending', signedOn: null },
  { id: 'c3', workerId: 'w4', workerName: 'Prosoon Mandal', title: 'Content & Blog Writing Agreement', status: 'active', signedOn: '09 May 2026' },
];
