import {
  BadgeCheck,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Mail,
  MapPin,
  Monitor,
  Palette,
  Plus,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  User,
  Users,
} from 'lucide-react';

import {
  AppBar,
  Avatar,
  Body,
  Chips,
  Field,
  FootBar,
  HrTabs,
  MenuRow,
  Primary,
  SearchBox,
  SettingRow,
  Stat,
  TextLink,
  Toggle,
} from '../kit';
import { candidates, employer, funnelColors, funnelCounts, interviews, job, pipelineStages } from '../data';
import { useNav } from '../nav';

const stageTint: Record<string, { bg: string; color: string }> = {
  Applied: { bg: '#f1f5f9', color: '#475569' },
  'Under review': { bg: '#ccfbf1', color: '#0d9488' },
  Shortlisted: { bg: '#ede9fe', color: '#7c3aed' },
  Interview: { bg: '#dbeafe', color: '#2563eb' },
  'Offer sent': { bg: '#dcfce7', color: '#16a34a' },
  Hired: { bg: '#d1fae5', color: '#065f46' },
  Rejected: { bg: '#fee2e2', color: '#dc2626' },
};

function HrHeader() {
  const nav = useNav();
  return (
    <div className="appbar" style={{ padding: '14px 20px' }}>
      <button className="row" style={{ gap: 12 }} onClick={() => nav.push('hr-my-profile')}>
        <Avatar initials="PS" color="#4432ff" size={42} />
        <span>
          <strong style={{ display: 'block', fontSize: 16, fontWeight: 800 }}>{employer.name}</strong>
          <span className="muted">Monday, 28 September</span>
        </span>
      </button>
      <span className="spacer" />
      <button className="iconbtn" onClick={() => nav.push('hr-settings-notifications')}>
        <Bell size={22} color="var(--text-2)" />
        <i className="dot-badge" />
      </button>
    </div>
  );
}

/** app/hr-screens/index.tsx — OverviewTab */
export function HrHome() {
  const nav = useNav();
  const total = funnelCounts.reduce((sum, value) => sum + value, 0);
  return (
    <>
      <HrHeader />
      <div className="scroll pad-20">
        <h2 className="h2">Hiring snapshot</h2>
        <p className="sub">Here&apos;s where everything stands today.</p>

        <div className="stats">
          <Stat label="Total Applicants" value={total} sub="↑ 24 this week" subColor="#16a34a" icon={Users} iconBg="#e0f2fe" iconColor="#0284c7" to="hr-candidates" />
          <Stat label="Pending Review" value={18} sub="Needs action" icon={Clock} iconBg="#fef3c7" iconColor="#d97706" to="hr-candidates" />
          <Stat label="Shortlisted" value={9} sub="Across 2 roles" icon={Star} iconBg="#ede9fe" iconColor="#7c3aed" to="hr-candidates" />
          <Stat label="Today's Interviews" value={3} sub="2 unconfirmed" icon={Calendar} iconBg="#e0f2fe" iconColor="#0891b2" to="hr-interviews" />
          <Stat label="Offers Sent" value={2} sub="2 pending reply" subColor="#16a34a" icon={Send} iconBg="#dcfce7" iconColor="#16a34a" to="hr-candidates" />
          <Stat label="Hires This Month" value={1} sub="Target: 12" subColor="#16a34a" icon={CheckCircle} iconBg="#dcfce7" iconColor="#16a34a" to="hr-candidates" />
        </div>

        <h2 className="h2">Hiring funnel</h2>
        <button className="card" style={{ width: '100%', margin: '12px 0 16px' }} onClick={() => nav.push('hr-pipeline')}>
          {pipelineStages.map((stage, index) => (
            <div key={stage} className="funnel">
              <span>{stage}</span>
              <span className="track">
                <i
                  style={{
                    width: `${Math.max(3, (funnelCounts[index] / total) * 100)}%`,
                    background: funnelColors[index],
                  }}
                />
              </span>
              <b>{funnelCounts[index]}</b>
            </div>
          ))}
        </button>

        <div className="row between" style={{ marginBottom: 12 }}>
          <h2 className="h2">Alerts</h2>
          <span style={{ color: '#4432ff', fontSize: 13, fontWeight: 700 }}>Needs action</span>
        </div>
        <button className="alert" style={{ background: '#fee2e2', borderColor: '#ef4444', width: '100%' }} onClick={() => nav.reset('hr-interviews')}>
          <p>2 interviews unconfirmed — candidates haven&apos;t responded.</p>
          <span>Needs action</span>
        </button>
        <button className="alert" style={{ background: '#fef3c7', borderColor: '#f59e0b', width: '100%' }} onClick={() => nav.reset('hr-candidates')}>
          <p>18 applications pending review for over 48 hrs.</p>
          <span>Oldest: 3 days ago</span>
        </button>
        <button className="alert" style={{ background: '#ede9fe', borderColor: '#8b5cf6', width: '100%' }} onClick={() => nav.reset('hr-candidates')}>
          <p>2 offer letters awaiting candidate response. Deadline tomorrow.</p>
          <span>Expires: 29 Sep 2026</span>
        </button>

        <div className="row between" style={{ margin: '24px 0 12px' }}>
          <h2 className="h2">Today&apos;s interviews</h2>
          <button style={{ color: '#4432ff', fontSize: 13, fontWeight: 700 }} onClick={() => nav.reset('hr-interviews')}>
            View all &gt;
          </button>
        </div>
        <div className="card">
          {interviews.map((item, index) => (
            <button
              key={item.name}
              className="row"
              style={{
                gap: 12,
                width: '100%',
                padding: '14px 0',
                borderTop: index > 0 ? '1px solid #e5e7eb' : undefined,
              }}
              onClick={() => nav.push('hr-candidate')}
            >
              <span style={{ width: 56, color: 'var(--muted)', fontSize: 12, fontWeight: 700 }}>{item.time}</span>
              <Avatar initials={item.initials} color={item.color} size={40} />
              <span style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{item.name}</strong>
                <span className="muted">{item.role}</span>
              </span>
              <span
                className="pill"
                style={
                  item.status === 'Confirmed'
                    ? { background: '#dcfce7', color: '#16a34a' }
                    : item.status === 'Declined'
                      ? { background: '#fee2e2', color: '#dc2626' }
                      : { background: '#fef3c7', color: '#d97706' }
                }
              >
                {item.status}
              </span>
            </button>
          ))}
        </div>

        <div className="row between" style={{ margin: '24px 0 12px' }}>
          <h2 className="h2">More tools</h2>
        </div>
        <div className="rows">
          <MenuRow icon={LayoutGrid} tint="#ede9fe" color="#7c3aed" title="Pipeline" sub="Applicants grouped by stage" to="hr-pipeline" />
          <MenuRow icon={Sparkles} tint="#dbeafe" color="#2563eb" title="Analytics" sub="Open jobs, applicants, average match" to="hr-analytics" />
          <MenuRow icon={Monitor} tint="#f3f4f6" color="var(--muted-2)" title="Open on desktop" sub="Bulk actions and exports" to="hr-desktop" />
        </div>
      </div>
      <HrTabs active="hr-home" />
    </>
  );
}

/** components/hr-screens/JobsTab.tsx */
export function HrJobs() {
  const nav = useNav();
  return (
    <>
      <div className="appbar" style={{ padding: '16px 20px' }}>
        <h1 style={{ textAlign: 'left', fontSize: 20, fontWeight: 800 }}>Active Jobs</h1>
        <button className="iconbtn" onClick={() => nav.push('hr-post-1')}>
          <Plus size={22} />
        </button>
      </div>
      <div className="scroll pad">
        <SearchBox placeholder="Search by role, department..." band={false} />
        <Chips items={['All 2', 'Active', 'Slow', 'Urgent', 'Paused', 'Expired']} selected={['All 2']} scroll />
        <div style={{ height: 16 }} />

        <button className="hrjob" onClick={() => nav.push('hr-job')}>
          <span className="head">
            <span style={{ flex: 1 }}>
              <strong>{job.title}</strong>
              <em>
                {employer.company} · {job.location} · {job.salary}
              </em>
            </span>
            <span className="status" style={{ color: '#22c55e' }}>
              <i /> Active
            </span>
          </span>
          <span className="minigrid">
            <div>
              <b>42</b>
              <span>Applied</span>
            </div>
            <div>
              <b>9</b>
              <span>Shortlist</span>
            </div>
            <div>
              <b>3</b>
              <span>Interview</span>
            </div>
            <div>
              <b>2</b>
              <span>Offer</span>
            </div>
          </span>
          <span className="row" style={{ gap: 10 }}>
            <span className="progress">
              <i style={{ width: '62%', background: '#3b82f6' }} />
            </span>
            <span className="pill" style={{ background: '#f5f3ff', color: '#0891b2' }}>Good</span>
          </span>
        </button>

        <button className="hrjob" onClick={() => nav.push('hr-job')}>
          <span className="head">
            <span style={{ flex: 1 }}>
              <strong>Accounts Executive</strong>
              <em>{employer.company} · Secunderabad · ₹22,000/mo</em>
            </span>
            <span className="status" style={{ color: '#f59e0b' }}>
              <i /> Slow
            </span>
          </span>
          <span className="minigrid">
            <div>
              <b>8</b>
              <span>Applied</span>
            </div>
            <div>
              <b>2</b>
              <span>Shortlist</span>
            </div>
            <div>
              <b>1</b>
              <span>Interview</span>
            </div>
            <div>
              <b>0</b>
              <span>Offer</span>
            </div>
          </span>
          <span className="row" style={{ gap: 10 }}>
            <span className="progress">
              <i style={{ width: '18%', background: '#f59e0b' }} />
            </span>
            <span className="pill" style={{ background: '#fef3c7', color: '#f59e0b' }}>Slow</span>
          </span>
        </button>
      </div>
      <HrTabs active="hr-jobs" />
    </>
  );
}

/** components/hr-screens/CandidatesTab.tsx */
export function HrCandidates() {
  const nav = useNav();
  return (
    <>
      <div className="appbar" style={{ padding: '16px 20px' }}>
        <h1 style={{ textAlign: 'left', fontSize: 20, fontWeight: 800 }}>Candidates</h1>
        <button className="iconbtn">
          <Users size={22} />
        </button>
      </div>
      <div className="scroll pad">
        <SearchBox placeholder="Search name, role, skill..." band={false} />
        <Chips items={['All 50', 'Pending review', 'Shortlisted', 'Interview', 'Offer sent', 'Hired']} selected={['All 50']} scroll />
        <div style={{ height: 16 }} />
        {candidates.map((person) => {
          const tint = stageTint[person.stage] ?? stageTint.Applied;
          return (
            <button key={person.name} className="card" style={{ width: '100%', marginBottom: 12 }} onClick={() => nav.push('hr-candidate')}>
              <span className="row" style={{ gap: 12 }}>
                <Avatar initials={person.initials} color={person.color} size={44} />
                <span style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{person.name}</strong>
                  <span className="muted">{person.role}</span>
                </span>
                <span className="match">
                  <Sparkles size={12} /> {person.match}%
                </span>
              </span>
              <span className="row between" style={{ marginTop: 12 }}>
                <span className="pill" style={{ background: tint.bg, color: tint.color }}>
                  {person.stage}
                </span>
                <ChevronRight size={18} color="var(--muted)" />
              </span>
            </button>
          );
        })}
      </div>
      <HrTabs active="hr-candidates" />
    </>
  );
}

/** components/hr-screens/InterviewsTab.tsx */
export function HrInterviews() {
  const nav = useNav();
  return (
    <>
      <div className="appbar" style={{ padding: '16px 20px' }}>
        <h1 style={{ textAlign: 'left', fontSize: 20, fontWeight: 800 }}>Interviews</h1>
        <button className="iconbtn">
          <Calendar size={22} />
        </button>
      </div>
      <div className="scroll pad">
        <Chips items={['Today 3', 'This week 7', 'Unconfirmed 2', 'Past']} selected={['Today 3']} scroll />
        <p className="label-xs">Monday, 28 September</p>
        {interviews.map((item) => (
          <button key={item.name} className="card" style={{ width: '100%', marginBottom: 12 }} onClick={() => nav.push('hr-candidate')}>
            <span className="row" style={{ gap: 12 }}>
              <span style={{ width: 58, color: '#4432ff', fontSize: 13, fontWeight: 800 }}>{item.time}</span>
              <Avatar initials={item.initials} color={item.color} size={42} />
              <span style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{item.name}</strong>
                <span className="muted">{item.role}</span>
              </span>
            </span>
            <span className="row between" style={{ marginTop: 12 }}>
              <span
                className="pill"
                style={
                  item.status === 'Confirmed'
                    ? { background: '#dcfce7', color: '#16a34a' }
                    : item.status === 'Declined'
                      ? { background: '#fee2e2', color: '#dc2626' }
                      : { background: '#fef3c7', color: '#d97706' }
                }
              >
                {item.status}
              </span>
              <span className="muted">Google Meet · 45 min</span>
            </span>
          </button>
        ))}
        <div className="banner">
          <span className="title">
            <Clock size={18} color="#ca8a04" /> 2 candidates have not confirmed
          </span>
          <p>Send a reminder so the slot does not go empty.</p>
          <span className="more">Send reminder</span>
        </div>
      </div>
      <HrTabs active="hr-interviews" />
    </>
  );
}

/** components/hr-screens/HrMoreTab.tsx */
export function HrMore() {
  return (
    <>
      <div className="scroll pad">
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="row" style={{ gap: 16 }}>
            <Avatar initials="PS" color="#4432ff" size={56} />
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 18, fontWeight: 800 }}>{employer.name}</strong>
              <p className="muted" style={{ margin: '2px 0 0' }}>
                {employer.email} · {employer.designation}
              </p>
              <p style={{ margin: '8px 0 0', color: '#4432ff', fontSize: 14, fontWeight: 700 }}>Add profile photo</p>
            </div>
          </div>
        </div>

        <div className="rows">
          <MenuRow icon={Plus} tint="#f3e8ff" color="#8b5cf6" title="Post a job" sub="Verified, AI-checked listing" to="hr-post-1" />
          <MenuRow icon={ShieldCheck} tint="#e0e7ff" color="#6366f1" title="Company profile" sub="How candidates see you" to="hr-company" />
          <MenuRow icon={Briefcase} tint="#f3e8ff" color="#8b5cf6" title="Active jobs" sub="2 open positions" to="hr-jobs" action="reset" />
          <MenuRow icon={Users} tint="#e0e7ff" color="#6366f1" title="All candidates" sub="50 total" to="hr-candidates" action="reset" />
          <MenuRow icon={Settings} tint="#f3e8ff" color="#8b5cf6" title="Settings" to="hr-settings" />
        </div>

        <div className="rows" style={{ marginTop: 24 }}>
          <MenuRow icon={LogOut} tint="rgba(239,68,68,0.1)" color="#ef4444" title="Logout" danger to="hr-account" action="reset" />
        </div>
      </div>
      <HrTabs active="hr-more" />
    </>
  );
}

/** app/hr-screens/job/[id].tsx */
export function HrJob() {
  const nav = useNav();
  return (
    <>
      <AppBar title="Job" back right={<button className="iconbtn" onClick={() => nav.push('hr-job-details')}><Settings size={20} /></button>} />
      <div className="scroll pad">
        <div className="card">
          <div className="row between">
            <h2 className="h3">{job.title}</h2>
            <span className="status" style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700 }}>
              <i style={{ width: 8, height: 8, borderRadius: 4, background: 'currentColor' }} /> Active
            </span>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>
            {employer.company} · {job.location} · {job.salary}
          </p>
          <div className="minigrid" style={{ marginTop: 14 }}>
            <div>
              <b>42</b>
              <span>Applied</span>
            </div>
            <div>
              <b>9</b>
              <span>Shortlist</span>
            </div>
            <div>
              <b>3</b>
              <span>Interview</span>
            </div>
            <div>
              <b>2</b>
              <span>Offer</span>
            </div>
          </div>
          <div className="two">
            <button className="btn outline" onClick={() => nav.push('hr-job-details')}>
              Edit job
            </button>
            <button className="btn outline" onClick={() => nav.push('hr-pipeline')}>
              Pipeline
            </button>
          </div>
        </div>

        <p className="label-xs">Applicants</p>
        {candidates.slice(0, 3).map((person) => {
          const tint = stageTint[person.stage] ?? stageTint.Applied;
          return (
            <button key={person.name} className="card" style={{ width: '100%', marginBottom: 12 }} onClick={() => nav.push('hr-candidate')}>
              <span className="row" style={{ gap: 12 }}>
                <Avatar initials={person.initials} color={person.color} size={42} />
                <span style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{person.name}</strong>
                  <span className="pill" style={{ background: tint.bg, color: tint.color, marginTop: 4 }}>
                    {person.stage}
                  </span>
                </span>
                <span className="match">
                  <Sparkles size={12} /> {person.match}%
                </span>
              </span>
            </button>
          );
        })}

        <p className="label-xs">Job description</p>
        <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 14, lineHeight: '23px' }}>{job.about}</p>
      </div>
    </>
  );
}

/** app/hr-screens/job-details/[id].tsx */
export function HrJobDetails() {
  return (
    <>
      <AppBar title="Job details" back />
      <Body>
        <Field label="Job title" value={job.title} />
        <Field label="Location" value={job.location} />
        <Field label="Salary range (₹ LPA)" value="3.6 – 4.8" />
        <Field label="Work mode" value={job.mode} />
        <Field label="Application deadline" value={job.deadline} />
        <Field label="Job description" value={job.about} area />
        <div className="rows">
          <SettingRow title="Listing is public" sub="Visible in the candidate feed" right={<Toggle on />} />
          <SettingRow title="Accepting applications" sub="Turn off to pause without deleting" right={<Toggle on />} />
        </div>
        <button className="btn danger sm" style={{ marginTop: 16 }}>
          <Trash2 size={16} /> Close this job
        </button>
      </Body>
      <FootBar>
        <Primary to="hr-job" action="swap">
          Save changes
        </Primary>
      </FootBar>
    </>
  );
}

/** app/hr-screens/candidate/[id].tsx */
export function HrCandidate() {
  return (
    <>
      <AppBar title="Candidate" back />
      <div className="scroll pad">
        <div className="card">
          <div className="row" style={{ gap: 14 }}>
            <Avatar initials="AR" color="#4432ff" size={58} />
            <div style={{ flex: 1 }}>
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 18, fontWeight: 800 }}>Ananya Rao</strong>
                <span className="pill" style={{ background: '#dcfce7', color: '#15803d' }}>
                  <BadgeCheck size={12} /> Verified 78
                </span>
              </div>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                {job.title} · Applied 2 days ago
              </p>
            </div>
          </div>
          <div className="row between" style={{ marginTop: 14 }}>
            <span className="match">
              <Sparkles size={12} /> 92% MATCH
            </span>
            <span className="pill" style={{ background: '#ede9fe', color: '#7c3aed' }}>Shortlisted</span>
          </div>
        </div>

        <p className="label-xs">Move to stage</p>
        <div className="stage-track">
          {pipelineStages.slice(0, 7).map((stage, index) => (
            <div key={stage} className={index <= 2 ? 'on' : ''}>
              {stage}
            </div>
          ))}
        </div>

        <p className="label-xs">Details</p>
        <div className="card">
          <div className="kv">
            <span>Email</span>
            <b>ananya@example.com</b>
          </div>
          <div className="kv">
            <span>Phone</span>
            <b>98490 11223</b>
          </div>
          <div className="kv">
            <span>City</span>
            <b>Hyderabad</b>
          </div>
          <div className="kv">
            <span>Experience</span>
            <b>2 yrs</b>
          </div>
          <div className="kv">
            <span>Notice period</span>
            <b>Immediate</b>
          </div>
          <div className="kv">
            <span>Expected pay</span>
            <b>₹4.2 LPA</b>
          </div>
        </div>

        <p className="label-xs">Why this is a 92% match</p>
        <div className="card">
          {[
            ['Tally Prime', 'Required'],
            ['GST Filing', 'Required'],
            ['Excel Advanced', 'Preferred'],
            ['Hyderabad', 'Location match'],
          ].map(([skill, why]) => (
            <div key={skill} className="kv">
              <span>{why}</span>
              <b style={{ color: '#16a34a' }}>{skill} ✓</b>
            </div>
          ))}
        </div>

        <p className="label-xs">Screening answers</p>
        <div className="card">
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>Years of Tally Prime experience?</p>
          <p style={{ margin: '4px 0 12px', fontSize: 13, color: 'var(--text-2)' }}>2 years</p>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>Can you join within 15 days?</p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-2)' }}>Yes</p>
        </div>

        <p className="label-xs">Documents verified</p>
        <div className="rows">
          <MenuRow icon={ShieldCheck} tint="#dcfce7" color="#16a34a" title="Aadhaar + face match" sub="94% · DigiLocker" />
          <MenuRow icon={ShieldCheck} tint="#dcfce7" color="#16a34a" title="Class 10 and Class 12" sub="Marksheets verified" />
        </div>
      </div>
      <FootBar>
        <div className="two">
          <button className="btn outline">Reject</button>
          <button className="btn">Schedule interview</button>
        </div>
      </FootBar>
    </>
  );
}

/** app/hr-screens/company.tsx */
export function HrCompany() {
  return (
    <>
      <AppBar title="Company profile" back />
      <div className="scroll pad">
        <div className="card">
          <div className="row" style={{ gap: 14 }}>
            <span style={{ width: 56, height: 56, borderRadius: 14, background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, flex: 'none' }}>
              BF
            </span>
            <div style={{ flex: 1 }}>
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 17, fontWeight: 800 }}>{employer.company}</strong>
                <span className="pill" style={{ background: '#dbeafe', color: '#2563eb' }}>
                  <BadgeCheck size={12} /> Verified
                </span>
              </div>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                {employer.industry} · {employer.size}
              </p>
            </div>
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--text-2)', lineHeight: '22px' }}>{employer.about}</p>
        </div>

        <p className="label-xs">Details candidates see</p>
        <div className="card">
          <div className="kv">
            <span>Website</span>
            <b>{employer.website}</b>
          </div>
          <div className="kv">
            <span>Head office</span>
            <b>{employer.city}</b>
          </div>
          <div className="kv">
            <span>CIN</span>
            <b>{employer.cin}</b>
          </div>
          <div className="kv">
            <span>GSTIN</span>
            <b>{employer.gstin}</b>
          </div>
        </div>

        <p className="label-xs">Open roles</p>
        <div className="rows">
          <MenuRow icon={Briefcase} tint="#f3e8ff" color="#8b5cf6" title={job.title} sub={`${job.location} · ${job.salary}`} to="hr-job" />
          <MenuRow icon={Briefcase} tint="#f3e8ff" color="#8b5cf6" title="Accounts Executive" sub="Secunderabad · ₹22,000/mo" to="hr-job" />
        </div>
      </div>
      <FootBar>
        <Primary to="hr-settings-company">Edit company profile</Primary>
      </FootBar>
    </>
  );
}

/** PipelineTab.tsx */
export function HrPipeline() {
  const nav = useNav();
  return (
    <>
      <AppBar title="Pipeline" back />
      <div className="scroll pad">
        <Chips items={[job.title, 'Accounts Executive']} selected={[job.title]} scroll />
        <div style={{ height: 16 }} />
        {pipelineStages.slice(0, 7).map((stage, index) => {
          const tint = stageTint[stage] ?? stageTint.Applied;
          return (
            <div key={stage} className="card" style={{ marginBottom: 12 }}>
              <div className="row between">
                <span className="pill" style={{ background: tint.bg, color: tint.color }}>
                  {stage}
                </span>
                <b style={{ fontSize: 15 }}>{funnelCounts[index]}</b>
              </div>
              {index <= 2 ? (
                <button className="row" style={{ gap: 12, width: '100%', marginTop: 12 }} onClick={() => nav.push('hr-candidate')}>
                  <Avatar initials={candidates[index].initials} color={candidates[index].color} size={36} />
                  <span style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: 14 }}>{candidates[index].name}</strong>
                    <span className="muted">{candidates[index].role}</span>
                  </span>
                  <ChevronRight size={18} color="var(--muted)" />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

/** app/hr-screens/analytics.tsx */
export function HrAnalytics() {
  return (
    <>
      <AppBar title="Analytics" back />
      <div className="scroll pad-20">
        <div className="stats">
          <Stat label="Open jobs" value={2} sub="1 slow" icon={Briefcase} iconBg="#f3e8ff" iconColor="#8b5cf6" />
          <Stat label="Applicants" value={50} sub="↑ 24 this week" subColor="#16a34a" icon={Users} iconBg="#e0f2fe" iconColor="#0284c7" />
          <Stat label="Average match" value="79%" sub="Across all applicants" icon={Sparkles} iconBg="#dcfce7" iconColor="#16a34a" />
          <Stat label="Time to hire" value="18d" sub="Target: 21d" subColor="#16a34a" icon={Clock} iconBg="#fef3c7" iconColor="#d97706" />
        </div>
        <h2 className="h2">Applicants by stage</h2>
        <div className="card" style={{ marginTop: 12 }}>
          {pipelineStages.map((stage, index) => (
            <div key={stage} className="funnel">
              <span>{stage}</span>
              <span className="track">
                <i style={{ width: `${Math.max(3, funnelCounts[index] * 2)}%`, background: funnelColors[index] }} />
              </span>
              <b>{funnelCounts[index]}</b>
            </div>
          ))}
        </div>
        <h2 className="h2" style={{ marginTop: 24 }}>Where candidates come from</h2>
        <div className="card" style={{ marginTop: 12 }}>
          <div className="kv">
            <span>Applywizard feed</span>
            <b>32</b>
          </div>
          <div className="kv">
            <span>Top matches banner</span>
            <b>11</b>
          </div>
          <div className="kv">
            <span>Shared job link</span>
            <b>7</b>
          </div>
        </div>
      </div>
    </>
  );
}

/** app/hr-screens/desktop.tsx */
export function HrDesktop() {
  return (
    <>
      <AppBar title="Open on desktop" back />
      <div className="scroll pad-20">
        <div className="desktop-art">
          <div className="bar" style={{ width: '60%' }} />
          <div className="bar" style={{ width: '85%' }} />
          <div className="bar" style={{ width: '40%' }} />
          <div className="two" style={{ marginTop: 14 }}>
            <div className="bar" style={{ height: 48, borderRadius: 10 }} />
            <div className="bar" style={{ height: 48, borderRadius: 10 }} />
          </div>
        </div>
        <h2 className="h2" style={{ marginTop: 20 }}>Some tools work better on a bigger screen</h2>
        <p className="sub">
          Bulk stage changes, offer letters, CSV exports and side-by-side resume comparison live in the desktop
          workspace.
        </p>
        <div className="card">
          <div className="kv">
            <span>Desktop workspace</span>
            <b>applywizard.ai/hr</b>
          </div>
          <div className="qr" />
          <p className="muted" style={{ textAlign: 'center', marginTop: 12 }}>
            Scan to open this workspace on your computer
          </p>
        </div>
      </div>
      <FootBar>
        <button className="btn ghost">
          <Mail size={18} /> Email me the link
        </button>
      </FootBar>
    </>
  );
}

/** app/hr-screens/settings/index.tsx */
export function HrSettings() {
  return (
    <>
      <AppBar title="Settings" back />
      <Body>
        <div className="rows" style={{ marginTop: 8 }}>
          <MenuRow icon={User} tint="#ede9fe" color="#7c3aed" title="My Profile" sub="Manage your personal information" to="hr-my-profile" />
          <MenuRow icon={Building2} tint="#e0e7ff" color="#6366f1" title="Company" sub="Manage company details and branding" to="hr-settings-company" />
          <MenuRow icon={Bell} tint="#fef3c7" color="#d97706" title="Notifications" sub="Configure email and push notifications" to="hr-settings-notifications" />
          <MenuRow icon={ShieldCheck} tint="#fee2e2" color="#ef4444" title="Privacy & Security" sub="Update your password" to="hr-security" />
          <MenuRow icon={Palette} tint="#ede9fe" color="#7c3aed" title="Appearance" sub="Theme, language and display options" to="hr-appearance" />
          <MenuRow icon={LifeBuoy} tint="#f3e8ff" color="#8b5cf6" title="Help & support" sub="FAQs, contact support and policies" to="hr-help" />
          <MenuRow icon={Share2} tint="#dcfce7" color="#16a34a" title="Refer a HR/Recruiter" sub="Invite colleagues to Applywizard" to="hr-refer" />
        </div>
      </Body>
    </>
  );
}

/** app/hr-screens/settings/my-profile.tsx */
export function HrMyProfile() {
  return (
    <>
      <AppBar title="My Profile" back />
      <Body>
        <div style={{ textAlign: 'center', padding: '14px 0 18px' }}>
          <Avatar initials="PS" color="#4432ff" size={82} />
          <p className="photo-hint" style={{ marginTop: 10 }}>Add profile photo</p>
        </div>
        <Field label="Full name" value={employer.name} />
        <Field label="Designation" value={employer.designation} />
        <Field label="Work email" value={employer.email} />
        <Field label="Phone" value="90000 11223" />
        <Field label="About" value="Hiring for accounts and compliance roles at BrightPath Finance." area />
      </Body>
      <FootBar>
        <Primary to="hr-settings" action="swap">
          Save profile
        </Primary>
      </FootBar>
    </>
  );
}

/** app/hr-screens/settings/company.tsx */
export function HrSettingsCompany() {
  return (
    <>
      <AppBar title="Company" back />
      <Body>
        <div className="banner green">
          <span className="title">
            <BadgeCheck size={18} color="#16a34a" /> Verified business
          </span>
          <p>CIN verified against MCA. GSTIN is pending our team&apos;s review.</p>
        </div>
        <Field label="Company name" value={employer.company} />
        <Field label="Website" value={employer.website} />
        <Field label="Industry" value={employer.industry} />
        <Field label="Company size" value={employer.size} />
        <Field label="Head office" value={employer.city} />
        <Field label="About the company" value={employer.about} area />
      </Body>
      <FootBar>
        <Primary to="hr-settings" action="swap">
          Save company
        </Primary>
      </FootBar>
    </>
  );
}

/** app/hr-screens/settings/notifications.tsx */
export function HrSettingsNotifications() {
  return (
    <>
      <AppBar title="Notifications" back />
      <Body>
        <p className="label-xs">Push</p>
        <div className="rows">
          <SettingRow title="New application" sub="Every time someone applies" right={<Toggle on />} />
          <SettingRow title="High match candidate" sub="80% match and above" right={<Toggle on />} />
          <SettingRow title="Interview confirmations" sub="When a candidate accepts or declines" right={<Toggle on />} />
          <SettingRow title="Job expiring" sub="Two days before the deadline" right={<Toggle />} />
        </div>
        <p className="label-xs">Email</p>
        <div className="rows">
          <SettingRow title="Daily summary" sub="Applicants and stage changes" right={<Toggle on />} />
          <SettingRow title="Weekly hiring report" sub="Funnel and time-to-hire" right={<Toggle />} />
        </div>
        <p className="label-xs">Recent</p>
        <div className="rows">
          <MenuRow icon={Users} tint="#e0e7ff" color="#6366f1" title="Ananya Rao applied" sub={`${job.title} · 2h ago`} to="hr-candidate" />
          <MenuRow icon={Calendar} tint="#dbeafe" color="#2563eb" title="Interview confirmed" sub="Ananya Rao · today 9:00 AM" to="hr-candidate" />
          <MenuRow icon={Clock} tint="#fef3c7" color="#d97706" title="18 applications pending review" sub="Oldest 3 days ago" to="hr-candidates" action="reset" />
        </div>
      </Body>
    </>
  );
}

/** app/hr-screens/settings/security.tsx */
export function HrSecurity() {
  return (
    <>
      <AppBar title="Privacy & Security" back />
      <Body>
        <p className="label-xs">Change password</p>
        <Field label="Current password" value="••••••••••" />
        <Field label="New password" placeholder="Minimum 8 characters" />
        <Field label="Confirm new password" placeholder="Enter password again" />
        <p className="label-xs">Sessions</p>
        <div className="rows">
          <MenuRow icon={ShieldCheck} tint="#dcfce7" color="#16a34a" title="This device" sub="iPhone · Hyderabad · active now" />
          <MenuRow icon={ShieldCheck} tint="#f3f4f6" color="var(--muted-2)" title="Chrome on Windows" sub="Hyderabad · 3 days ago" />
        </div>
        <p className="label-xs">Data</p>
        <div className="card">
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: '20px' }}>
            Candidate data is retained for 12 months after a role closes, then deleted automatically.
          </p>
        </div>
      </Body>
      <FootBar>
        <Primary to="hr-settings" action="swap">
          Update password
        </Primary>
      </FootBar>
    </>
  );
}

/** app/hr-screens/settings/appearance.tsx */
export function HrAppearance() {
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
          <div className="row between" style={{ marginBottom: 12 }}>
            <strong style={{ fontSize: 14 }}>Hiring snapshot</strong>
            <Palette size={16} color="var(--muted)" />
          </div>
          <div className="stats" style={{ marginBottom: 0 }}>
            <div className="stat" style={{ padding: 10 }}>
              <span className="top">
                <span style={{ fontSize: 10 }}>Applicants</span>
              </span>
              <b style={{ fontSize: 20, lineHeight: '24px' }}>50</b>
            </div>
            <div className="stat" style={{ padding: 10 }}>
              <span className="top">
                <span style={{ fontSize: 10 }}>Shortlisted</span>
              </span>
              <b style={{ fontSize: 20, lineHeight: '24px' }}>9</b>
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

/** app/hr-screens/settings/help.tsx */
export function HrHelp() {
  return (
    <>
      <AppBar title="Help & support" back />
      <Body>
        <p className="label-xs">Frequently asked</p>
        <div className="rows">
          <MenuRow icon={BadgeCheck} tint="#dbeafe" color="#2563eb" title="How long does verification take?" />
          <MenuRow icon={Sparkles} tint="#dcfce7" color="#16a34a" title="How is the match percentage calculated?" />
          <MenuRow icon={Users} tint="#ede9fe" color="#7c3aed" title="Can I add another recruiter to this workspace?" />
        </div>
        <p className="label-xs">Contact</p>
        <div className="rows">
          <MenuRow icon={Mail} tint="#e0e7ff" color="#6366f1" title="Email support" sub="employers@applywizard.ai" />
          <MenuRow icon={Monitor} tint="#f3f4f6" color="var(--muted-2)" title="Open desktop workspace" to="hr-desktop" />
        </div>
        <p className="label-xs">Legal</p>
        <div className="rows">
          <MenuRow icon={ShieldCheck} tint="#f3f4f6" color="var(--muted-2)" title="Employer terms" />
          <MenuRow icon={ShieldCheck} tint="#f3f4f6" color="var(--muted-2)" title="Privacy policy" />
        </div>
      </Body>
    </>
  );
}

/** Refer a HR/Recruiter */
export function HrRefer() {
  return (
    <>
      <AppBar title="Refer a recruiter" back />
      <Body>
        <div className="burst indigo" style={{ margin: '8px auto 18px' }}>
          <Share2 size={40} />
        </div>
        <h1 className="display" style={{ textAlign: 'center' }}>Invite a colleague</h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          Share Applywizard with another recruiter. They get verified faster with your referral code.
        </p>
        <div className="card">
          <div className="kv">
            <span>Your code</span>
            <b>PRIYA-BRIGHT</b>
          </div>
          <div className="kv">
            <span>Invites sent</span>
            <b>3</b>
          </div>
          <div className="kv">
            <span>Joined</span>
            <b>1</b>
          </div>
        </div>
        <Field label="Work email" placeholder="colleague@company.com" />
      </Body>
      <FootBar>
        <button className="btn">
          <Send size={18} /> Send invite
        </button>
        <TextLink accent>Copy invite link</TextLink>
      </FootBar>
    </>
  );
}

export { MapPin };
