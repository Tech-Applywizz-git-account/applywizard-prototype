import {
  BadgeCheck,
  Building2,
  Check,
  Clock,
  Eye,
  FileCheck2,
  IdCard,
  Lock,
  MessageSquare,
  Search,
  Star,
  TrendingUp,
  Upload,
  User,
  Users,
} from 'lucide-react';

import { Body, Field, FootBar, Otp, Primary, PlainBar, TextLink } from '../kit';
import { employer, job } from '../data';
import { useNav } from '../nav';

/** create-workspace.tsx — headerProgress: back, 4px track, n/3. */
function HrWizard({ fill, count }: { fill: string; count: string }) {
  const nav = useNav();
  return (
    <div className="hrwiz">
      <button className="iconbtn" onClick={nav.back} aria-label="Back">
        <span style={{ fontSize: 22, lineHeight: 1 }}>‹</span>
      </button>
      <span className="track">
        <i style={{ width: fill }} />
      </span>
      <span className="count">{count}</span>
    </div>
  );
}

/** step 'account' */
export function HrAccount() {
  return (
    <>
      <div className="hrbanner">
        <span className="pattern" />
        <div className="brandrow">
          <img src="/logo.png" alt="" />
          <span className="brand">ApplyWizard</span>
          <span className="badge">FOR EMPLOYERS</span>
        </div>
        <h1>Create your workspace</h1>
        <p>Start hiring in minutes — free to set up</p>
      </div>
      <div className="scroll" style={{ padding: 24 }}>
        <div className="stack-20">
          <div className="stack-8">
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>Full name</span>
            <input className="input-50" defaultValue={employer.name} placeholder="Your name" />
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>Work email</span>
            <input className="input-50" defaultValue={employer.email} placeholder="you@company.com" />
            <span className="muted">Personal addresses like gmail.com are blocked for workspaces.</span>
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>Password</span>
            <input className="input-50" defaultValue="••••••••••" placeholder="Minimum 8 characters" />
          </div>
          <Primary to="hr-otp">Create workspace</Primary>
          <TextLink to="hr-verify-intro">Already have a workspace? Log in</TextLink>
        </div>
      </div>
    </>
  );
}

/** step 'account' — OTP block (app/signup.tsx) */
export function HrOtp() {
  return (
    <>
      <PlainBar title="Verify work email" />
      <Body>
        <h1 className="hr-title" style={{ marginTop: 8 }}>Enter OTP</h1>
        <p className="hr-sub" style={{ marginBottom: 22 }}>
          We sent a 6-digit code to {employer.email}. It expires in 10 minutes.
        </p>
        <Otp />
        <p className="muted" style={{ marginTop: 16 }}>Didn&apos;t get it? Resend in 0:41</p>
      </Body>
      <FootBar>
        <Primary to="hr-verify-intro">Verify and continue</Primary>
      </FootBar>
    </>
  );
}

/** step 'verify_intro' */
export function HrVerifyIntro() {
  return (
    <>
      <HrWizard fill="33%" count="1/3" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 1 · WHY VERIFY</p>
        <h1 className="hr-title">Verify your business</h1>
        <p className="hr-sub" style={{ marginBottom: 24 }}>
          One-time check against official registries. Verified employers get better results on every job.
        </p>
        <div className="stack-16">
          <div className="benefit">
            <span className="ibox">
              <BadgeCheck size={22} color="#4432ff" />
            </span>
            <div>
              <strong>Applicants trust you</strong>
              <p>A blue verified badge sits on every listing you publish.</p>
            </div>
          </div>
          <div className="benefit">
            <span className="ibox">
              <TrendingUp size={22} color="#4432ff" />
            </span>
            <div>
              <strong>Better reach</strong>
              <p>Verified jobs appear in the main candidate feed and are eligible for boosted placement.</p>
            </div>
          </div>
          <div className="benefit">
            <span className="ibox">
              <MessageSquare size={22} color="#4432ff" />
            </span>
            <div>
              <strong>Candidates engage</strong>
              <p>Candidates can message you directly about open roles.</p>
            </div>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-whos-hiring">Start verification</Primary>
        <TextLink to="hr-post-1">Skip for now — post as Unverified</TextLink>
      </FootBar>
    </>
  );
}

/** step 'whos_hiring' */
export function HrWhosHiring() {
  const nav = useNav();
  return (
    <>
      <div className="appbar">
        <div className="slot">
          <button className="iconbtn" onClick={nav.back}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>‹</span>
          </button>
        </div>
        <h1>Verify your business</h1>
        <div className="slot end" />
      </div>
      <div className="scroll" style={{ padding: '20px 24px 24px' }}>
        <h1 className="hr-title">Who&apos;s hiring?</h1>
        <p className="hr-sub" style={{ marginBottom: 24 }}>
          One-time verification. Lets candidates trust every job you post.
        </p>

        <button className="typecard on" onClick={() => nav.push('hr-verify-company')}>
          <span className="ibox">
            <Building2 size={22} />
          </span>
          <span className="body">
            <strong>Registered company</strong>
            <span>Has GSTIN, CIN or company PAN · Pvt Ltd, LLP, MNC</span>
            <em>About 2 minutes</em>
          </span>
        </button>
        <button className="typecard" onClick={() => nav.push('hr-verify-small')}>
          <span className="ibox">
            <Users size={22} />
          </span>
          <span className="body">
            <strong>Small / informal business</strong>
            <span>Local shop, small firm, coaching centre · Udyam or office photo</span>
            <em>About 3 minutes</em>
          </span>
        </button>
        <button className="typecard" onClick={() => nav.push('hr-verify-individual')}>
          <span className="ibox">
            <User size={22} />
          </span>
          <span className="body">
            <strong>Just me (individual)</strong>
            <span>Hiring help for personal / founder work · uses your own identity</span>
            <em>About 2 minutes</em>
          </span>
        </button>

        <p className="skipbanner">
          <b>Skip verification?</b> Jobs still go live, but with a red &quot;Unverified employer&quot; banner that
          every applicant sees.
        </p>
      </div>
      <FootBar>
        <Primary to="hr-verify-company">Continue</Primary>
      </FootBar>
    </>
  );
}

/** step 'verify_company' */
export function HrVerifyCompany() {
  return (
    <>
      <HrWizard fill="66%" count="2/3" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 2 · VERIFY COMPANY</p>
        <h1 className="hr-title">Verify your company</h1>
        <p className="hr-sub">
          Pick what you have — submit any one identifier for our team to verify against the official registry.
        </p>

        <div className="segcard">
          <div className="top">
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d97706', fontWeight: 800 }}>
              <Clock size={14} /> Verification pending
            </span>
            <span>2/3</span>
          </div>
          <div className="bars">
            <i className="on" />
            <i className="on" />
            <i />
          </div>
        </div>

        <div className="stack-16" style={{ marginTop: 16 }}>
          <div className="verifycard pending">
            <div className="head">
              <span className="ibox">
                <FileCheck2 size={17} />
              </span>
              <span style={{ flex: 1 }}>
                <strong>GSTIN</strong>
                <span>Goods & Services Tax</span>
              </span>
              <span className="pill" style={{ background: '#fef3c7', color: '#92400e' }}>Submitted</span>
            </div>
            <input className="input-50" defaultValue={employer.gstin} placeholder="36AAFCA1234K1ZP" />
            <span className="muted">Our team will verify this against the GST Portal.</span>
          </div>

          <div className="verifycard ok">
            <div className="head">
              <span className="ibox">
                <Search size={17} />
              </span>
              <span style={{ flex: 1 }}>
                <strong>CIN</strong>
                <span>Corporate Identity Number</span>
              </span>
              <span className="pill" style={{ background: '#dcfce7', color: '#166534' }}>Verified</span>
            </div>
            <input className="input-50" defaultValue={employer.cin} placeholder="U72900TS2019PTC012345" />
            <div style={{ fontSize: 13, color: '#14532d' }}>
              <p style={{ margin: '0 0 4px' }}>
                <b>Company name:</b> {employer.company}
              </p>
              <p style={{ margin: '0 0 4px' }}>
                <b>Status:</b> Active
              </p>
              <p style={{ margin: 0 }}>
                <b>Incorporation:</b> 2019
              </p>
            </div>
            <span className="muted">Checked live against MCA</span>
          </div>

          <div className="verifycard">
            <div className="head">
              <span className="ibox">
                <IdCard size={17} />
              </span>
              <span style={{ flex: 1 }}>
                <strong>Company PAN</strong>
                <span>Income Tax Dept</span>
              </span>
            </div>
            <input className="input-50" placeholder="AAFCA1234K" />
            <button className="btn thin">Submit for review</button>
            <span className="muted">Our team will verify this against Income Tax records.</span>
          </div>
        </div>

        <p className="muted" style={{ marginTop: 16 }}>
          <b style={{ color: '#111827' }}>Submit at least one</b> — we recommend it. Verified employers get stronger
          trust signals and better ranking after review.
        </p>
      </div>
      <FootBar>
        <Primary to="hr-verified">Continue</Primary>
        <TextLink to="hr-post-1">I&apos;ll verify later — post as Unverified</TextLink>
      </FootBar>
    </>
  );
}

/** step 'verify_small' */
export function HrVerifySmall() {
  return (
    <>
      <HrWizard fill="66%" count="2/3" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 2 · VERIFY BUSINESS</p>
        <h1 className="hr-title">Verify your business</h1>
        <p className="hr-sub">
          Enter your Udyam number or upload proof — our team will review before marking you verified.
        </p>

        <div className="stack-16" style={{ marginTop: 20 }}>
          <div className="verifycard">
            <strong style={{ fontSize: 14, color: '#111827' }}>Udyam (MSME) registration no.</strong>
            <input className="input-50" defaultValue="UDYAM-TS-09-0001234" placeholder="UDYAM-TS-09-0001234" />
            <span style={{ fontSize: 13, color: '#9ca3af' }}>
              Submitted for review against the <b style={{ color: '#111827' }}>Udyam / MSME registry</b>
            </span>
          </div>

          <div className="verifycard pending">
            <div className="head">
              <Clock size={26} color="#d97706" />
              <span style={{ flex: 1 }}>
                <strong style={{ color: '#92400e', fontSize: 16 }}>Udyam submitted</strong>
                <span style={{ color: '#78350f' }}>Our team will verify this against the MSME registry.</span>
              </span>
            </div>
          </div>

          <div className="verifycard">
            <div className="head">
              <span className="ibox">
                <Upload size={17} />
              </span>
              <span style={{ flex: 1 }}>
                <strong>Business proof</strong>
                <span>Shop photo, rent agreement or utility bill</span>
              </span>
            </div>
            <div className="two">
              <button className="btn thin" style={{ color: '#374151', borderColor: '#e5e7eb' }}>
                Change Document
              </button>
              <button className="btn thin" style={{ color: '#166534', borderColor: '#bbf7d0' }}>
                View Document
              </button>
            </div>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-verified">Continue →</Primary>
      </FootBar>
    </>
  );
}

/** step 'verify_individual' */
export function HrVerifyIndividual() {
  const nav = useNav();
  return (
    <>
      <HrWizard fill="66%" count="2/3" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 2 · VERIFY IDENTITY</p>
        <h1 className="hr-title">Verify it&apos;s really you</h1>
        <p className="hr-sub" style={{ marginBottom: 24 }}>
          Individual hirers verify with their own government identity. This is required to post.
        </p>

        <button
          className="typecard on"
          style={{ borderColor: '#ea580c', background: '#fff7ed', alignItems: 'flex-start' }}
          onClick={() => nav.push('hr-digilocker-auth')}
        >
          <span className="body">
            <strong style={{ fontSize: 20, color: '#7c2d12', marginBottom: 8 }}>DigiLocker</strong>
            <span style={{ color: '#9a3412' }}>Instant Aadhaar and PAN fetch with your consent.</span>
            <em style={{ color: '#9a3412', fontWeight: 500 }}>Govt-issued</em>
          </span>
          <span className="ibox" style={{ background: '#ea580c', color: '#fff' }}>
            <IdCard size={22} />
          </span>
        </button>

        <button className="typecard" style={{ alignItems: 'flex-start' }}>
          <span className="body">
            <strong style={{ fontSize: 18, marginBottom: 4 }}>Upload PAN or Aadhaar</strong>
            <span>Manual ops review · 1–2 working days</span>
          </span>
          <span className="ibox">
            <Upload size={22} />
          </span>
        </button>
      </div>
      <FootBar>
        <Primary to="hr-digilocker-auth">Continue to DigiLocker →</Primary>
        <TextLink to="hr-individual-success">Submit for review →</TextLink>
      </FootBar>
    </>
  );
}

/** step 'digilocker_auth' */
export function HrDigilockerAuth() {
  return (
    <>
      <div className="digibar">
        <span className="mark">
          <Lock size={16} />
        </span>
        DigiLocker
      </div>
      <div className="scroll" style={{ padding: 24 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800 }}>ApplyWizard wants access to:</h1>
        <p style={{ margin: '0 0 24px', fontSize: 16, color: '#374151', lineHeight: '24px' }}>
          You can revoke any time from your DigiLocker account.
        </p>
        <div className="stack-16">
          <div className="verifycard">
            <div className="head">
              <span className="ibox" style={{ background: '#ffedd5' }}>
                <IdCard size={17} color="#ea580c" />
              </span>
              <span style={{ flex: 1 }}>
                <strong>Aadhaar Card</strong>
                <span>UIDAI</span>
              </span>
              <span className="checkbox on">
                <Check size={13} strokeWidth={3} />
              </span>
            </div>
          </div>
          <div className="verifycard">
            <div className="head">
              <span className="ibox" style={{ background: '#ffedd5' }}>
                <FileCheck2 size={17} color="#ea580c" />
              </span>
              <span style={{ flex: 1 }}>
                <strong>PAN</strong>
                <span>Income Tax Dept</span>
              </span>
              <span className="checkbox on">
                <Check size={13} strokeWidth={3} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-digilocker-loading">Submit for review</Primary>
      </FootBar>
    </>
  );
}

/** step 'digilocker_loading' */
export function HrDigilockerLoading() {
  return (
    <>
      <div className="digibar">
        <span className="mark">
          <Lock size={16} />
        </span>
        DigiLocker
      </div>
      <div className="center-screen">
        <span className="spinner" />
        <h1 style={{ margin: '22px 0 8px', fontSize: 20, fontWeight: 700 }}>Pulling from DigiLocker...</h1>
        <p style={{ margin: 0, fontSize: 14, color: '#9ca3af' }}>This usually takes 15-30 seconds.</p>
      </div>
      <FootBar>
        <Primary to="hr-individual-success">Continue</Primary>
      </FootBar>
    </>
  );
}

/** step 'verify_individual_success' */
export function HrIndividualSuccess() {
  return (
    <>
      <HrWizard fill="66%" count="2/3" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 2 · VERIFY IDENTITY</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            border: '1px solid #f59e0b',
            borderRadius: 16,
            background: '#fffbeb',
            padding: 16,
            margin: '16px 0 24px',
          }}
        >
          <Clock size={28} color="#d97706" />
          <div>
            <strong style={{ fontSize: 16, fontWeight: 800, color: '#92400e' }}>Identity submitted for review</strong>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: '#78350f' }}>
              Our team will verify your DigiLocker documents.
            </p>
          </div>
        </div>

        <div className="stack-16">
          <div className="verifycard">
            <div className="head">
              <span className="ibox" style={{ background: '#ffedd5' }}>
                <IdCard size={17} color="#ea580c" />
              </span>
              <span style={{ flex: 1 }}>
                <strong>Aadhaar</strong>
                <span>UIDAI · pending review</span>
              </span>
            </div>
          </div>
          <div className="verifycard">
            <div className="head">
              <span className="ibox" style={{ background: '#ffedd5' }}>
                <FileCheck2 size={17} color="#ea580c" />
              </span>
              <span style={{ flex: 1 }}>
                <strong>PAN</strong>
                <span>Income Tax Dept · pending review</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-verified">Continue →</Primary>
      </FootBar>
    </>
  );
}

/** step 'verified' */
export function HrVerified() {
  return (
    <>
      <HrWizard fill="100%" count="3/3" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <div className="burst amber" style={{ margin: '4px auto 18px' }}>
          <Clock size={40} />
        </div>
        <h1 className="hr-title" style={{ textAlign: 'center' }}>Submitted for review</h1>
        <p className="hr-sub" style={{ textAlign: 'center', marginBottom: 20 }}>
          You can post jobs right away. The verified badge appears once our team confirms your documents.
        </p>

        <div className="card">
          <p className="label-xs" style={{ marginTop: 0 }}>What you submitted</p>
          <div className="scoreitem">
            <span className="checkbox on">
              <Check size={13} strokeWidth={3} />
            </span>
            <span>
              <b>GSTIN</b> · {employer.gstin}
            </span>
          </div>
          <div className="scoreitem">
            <span className="checkbox on">
              <Check size={13} strokeWidth={3} />
            </span>
            <span>
              <b>CIN</b> · {employer.cin}
            </span>
          </div>
          <div className="scoreitem">
            <span className="checkbox on">
              <Check size={13} strokeWidth={3} />
            </span>
            <span>
              <b>DigiLocker</b> · Aadhaar + PAN
            </span>
          </div>
        </div>

        <p className="label-xs">What verification unlocks</p>
        <div className="card">
          <div className="unlock off">
            <BadgeCheck size={16} color="#9ca3af" /> Blue &quot;Verified Business&quot; badge on every listing
          </div>
          <div className="unlock off">
            <Eye size={16} color="#9ca3af" /> Appears in the main candidate feed
          </div>
          <div className="unlock off">
            <TrendingUp size={16} color="#9ca3af" /> Eligible for boosted placement
          </div>
          <div className="unlock">
            <MessageSquare size={16} color="#16a34a" /> Candidates can message you about roles
          </div>
          <div className="unlock off">
            <Star size={16} color="#9ca3af" /> Public company ratings from past hires
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-post-1">Post my first job →</Primary>
      </FootBar>
    </>
  );
}

/** step 'post_job_1' */
export function HrPost1() {
  return (
    <>
      <HrWizard fill="25%" count="1/4" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 1 OF 4 · THE ROLE</p>
        <h1 className="hr-title">Post a job</h1>
        <p className="hr-sub" style={{ marginBottom: 22 }}>
          Applywizard checks every listing for scam patterns before it goes live.
        </p>
        <div className="stack-20">
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Job title</span>
            <input className="input-50" defaultValue={job.title} placeholder="e.g. Senior Frontend Engineer" />
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Department</span>
            <input className="input-50" defaultValue="Finance" placeholder="Select..." />
          </div>
          <div className="two">
            <div className="stack-8">
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Employment type</span>
              <input className="input-50" defaultValue="Full-time" placeholder="Select..." />
            </div>
            <div className="stack-8">
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Experience</span>
              <input className="input-50" defaultValue="0-1 yrs" placeholder="Select..." />
            </div>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-post-2">Continue → Details</Primary>
        <TextLink to="hr-home" accent action="reset">
          Skip for now
        </TextLink>
      </FootBar>
    </>
  );
}

/** step 'post_job_2' */
export function HrPost2() {
  return (
    <>
      <HrWizard fill="50%" count="2/4" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 2 OF 4 · DETAILS</p>
        <h1 className="hr-title">Describe the work</h1>
        <div className="stack-20" style={{ marginTop: 20 }}>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Job description</span>
            <textarea
              className="input area"
              defaultValue={job.about}
              placeholder="Describe the role and responsibilities..."
            />
            <span className="muted">Be specific — vague listings get flagged as scams.</span>
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Requirements</span>
            {job.requirements.slice(0, 3).map((line) => (
              <input key={line} className="input-50" defaultValue={line} placeholder="e.g. 4+ yrs React in production" />
            ))}
            <button className="btn thin">+ Add requirement</button>
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Skills</span>
            <div className="chips">
              {['Tally Prime', 'GST Filing', 'Excel'].map((skill) => (
                <span key={skill} className="chip on">
                  {skill}
                </span>
              ))}
            </div>
            <input className="input-50" placeholder="e.g. TypeScript" />
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-post-3">Continue → Pay &amp; Location</Primary>
      </FootBar>
    </>
  );
}

/** step 'post_job_3' */
export function HrPost3() {
  return (
    <>
      <HrWizard fill="75%" count="3/4" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 3 OF 4 · PAY &amp; LOCATION</p>
        <h1 className="hr-title">Pay and place</h1>
        <div className="stack-20" style={{ marginTop: 20 }}>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Salary range (₹ LPA)</span>
            <div className="row" style={{ gap: 12 }}>
              <input className="input-50" style={{ width: '45%' }} defaultValue="3.6" placeholder="Min" />
              <span className="muted">to</span>
              <input className="input-50" style={{ width: '45%' }} defaultValue="4.8" placeholder="Max" />
            </div>
            <div
              style={{
                border: '1px solid #bbf7d0',
                background: '#f0fdf4',
                borderRadius: 12,
                padding: 12,
                color: '#065f46',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Matches market for Finance (₹3–5 LPA).
            </div>
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Location</span>
            <input className="input-50" defaultValue={job.location} placeholder="City" />
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Work mode</span>
            <div className="chips">
              {['On-site', 'Hybrid', 'Remote'].map((mode) => (
                <span key={mode} className={mode === 'On-site' ? 'chip on' : 'chip'}>
                  {mode}
                </span>
              ))}
            </div>
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Application deadline</span>
            <input className="input-50" defaultValue={job.deadline} placeholder="dd-mm-yyyy" />
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-post-4">Continue → Hiring setup</Primary>
      </FootBar>
    </>
  );
}

/** step 'post_job_4' */
export function HrPost4() {
  return (
    <>
      <HrWizard fill="100%" count="4/4" />
      <div className="scroll" style={{ padding: '0 24px 24px' }}>
        <p className="hr-eyebrow">STEP 4 OF 4 · HIRING SETUP</p>
        <h1 className="hr-title">Hiring setup</h1>
        <div className="stack-20" style={{ marginTop: 20 }}>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Hiring manager</span>
            <input className="input-50" defaultValue={employer.name} placeholder="e.g. John Doe" />
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Interview pipeline</span>
            <div className="chips">
              {['Applied', 'Under review', 'Shortlisted', 'Interview', 'Offer sent', 'Hired'].map((stage) => (
                <span key={stage} className="chip on">
                  {stage}
                </span>
              ))}
            </div>
            <span className="muted">These become the stages on this job&apos;s pipeline board.</span>
          </div>
          <div className="stack-8">
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Screening questions</span>
            <input className="input-50" defaultValue="How many years of Tally Prime experience do you have?" placeholder="Type your screening question" />
            <input className="input-50" defaultValue="Can you join within 15 days?" placeholder="Type your screening question" />
            <button className="btn thin">+ Add question</button>
            <span className="muted">Filter applicants before they reach your pipeline. Optional.</span>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="hr-home" action="reset">
          Publish Job →
        </Primary>
      </FootBar>
    </>
  );
}

export { Field };
