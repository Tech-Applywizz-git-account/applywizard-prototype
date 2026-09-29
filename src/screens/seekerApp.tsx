import { useState, useEffect } from 'react';
import {
  Award,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  CircleUser,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  IndianRupee,
  LifeBuoy,
  MapPin,
  PauseCircle,
  Phone,
  Copy,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import {
  AppBar,
  Avatar,
  Body,
  Chips,
  Field,
  FootBar,
  JobCard,
  MenuRow,
  Primary,
  PlainBar,
  SearchBox,
  SettingRow,
  TextLink,
  SeekerTabs,
  Toggle,
  type CardJob,
} from '../kit';
import { accountDeletionState, accountState, allJobs, filterCategories, job, savedJobIds, seeker } from '../data';
import { useNav } from '../nav';
import { useLanguage, changeLanguage, type LanguageCode } from '../language';
import { useTheme, changeTheme } from '../theme';
import {
  hasAppliedToJob,
  setSelectedJobId,
  useApplications,
  useSelectedJob,
} from '../applyState';
import { QuickApply as QuickApplyFlow } from './quickApplyFlow';

export { QuickApplyFlow as QuickApply };

/** app/jobseeker/(tabs)/index.tsx — guest mode: Jobs only. */
export function GuestJobs() {
  const nav = useNav();
  const [query, setQuery] = useState('');
  const filtered = allJobs.filter((j) => {
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const match =
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <>
      <AppBar title="All jobs" guest filter />
      <SearchBox placeholder="Search by job title, company, or location" value={query} onChange={setQuery} />
      <div className="scroll">
        <PromoCarousel
          onSaved={() => nav.push('js-login')}
          onRecent={() => nav.open('filters')}
        />
        <div className="pad" style={{ paddingTop: 0 }}>
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} to="js-job" guest />
          ))}
        </div>
      </div>
      <SeekerTabs active="js-jobs" locked />
    </>
  );
}

function PromoCarousel({ onSaved, onRecent }: { onSaved: () => void; onRecent: () => void }) {
  const slides = [
    { src: '/job-banner-explore-all-jobs.png', alt: 'Explore all jobs', onClick: () => undefined },
    { src: '/job-banner-quick-apply.png', alt: 'Quick Apply', onClick: () => undefined },
    { src: '/job-banner-past-24-hours.png', alt: 'Past 24 hours', onClick: onRecent },
    { src: '/job-banner-saved-jobs.png', alt: 'Saved jobs', onClick: onSaved },
  ];
  return (
    <div className="promo">
      {slides.map((slide) => (
        <button key={slide.src} type="button" className="promo-slide" onClick={slide.onClick}>
          <img src={slide.src} alt={slide.alt} />
        </button>
      ))}
    </div>
  );
}

const savedJobListeners = new Set<() => void>();

export function useSavedJobIds() {
  const [ids, setIds] = useState<Set<string>>(() => new Set(savedJobIds));
  useEffect(() => {
    const listener = () => setIds(new Set(savedJobIds));
    savedJobListeners.add(listener);
    return () => {
      savedJobListeners.delete(listener);
    };
  }, []);
  return ids;
}

export function toggleSavedJob(jobId: string) {
  if (savedJobIds.has(jobId)) {
    savedJobIds.delete(jobId);
  } else {
    savedJobIds.add(jobId);
  }
  savedJobListeners.forEach((fn) => fn());
}

export function openCareersPortal(jobItem: CardJob) {
  const companySlug = jobItem.company.toLowerCase().replace(/[^a-z0-9]/g, '');
  const url = jobItem.applyUrl || `https://www.${companySlug}.com/careers`;
  window.open(url, '_blank');
}

/** app/jobseeker/(tabs)/index.tsx */
export function Jobs() {
  const nav = useNav();
  const [query, setQuery] = useState('');
  const savedIds = useSavedJobIds();

  const filtered = allJobs.filter((j) => {
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const match =
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <>
      <AppBar title="All jobs" menu bell filter onBell="js-notifications" />
      <SearchBox placeholder="Search by job title, company, or location" value={query} onChange={setQuery} />
      <div className="scroll">
        <PromoCarousel
          onSaved={() => nav.reset('js-saved')}
          onRecent={() => nav.open('filters')}
        />
        <div className="pad" style={{ paddingTop: 0 }}>
          {filtered.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              saved={savedIds.has(j.id)}
              applied={hasAppliedToJob(j.id)}
              onToggleSave={() => toggleSavedJob(j.id)}
              onOpen={(jobItem) => {
                setSelectedJobId(jobItem.id!);
                nav.push('js-job');
              }}
              onApply={(jobItem) => {
                setSelectedJobId(jobItem.id!);
                if (jobItem.applicationType === 'APPLY_NOW') {
                  openCareersPortal(jobItem);
                } else {
                  nav.push('js-apply');
                }
              }}
            />
          ))}
        </div>
      </div>
      <SeekerTabs active="js-jobs" />
    </>
  );
}

/** app/jobseeker/job/[id].tsx */
export function JobDetails() {
  const nav = useNav();
  const savedIds = useSavedJobIds();
  const currentJob = useSelectedJob();
  const isSaved = savedIds.has(currentJob.id);
  const isApplyNow = currentJob.applicationType === 'APPLY_NOW';
  const alreadyApplied = hasAppliedToJob(currentJob.id);

  return (
    <>
      <AppBar
        title="Job details"
        back
        right={
          <button className="iconbtn" onClick={() => toggleSavedJob(currentJob.id)}>
            <Bookmark size={20} fill={isSaved ? '#4432ff' : 'none'} color={isSaved ? '#4432ff' : 'currentColor'} />
          </button>
        }
      />
      <div className="scroll pad">
        <div className="card">
          <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <span className="jobcard-logo logo" style={{ width: 52, height: 52, borderRadius: 14, background: currentJob.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              {currentJob.initials}
            </span>
            <div style={{ flex: 1 }}>
              <h2 className="h2" style={{ fontSize: 19, lineHeight: '24px' }}>{currentJob.title}</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 14, fontWeight: 500 }}>{currentJob.company}</p>
            </div>
          </div>
          <div className="chips" style={{ marginTop: 14 }}>
            <span className="match">
              <Sparkles size={12} /> {currentJob.match}% MATCH
            </span>
            <span className="tag dept">{currentJob.department}</span>
            <span className="tag">{currentJob.type}</span>
            <span className="tag">{currentJob.experience}</span>
          </div>
          <div className="kv" style={{ marginTop: 14, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <span>
              <IndianRupee size={13} style={{ verticalAlign: -2 }} /> Salary
            </span>
            <b>{currentJob.salary}</b>
          </div>
          <div className="kv">
            <span>
              <MapPin size={13} style={{ verticalAlign: -2 }} /> Location
            </span>
            <b>{currentJob.location}</b>
          </div>
          <div className="kv">
            <span>
              <Building2 size={13} style={{ verticalAlign: -2 }} /> Work mode
            </span>
            <b>{currentJob.mode || 'On-site'}</b>
          </div>
          <div className="kv">
            <span>
              <CalendarClock size={13} style={{ verticalAlign: -2 }} /> Apply before
            </span>
            <b>{currentJob.deadline || '30-10-2026'}</b>
          </div>
        </div>

        <div className="banner green">
          <span className="title">
            <ShieldCheck size={18} color="#16a34a" /> Verified employer
          </span>
          <p>{currentJob.company} verified their company PAN and CIN with Applywizard.</p>
        </div>

        <p className="label-xs">About the role</p>
        <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 14, lineHeight: '23px' }}>
          {currentJob.about || 'Join our dynamic team to scale core services and solve impact problems.'}
        </p>

        {currentJob.responsibilities && (
          <>
            <p className="label-xs">What you will do</p>
            <ul className="bullets">
              {currentJob.responsibilities.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </>
        )}

        {currentJob.requirements && (
          <>
            <p className="label-xs">Requirements</p>
            <ul className="bullets">
              {currentJob.requirements.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </>
        )}

        <p className="label-xs">Posted by</p>
        <div className="card row" style={{ gap: 12 }}>
          <Avatar initials="PS" color="#4432ff" size={42} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: 15 }}>Priya Sharma</strong>
            <p className="muted" style={{ margin: 0 }}>HR Manager · replies in about 2 days</p>
          </div>
        </div>
      </div>
      <FootBar>
        <div className="row" style={{ gap: 10 }}>
          <button
            className="save"
            onClick={() => toggleSavedJob(currentJob.id)}
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              border: `1px solid ${isSaved ? '#4432ff' : 'var(--border)'}`,
              background: isSaved ? 'var(--primary-light)' : 'var(--card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isSaved ? '#4432ff' : 'var(--muted)',
              cursor: 'pointer',
            }}
          >
            <Bookmark size={20} fill={isSaved ? '#4432ff' : 'none'} />
          </button>
          <button
            className="btn"
            style={{ flex: 1 }}
            disabled={alreadyApplied && !isApplyNow}
            onClick={() => {
              if (isApplyNow) {
                openCareersPortal(currentJob);
              } else if (alreadyApplied) {
                nav.reset('js-applied');
              } else {
                nav.push('js-apply');
              }
            }}
          >
            <Sparkles size={18} />{' '}
            {isApplyNow ? 'Apply Now' : alreadyApplied ? 'View application' : 'Quick Apply'}
          </button>
        </div>
      </FootBar>
    </>
  );
}

/** features/jobseeker/components/ApplyNowModal.tsx */
export function ApplyNow() {
  const nav = useNav();
  const applyJob = useSelectedJob();

  const handleExternalRedirect = () => {
    openCareersPortal(applyJob);
    nav.reset('js-applied');
  };

  return (
    <>
      <PlainBar title="Apply Now" />
      <Body>
        <div className="card">
          <div className="row between">
            <strong style={{ fontSize: 15 }}>{applyJob.title}</strong>
            <span className="match">
              <Sparkles size={12} /> {applyJob.match}% MATCH
            </span>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>{applyJob.company} · {applyJob.location}</p>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 14, padding: 14, marginTop: 14 }}>
          <span style={{ color: '#1d4ed8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
            <Globe size={18} color="#1d4ed8" /> External Employer Application
          </span>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#1e40af', lineHeight: '18px' }}>
            Clicking below will direct you to {applyJob.company}&apos;s official application portal.
          </p>
        </div>

        <p className="label-xs">Applying with your profile</p>
        <div className="filerow">
          <span className="ibox">
            <FileText size={20} />
          </span>
          <span style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: 15 }}>{seeker.resumeFile}</strong>
            <span className="muted">{seeker.resumeSize}</span>
          </span>
          <ChevronRight size={20} color="var(--muted)" />
        </div>

        <div className="banner green" style={{ marginTop: 14 }}>
          <span className="title">
            <ShieldCheck size={18} color="#16a34a" /> Trust score {seeker.trustScore} attached
          </span>
          <p>Your verified credentials and trust score will be attached to your external application.</p>
        </div>
      </Body>
      <FootBar>
        <button
          type="button"
          className="btn"
          style={{ width: '100%' }}
          onClick={handleExternalRedirect}
        >
          Redirect to {applyJob.company} Careers Portal
        </button>
      </FootBar>
    </>
  );
}

/** app/jobseeker/(tabs)/applied.tsx */
export function Applied() {
  const nav = useNav();
  const [filter, setFilter] = useState<'All' | 'Applied' | 'Shortlisted' | 'Hired' | 'Rejected'>('All');
  const stages = ['Applied', 'Under review', 'Shortlisted', 'Interview', 'Offer'];
  const apps = useApplications();

  const pillFor = (status: string) => {
    if (status === 'Shortlisted') return { background: '#ede9fe', color: '#7c3aed' };
    if (status === 'Applied' || status === 'Under review') return { background: '#fef3c7', color: '#d97706' };
    if (status === 'Rejected') return { background: '#fee2e2', color: '#dc2626' };
    if (status === 'Offer' || status === 'Hired') return { background: '#dcfce7', color: '#16a34a' };
    return { background: '#e5e7eb', color: '#374151' };
  };

  const statusKeys = ['Applied', 'Shortlisted', 'Hired', 'Rejected'] as const;
  const countOf = (s: string) =>
    apps.filter((c) => (s === 'Hired' ? c.status === 'Offer' || c.status === 'Hired' : c.status === s)).length;
  const chipItems = [
    `All (${apps.length})`,
    ...statusKeys.map((s) => `${s} (${countOf(s)})`),
  ];
  const labelToFilter = (label: string) =>
    label.startsWith('All') ? 'All' : (statusKeys.find((s) => label.startsWith(s)) ?? 'All');

  const visible =
    filter === 'All'
      ? apps
      : filter === 'Hired'
        ? apps.filter((c) => c.status === 'Offer' || c.status === 'Hired')
        : apps.filter((c) => c.status === filter);

  return (
    <>
      <AppBar title="Applied" menu bell filter={false} onBell="js-notifications" />
      <div className="scroll pad">
        <Chips
          items={chipItems}
          selected={[chipItems.find((i) => labelToFilter(i) === filter) ?? chipItems[0]]}
          onSelect={(item) => setFilter(labelToFilter(item) as any)}
          scroll
        />
        <div style={{ height: 14 }} />

        {visible.map((app) => (
          <div key={app.id} className="card" style={{ marginBottom: 14 }}>
            <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: app.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flex: 'none' }}>
                {app.initials}
              </span>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 15 }}>{app.title}</strong>
                <p className="muted" style={{ margin: '2px 0 0' }}>{app.company} · {app.daysAgo}</p>
              </div>
              <span className="pill" style={pillFor(app.status)}>{app.status}</span>
            </div>
            <div className="stage-track" style={{ marginTop: 14 }}>
              {stages.map((stage, index) => (
                <div key={stage} className={index <= app.stageIndex ? 'on' : ''}>
                  {stage}
                </div>
              ))}
            </div>
            <button
              className="btn outline sm"
              style={{ marginTop: 14 }}
              onClick={() => {
                setSelectedJobId(app.jobId);
                nav.push('js-job');
              }}
            >
              View job
            </button>
          </div>
        ))}

        {visible.length === 0 && (
          <p className="muted" style={{ textAlign: 'center', marginTop: 40 }}>No applications in this status yet.</p>
        )}

      </div>
      <SeekerTabs active="js-applied" />
    </>
  );
}

/** app/jobseeker/(tabs)/saved.tsx */
export function Saved() {
  const nav = useNav();
  const savedIds = useSavedJobIds();
  const savedJobsList = allJobs.filter((j) => savedIds.has(j.id));

  return (
    <>
      <AppBar title="Saved" menu bell filter onBell="js-notifications" />
      <div className="scroll pad">
        <p className="label-xs">{savedJobsList.length} saved jobs</p>
        {savedJobsList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 16px' }}>
            <Bookmark size={48} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>No saved jobs yet</h3>
            <p style={{ fontSize: 14, color: 'var(--muted-2)', margin: 0 }}>
              Explore jobs and tap the bookmark icon on any job card to save it for later.
            </p>
          </div>
        ) : (
          savedJobsList.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              saved={true}
              applied={hasAppliedToJob(j.id)}
              onToggleSave={() => toggleSavedJob(j.id)}
              onOpen={(jobItem) => {
                setSelectedJobId(jobItem.id!);
                nav.push('js-job');
              }}
              onApply={(jobItem) => {
                setSelectedJobId(jobItem.id!);
                if (jobItem.applicationType === 'APPLY_NOW') {
                  openCareersPortal(jobItem);
                } else {
                  nav.push('js-apply');
                }
              }}
            />
          ))
        )}
      </div>
      <SeekerTabs active="js-saved" />
    </>
  );
}

/** app/jobseeker/(tabs)/profile/index.tsx */
export function Profile() {
  const nav = useNav();
  return (
    <>
      <div className="scroll" style={{ padding: '8px 20px 24px' }}>
        <div className="profile-top">
          <span>{seeker.handle}</span>
          <button className="iconbtn" onClick={() => nav.push('js-settings')} aria-label="Settings">
            <Settings size={22} />
          </button>
        </div>

        <div className="profile-row">
          <div className="avcol">
            <Avatar initials="AR" color="#4432ff" size={72} />
            <span className="photo-hint">Change photo</span>
          </div>
          <div className="info">
            <div className="namerow">
              <strong>{seeker.name}</strong>
              <span className="pill" style={{ background: 'rgba(22,163,74,0.18)', color: '#4ade80' }}>Verified</span>
            </div>
            <p className="trustline">Trust score: {seeker.trustScore} / 70+ for verified badge</p>
            <p className="bio">{seeker.bio}</p>
            <div className="row" style={{ gap: 4, marginTop: 8 }}>
              <MapPin size={14} color="var(--muted)" />
              <span style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 600 }}>{seeker.city}</span>
            </div>
          </div>
        </div>

        <div className="two" style={{ marginTop: 20 }}>
          <button className="btn outline" onClick={() => nav.push('js-edit')}>
            Edit profile
          </button>
          <button className="btn outline" onClick={() => nav.push('js-profile-resume')}>
            My resume
          </button>
        </div>

        <button className="banner green" onClick={() => nav.push('js-trust-score')}>
          <span className="title">
            <ShieldCheck size={18} color="#16a34a" /> Verified candidate
          </span>
          <p>Your verified badge is active. Employers can see your trust score of {seeker.trustScore}.</p>
          <span className="wm">
            <ShieldCheck size={72} />
          </span>
        </button>

        <div className="rows plain" style={{ marginTop: 24 }}>
          <MenuRow icon={FileText} tint="transparent" title="My applications" sub="3 active" to="js-applied" action="reset" />
          <MenuRow icon={Bookmark} tint="transparent" title="Saved jobs" sub="Bookmarked roles" to="js-saved" action="reset" />
          <MenuRow icon={GraduationCap} tint="transparent" title="Resume and education" sub="CV & marksheets" to="js-profile-education" />
          <MenuRow icon={Briefcase} tint="transparent" title="Skills" sub={seeker.skills.slice(0, 3).join(', ') + '...'} to="js-profile-skills" />
          <MenuRow icon={SlidersHorizontal} tint="transparent" title="Job preferences" sub="Role types" to="js-preferences" />
          <MenuRow icon={Settings} tint="transparent" title="Settings" sub="Account and notifications" to="js-settings" />
        </div>
      </div>
      <SeekerTabs active="js-profile" />
    </>
  );
}

/** app/jobseeker/(tabs)/profile/edit.tsx */
export function EditProfile() {
  const nav = useNav();
  const initials = seeker.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      {/* Header: X on left, title center, Save button on right */}
      <div className="appbar">
        <div className="slot">
          <button className="iconbtn" onClick={() => nav.back()} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <h1>Edit profile</h1>
        <div className="slot end">
          <button
            type="button"
            onClick={() => nav.reset('js-profile')}
            style={{
              background: '#4432ff',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '8px 20px',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="scroll pad">
        {/* Avatar */}
        <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar initials={initials} color="#4432ff" size={90} />
            <span
              style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 28, height: 28, borderRadius: '50%',
                background: '#4432ff', border: '2px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Upload size={13} color="#fff" />
            </span>
          </div>
          <p style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: '#4432ff' }}>Upload photo</p>
        </div>

        {/* PUBLIC INFO */}
        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>PUBLIC INFO</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <Field label="Name" value={seeker.name} />
          <Field label="Username" value={seeker.handle} placeholder="username" />
          <Field label="Bio" value={seeker.bio} area placeholder="Tell employers about yourself" />
          <label className="field">
            <span>Native city</span>
            <span className="control">
              <select className="input" defaultValue={seeker.city.split(',')[0].trim()}>
                <option>Hyderabad</option>
                <option>Warangal</option>
                <option>Karimnagar</option>
                <option>Nizamabad</option>
                <option>Secunderabad</option>
              </select>
            </span>
          </label>
          <label className="field">
            <span>Gender</span>
            <span className="control">
              <select className="input" defaultValue={seeker.gender}>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </span>
          </label>
          <label className="field">
            <span>Location preferences</span>
            <span className="control" style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <input className="input" placeholder="Type location to add" style={{ flex: 1 }} />
              <button
                type="button"
                style={{
                  background: '#4432ff', color: '#fff',
                  border: 'none', borderRadius: 10,
                  padding: '10px 18px', fontWeight: 700,
                  fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Add
              </button>
            </span>
          </label>
        </div>

        {/* PROFESSIONAL DETAILS */}
        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>PROFESSIONAL DETAILS</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <MenuRow
            icon={GraduationCap}
            title="Education"
            sub={`${seeker.education} · Osmania University`}
            to="js-profile-education"
          />
          <MenuRow
            icon={Briefcase}
            title="Skills"
            sub={seeker.skills.join(', ')}
            to="js-profile-skills"
          />
          <MenuRow
            icon={FileText}
            title="Resume"
            sub={`${seeker.resumeFile} · ${seeker.resumeSize}`}
            to="js-profile-resume"
          />
        </div>

        {/* VERIFICATION */}
        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>VERIFICATION</p>
        <div className="rows">
          <MenuRow
            icon={ShieldCheck}
            color="#d97706"
            title="Identity verification status"
            sub="Confirm credentials with DigiLocker"
            to="js-verify-dashboard"
          />
        </div>
      </div>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/education.tsx */
export function ProfileEducation() {
  return (
    <>
      <AppBar title="Resume and education" back />
      <Body>
        <p className="label-xs">Education</p>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row between">
            <strong style={{ fontSize: 15 }}>M.Com</strong>
            <span className="done-pill">Verified</span>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>Osmania University · 2024 · 74%</p>
        </div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row between">
            <strong style={{ fontSize: 15 }}>B.Com</strong>
            <span className="done-pill">Verified</span>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>Osmania University · 2022 · 78%</p>
        </div>
        <div className="card">
          <div className="row between">
            <strong style={{ fontSize: 15 }}>Class 12 (MEC)</strong>
            <span className="done-pill">Verified</span>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>Board of Intermediate, Telangana · 2019</p>
        </div>
        <button className="btn ghost sm" style={{ marginTop: 14 }}>
          Add qualification
        </button>
      </Body>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/skills.tsx */
export function ProfileSkills() {
  return (
    <>
      <AppBar title="Skills" back />
      <Body>
        <Field label="Add a skill" placeholder="Type a skill and press enter" />
        <p className="label-xs">Your skills</p>
        <Chips items={seeker.skills} selected={seeker.skills} />
        <div className="banner indigo">
          <span className="title">
            <Sparkles size={18} color="#4432ff" /> 3 or more skills adds +5 trust score
          </span>
          <p>Skills are matched against every job description to calculate your match percentage.</p>
        </div>
      </Body>
      <FootBar>
        <Primary to="js-profile" action="reset">
          Save skills
        </Primary>
      </FootBar>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/job-preferences.tsx */
export function Preferences() {
  return (
    <>
      <AppBar title="Job preferences" back />
      <Body>
        <p className="label-xs">Work categories</p>
        <Chips items={filterCategories} selected={seeker.categories} />
        <p className="label-xs">Employment type</p>
        <Chips items={['Full-time', 'Part-time', 'Internship', 'Contract']} selected={['Full-time']} />
        <p className="label-xs">Experience</p>
        <Chips items={['Fresher', '0-1 yrs', '1-3 yrs', '3-5 yrs', '5-7 yrs']} selected={['1-3 yrs']} />
        <p className="label-xs">Preferred city</p>
        <Field value="Hyderabad, Telangana" />
        <div className="rows">
          <SettingRow title="Open to relocate" sub="Show jobs in other cities" right={<Toggle />} />
          <SettingRow title="Remote only" sub="Hide on-site roles" right={<Toggle />} />
        </div>
      </Body>
      <FootBar>
        <Primary to="js-profile" action="reset">
          Save preferences
        </Primary>
      </FootBar>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/resume.tsx */
export function ProfileResume() {
  return (
    <>
      <AppBar title="My resume" back />
      <Body>
        <div className="filerow">
          <span className="ibox">
            <FileText size={20} />
          </span>
          <span style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: 15 }}>{seeker.resumeFile}</strong>
            <span className="muted">{seeker.resumeSize}</span>
          </span>
          <span className="done-pill">Parsed</span>
        </div>
        <div className="two" style={{ marginTop: 14 }}>
          <button className="btn ghost sm">
            <Upload size={16} /> Replace
          </button>
          <button className="btn ghost sm">Preview</button>
        </div>
        <p className="label-xs">Parsed details used for matching</p>
        <div className="card">
          <div className="kv">
            <span>Name</span>
            <b>{seeker.name}</b>
          </div>
          <div className="kv">
            <span>Experience</span>
            <b>2 years</b>
          </div>
          <div className="kv">
            <span>Education</span>
            <b>{seeker.education}</b>
          </div>
          <div className="kv">
            <span>Skills</span>
            <b>{seeker.skills.length} found</b>
          </div>
        </div>
        <button className="btn danger sm" style={{ marginTop: 16 }}>
          <Trash2 size={16} /> Delete resume
        </button>
      </Body>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/account.tsx */
export function Account() {
  return (
    <>
      <AppBar title="Account" back />
      <Body>
        <p className="label-xs">Sign-in details</p>
        <div className="card">
          <div className="kv">
            <span>Email</span>
            <b>{seeker.email}</b>
          </div>
          <div className="kv">
            <span>Phone</span>
            <b>{seeker.phone}</b>
          </div>
          <div className="kv">
            <span>Password</span>
            <b>Last changed 3 months ago</b>
          </div>
        </div>
        <button className="btn ghost sm" style={{ marginTop: 14 }}>
          Change password
        </button>
        <p className="label-xs">Account lifecycle</p>
        <div className="card">
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: '20px' }}>
            Deactivating hides your profile and applications. You can reactivate within 30 days, after which the
            account is deleted permanently.
          </p>
          <button className="btn danger sm" style={{ marginTop: 14 }}>
            Deactivate account
          </button>
        </div>
      </Body>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/help.tsx */
export function Help() {
  return (
    <>
      <AppBar title="Help" back />
      <Body>
        <p className="label-xs">Frequently asked</p>
        <div className="rows">
          <MenuRow icon={ShieldCheck} tint="#dcfce7" color="#16a34a" title="How is my trust score calculated?" />
          <MenuRow icon={Clock} tint="#fef3c7" color="#d97706" title="When will an employer reply?" />
          <MenuRow icon={FileText} tint="#ede9fe" color="#7c3aed" title="Can I change my resume after applying?" />
        </div>
        <p className="label-xs">Contact</p>
        <div className="rows">
          <MenuRow icon={LifeBuoy} tint="#dbeafe" color="#2563eb" title="Email support" sub="support@applywizard.ai" />
        </div>
        <p className="label-xs">Legal</p>
        <div className="rows">
          <MenuRow icon={FileText} tint="rgba(156,163,175,0.15)" color="var(--muted-2)" title="Terms of service" />
          <MenuRow icon={FileText} tint="rgba(156,163,175,0.15)" color="var(--muted-2)" title="Privacy policy" />
        </div>
      </Body>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/settings.tsx */
export function SeekerSettings() {
  const nav = useNav();
  const { t, langName } = useLanguage();
  const pushOn = true;
  const jobAlertsOn = true;
  const appUpdatesOn = true;

  // Language sheet
  const [showLangSheet, setShowLangSheet] = useState(false);

  // Account Action Flow State: 'none' | 'confirm_modal' | 'otp_sheet'
  const [actionType, setActionType] = useState<'delete' | 'deactivate'>('delete');
  const [deleteStep, setDeleteStep] = useState<'none' | 'confirm_modal' | 'otp_sheet'>('none');
  const [showToast, setShowToast] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (deleteStep === 'otp_sheet') {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
      setOtpDigits(['', '', '', '', '', '']);
    }
  }, [deleteStep]);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleConfirmAction = () => {
    if (actionType === 'delete') {
      accountState.deletionRequested = true;
      accountDeletionState.requested = true;
    } else {
      accountState.deactivated = true;
    }
    nav.reset('js-login');
  };

  const isDelete = actionType === 'delete';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <AppBar title={t('settings')} back />
      <Body>
        {/* Top Notification Toast when OTP code is sent - disappears after 2 seconds */}
        {showToast && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              right: 16,
              zIndex: 120,
              background: '#e6f4ea',
              border: '1px solid #a7f3d0',
              borderLeft: '5px solid #059669',
              borderRadius: 16,
              padding: '14px 16px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              transition: 'opacity 0.3s ease',
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, color: '#047857', fontSize: 15 }}>
              Verification code sent
            </p>
            <p style={{ margin: '4px 0 0', color: 'var(--text-2)', fontSize: 13, lineHeight: '18px' }}>
              Check your registered email for a 6-digit code.
            </p>
          </div>
        )}

        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('account')}</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <MenuRow icon={CircleUser} title={t('editProfile')} to="js-edit" />
          <MenuRow icon={Phone} title={t('phoneEmailPassword')} value={`+91 ${seeker.phone}`} to="js-account" />
          <MenuRow icon={FileText} title={t('myResume')} to="js-profile-resume" />
        </div>

        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('verification')}</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <MenuRow icon={ShieldCheck} title={t('verificationStatus')} value={t('inProgress')} to="js-verify-dashboard" />
          <MenuRow icon={Award} title={t('trustScore')} value={`${seeker.trustScore} · ${t('verifiedTier')}`} to="js-trust-score" />
        </div>

        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('notifications')}</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <MenuRow icon={Bell} title={t('pushNotifications')} right={<Toggle on={pushOn} />} />
          <MenuRow icon={Briefcase} title={t('jobAlerts')} right={<Toggle on={jobAlertsOn} />} />
          <MenuRow icon={Check} title={t('appUpdates')} right={<Toggle on={appUpdatesOn} />} />
        </div>

        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('app')}</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <MenuRow
            icon={Globe}
            title={t('language')}
            value={langName}
            onClick={() => setShowLangSheet(true)}
          />
          <MenuRow icon={Sparkles} title={t('theme')} value={t('themeValue')} to="js-appearance" />
          <MenuRow icon={Share2} title={t('referAFriend')} to="js-refer" />
        </div>

        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('legalSupport')}</p>
        <div className="rows" style={{ marginBottom: 20 }}>
          <MenuRow icon={FileText} title={t('termsOfService')} to="js-help" />
          <MenuRow icon={FileText} title={t('privacyPolicy')} to="js-help" />
          <MenuRow icon={Phone} title={t('helpSupport')} to="js-help" />
        </div>

        <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('accountDeletion')}</p>
        <div className="rows" style={{ marginBottom: 12 }}>
          <MenuRow
            icon={Trash2}
            color="#dc2626"
            title={t('deleteAccount')}
            danger
            value={t('permanent')}
            onClick={() => {
              setActionType('delete');
              setDeleteStep('confirm_modal');
            }}
          />
          <MenuRow
            icon={PauseCircle}
            title={t('deactivateAccount')}
            value={t('pauseOnly')}
            onClick={() => {
              setActionType('deactivate');
              setDeleteStep('confirm_modal');
            }}
          />
        </div>

        <p className="muted" style={{ fontSize: 12, lineHeight: 1.4, margin: '4px 4px 28px' }}>
          Delete account permanently removes your account and personal data. Deactivate only pauses your account.
        </p>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => nav.reset('js-login')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text)',
              cursor: 'pointer',
              padding: '8px 16px',
            }}
          >
            {t('logOut')}
          </button>
        </div>

        <p className="muted" style={{ fontSize: 11, textAlign: 'center', margin: '0 0 16px' }}>
          Verified v1.0.0 · Made for Telangana IN
        </p>
      </Body>

      {/* Pop-up 1: Action Confirmation Dialog */}
      {deleteStep === 'confirm_modal' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 24,
              maxWidth: 340,
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: 'var(--text)' }}>
              {isDelete ? 'Delete account' : 'Deactivate account'}
            </h3>
            <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-2)', margin: '0 0 24px' }}>
              {isDelete
                ? 'This permanently deletes your account and associated personal data. You will be signed out immediately and your profile will no longer be visible. Deletion is completed within 14 days.'
                : 'This pauses your account. Your profile and data stay saved, and you can reactivate later. This is not account deletion.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 20, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setDeleteStep('none')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0d9488',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => setDeleteStep('otp_sheet')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0d9488',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up 2: Verification OTP Bottom Sheet */}
      {deleteStep === 'otp_sheet' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px 24px 0 0',
              padding: '28px 24px 32px',
              width: '100%',
              boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.15)',
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: 'var(--text)' }}>
              {isDelete ? 'Delete account' : 'Deactivate account'}
            </h3>
            <p style={{ fontSize: 13, lineHeight: '20px', color: 'var(--muted-2)', margin: '0 0 24px' }}>
              {isDelete
                ? 'Enter the verification code we sent to your registered email to permanently delete your account.'
                : 'Enter the verification code we sent to your registered email to pause your account. This is not account deletion.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, margin: '24px 0 32px' }}>
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpDigits[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  style={{
                    width: 32,
                    height: 40,
                    fontSize: 22,
                    fontWeight: 700,
                    textAlign: 'center',
                    color: 'var(--text)',
                    border: 'none',
                    borderBottom: `2.5px solid ${otpDigits[idx] ? 'var(--text)' : 'var(--muted-2)'}`,
                    background: 'transparent',
                    outline: 'none',
                    borderRadius: 0,
                  }}
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
              <button
                type="button"
                onClick={() => setDeleteStep('none')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted-2)',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 24,
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Bottom Sheet */}
      {showLangSheet && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
          onClick={() => setShowLangSheet(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px 20px 0 0',
              padding: '20px 20px 36px',
              width: '100%',
              boxShadow: '0 -8px 30px rgba(0,0,0,0.12)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                {t('selectLanguage')}
              </span>
              <button
                type="button"
                onClick={() => setShowLangSheet(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--muted-2)', padding: 4, display: 'flex', alignItems: 'center',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Language options */}
            {(
              [
                { code: 'en' as LanguageCode, label: 'English' },
                { code: 'te' as LanguageCode, label: 'తెలుగు' },
                { code: 'hi' as LanguageCode, label: 'हिन्दी' },
              ] as const
            ).map((opt) => {
              const isActive = langName === (opt.code === 'en' ? 'English' : opt.code === 'te' ? 'తెలుగు' : 'हिन्दी');
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    changeLanguage(opt.code);
                    setShowLangSheet(false);
                  }}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 4px',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#4432ff' : 'var(--text)',
                    }}
                  >
                    {opt.label}
                  </span>
                  {isActive && <Check size={20} color="#4432ff" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/** app/jobseeker/settings/language.tsx */
export function SeekerLanguage() {
  const nav = useNav();
  const { lang } = useLanguage();

  const options: { code: LanguageCode; nativeName: string; englishName: string; flag: string }[] = [
    { code: 'en', nativeName: 'English', englishName: 'English', flag: '🇬🇧' },
    { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu', flag: '🇮🇳' },
    { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', flag: '🇮🇳' },
  ];

  const handleSelect = (code: LanguageCode) => {
    changeLanguage(code);
    nav.back();
  };

  return (
    <>
      <AppBar title="Select Language" back />
      <Body>
        <p className="label-xs">Choose your preferred language</p>
        <p style={{ fontSize: 13, color: 'var(--muted-2)', margin: '0 0 20px', lineHeight: '18px' }}>
          The app interface will change to the selected language immediately.
        </p>
        <div className="rows">
          {options.map((opt) => (
            <button
              key={opt.code}
              type="button"
              className="mrow"
              onClick={() => handleSelect(opt.code)}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: lang === opt.code ? 'rgba(68,50,255,0.18)' : 'rgba(156,163,175,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}
              >
                {opt.flag}
              </span>
              <span className="body" style={{ flex: 1 }}>
                <strong style={{ fontSize: 15 }}>{opt.nativeName}</strong>
                <span style={{ fontSize: 13, color: 'var(--muted-2)' }}>{opt.englishName}</span>
              </span>
              <span
                style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: lang === opt.code ? '2px solid #4432ff' : '2px solid var(--border)',
                  background: lang === opt.code ? '#4432ff' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {lang === opt.code && <Check size={13} color="#fff" strokeWidth={3} />}
              </span>
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)',
            borderRadius: 16,
            padding: '16px 18px',
            border: '1px solid #c4b5fd',
          }}
        >
          <p style={{ margin: 0, fontWeight: 700, color: '#4432ff', fontSize: 14 }}>
            🌐 {lang === 'en' ? 'Language tip' : lang === 'te' ? 'భాష చిట్కా' : 'भाषा सुझाव'}
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4c1d95', lineHeight: '18px' }}>
            {lang === 'en'
              ? 'Changing the language updates all labels, menus and buttons throughout the app.'
              : lang === 'te'
              ? 'భాషను మార్చడం వల్ల యాప్‌లోని అన్ని లేబుల్లు, మెనులు మరియు బటన్లు నవీకరించబడతాయి.'
              : 'भाषा बदलने से ऐप में सभी लेबल, मेनू और बटन अपडेट हो जाते हैं।'}
          </p>
        </div>
      </Body>
    </>
  );
}

/** app/jobseeker/settings/appearance.tsx */
export function SeekerAppearance() {
  const nav = useNav();
  const { mode } = useTheme();
  const [selected, setSelected] = useState<'light' | 'dark'>(mode);

  const handleSave = () => {
    changeTheme(selected);
    nav.back();
  };

  // Mini phone preview component
  const PhonePreview = ({ dark }: { dark: boolean }) => (
    <div
      style={{
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        border: `2px solid ${dark ? '#374151' : '#e5e7eb'}`,
        background: dark ? '#0f0f11' : '#f6f7fb',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      }}
    >
      {/* Mini status bar */}
      <div style={{
        height: 14, background: dark ? '#0f0f11' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px', fontSize: 7, fontWeight: 700,
        color: dark ? '#9ca3af' : '#6b7280',
      }}>
        <span>9:41</span>
        <span>● ▲ ■</span>
      </div>
      {/* Mini app bar */}
      <div style={{
        background: dark ? '#1c1c1f' : '#fff',
        borderBottom: `1px solid ${dark ? '#2c2c30' : '#e5e7eb'}`,
        padding: '6px 10px', fontSize: 9, fontWeight: 700,
        color: dark ? '#f3f4f6' : '#111827',
      }}>
        Saved jobs
      </div>
      {/* Mini search bar */}
      <div style={{
        background: dark ? '#1c1c1f' : '#fff',
        padding: '5px 8px',
        borderBottom: `1px solid ${dark ? '#2c2c30' : '#e5e7eb'}`,
      }}>
        <div style={{
          background: dark ? '#26262b' : '#f3f4f6',
          borderRadius: 6, padding: '4px 7px',
          fontSize: 7, color: dark ? '#6b7280' : '#9ca3af',
        }}>
          Search by job title, company, or location
        </div>
      </div>
      {/* Mini job card */}
      <div style={{ padding: '6px 8px' }}>
        <div style={{
          background: dark ? '#1c1c1f' : '#fff',
          border: `1px solid ${dark ? '#2c2c30' : '#e5e7eb'}`,
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', gap: 6, padding: '7px 8px 4px' }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
              background: '#22c55e', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#fff',
            }}>GR</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 7, fontWeight: 800, color: dark ? '#f3f4f6' : '#111827', lineHeight: '10px' }}>
                Senior Executive –Accounts
              </div>
              <div style={{ fontSize: 6, color: dark ? '#9ca3af' : '#6b7280', marginTop: 1 }}>
                Greenways EniCvergy Private Limited
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>
                <span style={{ fontSize: 5.5, padding: '1px 4px', background: dark ? '#26262b' : '#f3f4f6', borderRadius: 99, color: dark ? '#d1d5db' : '#374151', fontWeight: 700 }}>FULL TIME</span>
                <span style={{ fontSize: 5.5, padding: '1px 4px', background: dark ? '#26262b' : '#f3f4f6', borderRadius: 99, color: dark ? '#d1d5db' : '#374151', fontWeight: 700 }}>MID</span>
                <span style={{ fontSize: 5.5, color: dark ? '#9ca3af' : '#6b7280' }}>23 Apr</span>
              </div>
              <div style={{ fontSize: 6, color: dark ? '#9ca3af' : '#6b7280', marginTop: 2 }}>
                📍 Sudigilla Village BEZ
              </div>
              <div style={{ fontSize: 6, color: dark ? '#9ca3af' : '#6b7280' }}>Salary not disclosed</div>
            </div>
            <span style={{
              fontSize: 5.5, padding: '2px 5px',
              background: '#dcfce7', color: '#15803d',
              borderRadius: 99, fontWeight: 700, height: 'fit-content',
            }}>64% MATCH</span>
          </div>
          {/* Quick apply button */}
          <div style={{
            margin: '4px 8px 7px',
            background: '#4432ff', borderRadius: 7,
            textAlign: 'center', padding: '5px 0',
            fontSize: 7, fontWeight: 800, color: '#fff',
          }}>
            ⚡ Quick Apply
          </div>
        </div>
      </div>
      {/* Mini tab bar */}
      <div style={{
        display: 'flex', background: dark ? '#1c1c1f' : '#fff',
        borderTop: `1px solid ${dark ? '#2c2c30' : '#e5e7eb'}`,
        padding: '5px 0 6px',
      }}>
        {['Jobs', 'Applied', 'Saved', 'Profile'].map((label, i) => (
          <div key={label} style={{
            flex: 1, textAlign: 'center', fontSize: 6, fontWeight: 700,
            color: i === 2
              ? (dark ? '#818cf8' : '#4432ff')
              : (dark ? '#6b7280' : '#9ca3af'),
          }}>
            {i === 0 ? '⊞' : i === 1 ? '📄' : i === 2 ? '🔖' : '👤'}
            <div>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar title="Appearance" back />
      <div className="scroll pad">
        <p className="label-xs">Theme</p>

        {/* Two preview cards side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {/* Light theme */}
          <button
            type="button"
            onClick={() => setSelected('light')}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}
          >
            <div style={{
              width: '100%',
              outline: selected === 'light' ? '2.5px solid #4432ff' : '2px solid #e5e7eb',
              outlineOffset: 2, borderRadius: 18,
              boxShadow: selected === 'light' ? '0 0 0 4px rgba(68,50,255,0.10)' : 'none',
            }}>
              <PhonePreview dark={false} />
            </div>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: selected === 'light' ? '#4432ff' : 'var(--text)',
            }}>
              Light theme
            </span>
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              border: selected === 'light' ? '2px solid #4432ff' : '2px solid #d1d5db',
              background: selected === 'light' ? '#4432ff' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {selected === 'light' && (
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'block' }} />
              )}
            </span>
          </button>

          {/* Dark theme */}
          <button
            type="button"
            onClick={() => setSelected('dark')}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}
          >
            <div style={{
              width: '100%',
              outline: selected === 'dark' ? '2.5px solid #4432ff' : '2px solid #e5e7eb',
              outlineOffset: 2, borderRadius: 18,
              boxShadow: selected === 'dark' ? '0 0 0 4px rgba(68,50,255,0.10)' : 'none',
            }}>
              <PhonePreview dark={true} />
            </div>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: selected === 'dark' ? '#4432ff' : 'var(--text)',
            }}>
              Dark theme
            </span>
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              border: selected === 'dark' ? '2px solid #4432ff' : '2px solid #d1d5db',
              background: selected === 'dark' ? '#4432ff' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {selected === 'dark' && (
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'block' }} />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Save button fixed at bottom */}
      <div className="footbar">
        <button
          type="button"
          className="btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

/** app/jobseeker/settings/notifications.tsx */
export function SeekerNotifications() {
  return (
    <>
      <AppBar title="Notifications" back />
      <Body>
        <div>
          <p className="label-xs">Push</p>
          <div className="rows">
            <SettingRow title="New job matches" sub="Jobs that fit your skills and city" right={<Toggle on />} />
            <SettingRow title="Application updates" sub="Shortlists, interviews, offers" right={<Toggle on />} />
            <SettingRow title="Interview reminders" sub="One hour before the call" right={<Toggle on />} />
            <SettingRow title="Saved job closing soon" sub="Two days before the deadline" right={<Toggle />} />
          </div>
          <p className="label-xs">Email</p>
          <div className="rows">
            <SettingRow title="Weekly job digest" sub="Every Monday morning" right={<Toggle on />} />
            <SettingRow title="Product updates" sub="New Applywizard features" right={<Toggle />} />
          </div>
          <p className="label-xs">Recent</p>
          <div className="rows">
            <MenuRow icon={Send} tint="#ede9fe" color="#7c3aed" title="You were shortlisted" sub={`${job.title} · ${job.company} · 1h ago`} />
            <MenuRow icon={Sparkles} tint="#dcfce7" color="#16a34a" title="12 new matches" sub="Finance roles in Hyderabad · today" />
            <MenuRow icon={Check} tint="#dbeafe" color="#2563eb" title="Trust score updated" sub={`Now ${seeker.trustScore} · yesterday`} />
          </div>
        </div>
        <TextLink action="back">Back to settings</TextLink>
      </Body>
    </>
  );
}

function makeInviteCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function makeInviteLink(code: string) {
  const slug = seeker.name.split(' ')[0].toUpperCase();
  return `https://applywizard.ai/invite/${slug}-${code}`;
}

/** Settings → Refer a Friend */
export function SeekerRefer() {
  const [code, setCode] = useState(() => makeInviteCode());
  const [copied, setCopied] = useState(false);
  const link = makeInviteLink(code);

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        const input = document.createElement('textarea');
        input.value = link;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const regenerate = () => {
    setCode(makeInviteCode());
    setCopied(false);
  };

  return (
    <>
      <AppBar title="Refer a Friend" back />
      <Body>
        <div className="burst indigo" style={{ margin: '8px auto 18px' }}>
          <Share2 size={40} />
        </div>
        <h1 className="display" style={{ textAlign: 'center' }}>Invite a friend</h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          Share your personal link. Friends who join with it get a head start, and you both earn referral rewards.
        </p>

        <p className="label-xs">Your invite link</p>
        <div
          className="card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 14px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text)',
                wordBreak: 'break-all',
                lineHeight: '18px',
              }}
            >
              {link}
            </p>
          </div>
          <button
            type="button"
            className="iconbtn"
            aria-label={copied ? 'Copied' : 'Copy invite link'}
            onClick={copyLink}
            style={{
              flex: 'none',
              width: 42,
              height: 42,
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: copied ? 'rgba(22,163,74,0.12)' : 'var(--card)',
              color: copied ? '#16a34a' : 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>

        {copied ? (
          <p
            style={{
              margin: '10px 0 0',
              textAlign: 'center',
              color: '#16a34a',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Link copied!
          </p>
        ) : null}

        <div className="card" style={{ marginTop: 16 }}>
          <div className="kv">
            <span>Referral code</span>
            <b>{code}</b>
          </div>
          <div className="kv">
            <span>Invites sent</span>
            <b>0</b>
          </div>
          <div className="kv">
            <span>Friends joined</span>
            <b>0</b>
          </div>
        </div>

        <button
          type="button"
          className="btn ghost"
          style={{ marginTop: 16 }}
          onClick={regenerate}
        >
          Generate new link
        </button>
      </Body>
      <FootBar>
        <button type="button" className="btn" onClick={copyLink}>
          <Copy size={18} /> {copied ? 'Copied' : 'Copy invite link'}
        </button>
      </FootBar>
    </>
  );
}
