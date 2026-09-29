import {
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
  GraduationCap,
  IndianRupee,
  LifeBuoy,
  LogOut,
  MapPin,
  Moon,
  Palette,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
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
} from '../kit';
import { filterCategories, job, seeker, secondJob, thirdJob } from '../data';
import { useNav } from '../nav';

/** app/jobseeker/(tabs)/index.tsx — guest mode: Jobs only. */
export function GuestJobs() {
  const nav = useNav();
  return (
    <>
      <AppBar title="All jobs" guest filter />
      <SearchBox placeholder="Search by job title, company, or location" />
      <div className="scroll">
        <PromoCarousel
          onSaved={() => nav.push('js-login')}
          onRecent={() => nav.open('filters')}
        />
        <div className="pad">
          <JobCard job={job} to="js-job" guest />
          <JobCard job={secondJob} to="js-job" guest />
          <JobCard job={thirdJob} to="js-job" guest />
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

/** app/jobseeker/(tabs)/index.tsx */
export function Jobs() {
  const nav = useNav();
  return (
    <>
      <AppBar title="All jobs" menu bell filter onBell="js-notifications" />
      <SearchBox placeholder="Search by job title, company, or location" />
      <div className="scroll">
        <PromoCarousel
          onSaved={() => nav.reset('js-saved')}
          onRecent={() => nav.open('filters')}
        />
        <div className="pad">
          <JobCard job={job} to="js-job" />
          <JobCard job={secondJob} to="js-job" saved />
          <JobCard job={thirdJob} to="js-job" />
        </div>
      </div>
      <SeekerTabs active="js-jobs" />
    </>
  );
}

/** app/jobseeker/job/[id].tsx */
export function JobDetails() {
  const nav = useNav();
  return (
    <>
      <AppBar title="Job details" back right={<button className="iconbtn"><Bookmark size={20} /></button>} />
      <div className="scroll pad">
        <div className="card">
          <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <span className="jobcard-logo logo" style={{ width: 52, height: 52, borderRadius: 14, background: job.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              {job.initials}
            </span>
            <div style={{ flex: 1 }}>
              <h2 className="h2" style={{ fontSize: 19, lineHeight: '24px' }}>{job.title}</h2>
              <p style={{ margin: '4px 0 0', color: '#374151', fontSize: 14, fontWeight: 500 }}>{job.company}</p>
            </div>
          </div>
          <div className="chips" style={{ marginTop: 14 }}>
            <span className="match">
              <Sparkles size={12} /> {job.match}% MATCH
            </span>
            <span className="tag dept">{job.department}</span>
            <span className="tag">{job.type}</span>
            <span className="tag">{job.experience}</span>
          </div>
          <div className="kv" style={{ marginTop: 14, borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
            <span>
              <IndianRupee size={13} style={{ verticalAlign: -2 }} /> Salary
            </span>
            <b>{job.salary}</b>
          </div>
          <div className="kv">
            <span>
              <MapPin size={13} style={{ verticalAlign: -2 }} /> Location
            </span>
            <b>{job.location}</b>
          </div>
          <div className="kv">
            <span>
              <Building2 size={13} style={{ verticalAlign: -2 }} /> Work mode
            </span>
            <b>{job.mode}</b>
          </div>
          <div className="kv">
            <span>
              <CalendarClock size={13} style={{ verticalAlign: -2 }} /> Apply before
            </span>
            <b>{job.deadline}</b>
          </div>
        </div>

        <div className="banner green">
          <span className="title">
            <ShieldCheck size={18} color="#16a34a" /> Verified employer
          </span>
          <p>BrightPath Finance verified their company PAN and CIN with Applywizard.</p>
        </div>

        <p className="label-xs">About the role</p>
        <p style={{ margin: 0, color: '#374151', fontSize: 14, lineHeight: '23px' }}>{job.about}</p>

        <p className="label-xs">What you will do</p>
        <ul className="bullets">
          {job.responsibilities.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <p className="label-xs">Requirements</p>
        <ul className="bullets">
          {job.requirements.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

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
          <button className="save" style={{ width: 54, height: 54, borderRadius: 14, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
            <Bookmark size={20} />
          </button>
          <button className="btn" style={{ flex: 1 }} onClick={() => nav.push('js-apply')}>
            <Sparkles size={18} /> Quick Apply
          </button>
        </div>
      </FootBar>
    </>
  );
}

/** features/jobseeker/components/QuickApplyModal.tsx */
export function QuickApply() {
  return (
    <>
      <PlainBar title="Quick apply" />
      <Body>
        <div className="card">
          <div className="row between">
            <strong style={{ fontSize: 15 }}>{job.title}</strong>
            <span className="match">
              <Sparkles size={12} /> {job.match}% MATCH
            </span>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>{job.company} · {job.location}</p>
        </div>

        <p className="label-xs">Applying with</p>
        <div className="filerow">
          <span className="ibox">
            <FileText size={20} />
          </span>
          <span style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: 15 }}>{seeker.resumeFile}</strong>
            <span className="muted">{seeker.resumeSize}</span>
          </span>
          <ChevronRight size={20} color="#9ca3af" />
        </div>

        <p className="label-xs">Screening questions</p>
        <Field label="How many years of Tally Prime experience do you have?" value="2 years" />
        <Field label="Can you join within 15 days?" value="Yes" />
        <Field label="Anything you want the employer to know?" placeholder="Optional" area />

        <div className="banner green">
          <span className="title">
            <ShieldCheck size={18} color="#16a34a" /> Trust score {seeker.trustScore} attached
          </span>
          <p>The employer sees your verified badge, documents checked and skills with this application.</p>
        </div>
      </Body>
      <FootBar>
        <Primary to="js-applied" action="reset">
          Submit application
        </Primary>
      </FootBar>
    </>
  );
}

/** app/jobseeker/(tabs)/applied.tsx */
export function Applied() {
  const nav = useNav();
  const stages = ['Applied', 'Under review', 'Shortlisted', 'Interview', 'Offer'];
  return (
    <>
      <AppBar title="Applied" menu bell filter={false} onBell="js-notifications" />
      <div className="scroll pad">
        <Chips items={['All 3', 'In progress 2', 'Closed 1']} selected={['All 3']} scroll />
        <div style={{ height: 14 }} />

        <div className="card" style={{ marginBottom: 14 }}>
          <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: job.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flex: 'none' }}>
              {job.initials}
            </span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 15 }}>{job.title}</strong>
              <p className="muted" style={{ margin: '2px 0 0' }}>{job.company} · Applied today</p>
            </div>
            <span className="pill" style={{ background: '#ede9fe', color: '#7c3aed' }}>Shortlisted</span>
          </div>
          <div className="stage-track" style={{ marginTop: 14 }}>
            {stages.map((stage, index) => (
              <div key={stage} className={index <= 2 ? 'on' : ''}>
                {stage}
              </div>
            ))}
          </div>
          <button className="btn outline sm" style={{ marginTop: 14 }} onClick={() => nav.push('js-job')}>
            View job
          </button>
        </div>

        <div className="card" style={{ marginBottom: 14 }}>
          <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: secondJob.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flex: 'none' }}>
              {secondJob.initials}
            </span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 15 }}>{secondJob.title}</strong>
              <p className="muted" style={{ margin: '2px 0 0' }}>{secondJob.company} · Applied 4 days ago</p>
            </div>
            <span className="pill" style={{ background: '#fef3c7', color: '#d97706' }}>Under review</span>
          </div>
          <div className="stage-track" style={{ marginTop: 14 }}>
            {stages.map((stage, index) => (
              <div key={stage} className={index <= 1 ? 'on' : ''}>
                {stage}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: thirdJob.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flex: 'none' }}>
              {thirdJob.initials}
            </span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 15 }}>{thirdJob.title}</strong>
              <p className="muted" style={{ margin: '2px 0 0' }}>{thirdJob.company} · Applied 2 weeks ago</p>
            </div>
            <span className="pill" style={{ background: '#fee2e2', color: '#dc2626' }}>Not selected</span>
          </div>
        </div>
      </div>
      <SeekerTabs active="js-applied" />
    </>
  );
}

/** app/jobseeker/(tabs)/saved.tsx */
export function Saved() {
  return (
    <>
      <AppBar title="Saved" menu bell filter onBell="js-notifications" />
      <div className="scroll pad">
        <p className="label-xs">2 saved jobs</p>
        <JobCard job={secondJob} to="js-job" saved />
        <JobCard job={thirdJob} to="js-job" saved />
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
          <button className="iconbtn" onClick={() => nav.push('js-settings')}>
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
              <span className="pill" style={{ background: '#dcfce7', color: '#15803d' }}>Verified</span>
            </div>
            <p className="trustline">Trust score: {seeker.trustScore} / 70+ for verified badge</p>
            <p className="bio">{seeker.bio}</p>
            <div className="row" style={{ gap: 4, marginTop: 8 }}>
              <MapPin size={14} color="#9ca3af" />
              <span style={{ color: '#9ca3af', fontSize: 14, fontWeight: 600 }}>{seeker.city}</span>
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
          <MenuRow icon={FileText} tint="#ede9fe" color="#7c3aed" title="My applications" sub="3 active" to="js-applied" action="reset" />
          <MenuRow icon={Bookmark} tint="#dbeafe" color="#2563eb" title="Saved jobs" sub="Bookmarked roles" to="js-saved" action="reset" />
          <MenuRow icon={GraduationCap} tint="#dcfce7" color="#16a34a" title="Resume and education" sub="CV & marksheets" to="js-profile-education" />
          <MenuRow icon={Briefcase} tint="#fef3c7" color="#d97706" title="Skills" sub={seeker.skills.slice(0, 3).join(', ') + '...'} to="js-profile-skills" />
          <MenuRow icon={SlidersHorizontal} tint="#f3e8ff" color="#8b5cf6" title="Job preferences" sub="Role types" to="js-preferences" />
          <MenuRow icon={Settings} tint="#f3f4f6" color="#6b7280" title="Settings" sub="Account and notifications" to="js-settings" />
        </div>
      </div>
      <SeekerTabs active="js-profile" />
    </>
  );
}

/** app/jobseeker/(tabs)/profile/edit.tsx */
export function EditProfile() {
  return (
    <>
      <AppBar title="Edit profile" back />
      <Body>
        <div style={{ textAlign: 'center', padding: '14px 0 18px' }}>
          <Avatar initials="AR" color="#4432ff" size={82} />
          <p className="photo-hint" style={{ marginTop: 10 }}>Change photo</p>
        </div>
        <Field label="Full name" value={seeker.name} />
        <Field label="Headline" value="Accounts executive · Tally & GST" />
        <Field label="About" value={seeker.bio} area />
        <Field label="Current city" value={seeker.city} />
        <Field label="Phone" value={seeker.phone} />
        <Field label="Date of birth" value={seeker.dob} />
      </Body>
      <FootBar>
        <Primary to="js-profile" action="reset">
          Save changes
        </Primary>
      </FootBar>
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
          <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: '20px' }}>
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
          <MenuRow icon={FileText} tint="#f3f4f6" color="#6b7280" title="Terms of service" />
          <MenuRow icon={FileText} tint="#f3f4f6" color="#6b7280" title="Privacy policy" />
        </div>
      </Body>
    </>
  );
}

/** app/jobseeker/(tabs)/profile/settings.tsx */
export function SeekerSettings() {
  return (
    <>
      <AppBar title="Settings" back />
      <Body>
        <p className="label-xs">Account</p>
        <div className="rows">
          <MenuRow icon={CircleUser} tint="#ede9fe" color="#7c3aed" title="Account" sub="Email, phone, deactivate" to="js-account" />
        </div>
        <p className="label-xs">Verification</p>
        <div className="rows">
          <MenuRow icon={ShieldCheck} tint="#dcfce7" color="#16a34a" title="Verification" sub={`Trust score ${seeker.trustScore}`} to="js-verify-dashboard" />
        </div>
        <p className="label-xs">Notifications</p>
        <div className="rows">
          <MenuRow icon={Bell} tint="#fef3c7" color="#d97706" title="Push notifications" sub="On" to="js-notifications" />
        </div>
        <p className="label-xs">App</p>
        <div className="rows">
          <MenuRow icon={Palette} tint="#e0e7ff" color="#4432ff" title="Appearance" sub="Theme and display" to="js-appearance" />
        </div>
        <p className="label-xs">Legal and support</p>
        <div className="rows">
          <MenuRow icon={LifeBuoy} tint="#f3e8ff" color="#8b5cf6" title="Help and support" sub="FAQs and policies" to="js-help" />
        </div>
        <div className="rows" style={{ marginTop: 24 }}>
          <MenuRow icon={LogOut} tint="rgba(239,68,68,0.1)" color="#ef4444" title="Log out" danger to="js-login" action="reset" />
        </div>
      </Body>
    </>
  );
}

/** app/jobseeker/settings/appearance.tsx */
export function SeekerAppearance() {
  return (
    <>
      <AppBar title="Appearance" back />
      <Body>
        <p className="label-xs">Theme</p>
        <div className="rows">
          <SettingRow title="Light" sub="Always light" right={<span className="radio on" />} />
          <SettingRow title="Dark" sub="Always dark" right={<span className="radio" />} />
          <SettingRow title="System" sub="Match the device setting" right={<span className="radio" />} />
        </div>
        <p className="label-xs">Preview</p>
        <div className="card">
          <div className="row between" style={{ marginBottom: 10 }}>
            <strong style={{ fontSize: 14 }}>All jobs</strong>
            <Moon size={16} color="#9ca3af" />
          </div>
          <div className="jobcard" style={{ marginBottom: 0 }}>
            <div className="top" style={{ padding: 12 }}>
              <span className="logo" style={{ width: 34, height: 34, borderRadius: 9, fontSize: 12, background: job.logoColor }}>
                {job.initials}
              </span>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 13 }}>{job.title}</strong>
                <p className="muted" style={{ margin: 0, fontSize: 11 }}>{job.company}</p>
              </div>
            </div>
            <div className="actions" style={{ padding: 12 }}>
              <span className="apply" style={{ padding: '9px 0', fontSize: 12 }}>Quick apply</span>
            </div>
          </div>
        </div>
        <p className="label-xs">Language</p>
        <div className="rows">
          <SettingRow title="English" right={<span className="radio on" />} />
          <SettingRow title="తెలుగు" right={<span className="radio" />} />
          <SettingRow title="हिन्दी" right={<span className="radio" />} />
        </div>
      </Body>
    </>
  );
}

/** app/jobseeker/settings/notifications.tsx */
export function SeekerNotifications() {
  return (
    <>
      <AppBar title="Notifications" back />
      <Body>
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
        <TextLink action="back">Back to settings</TextLink>
      </Body>
    </>
  );
}
