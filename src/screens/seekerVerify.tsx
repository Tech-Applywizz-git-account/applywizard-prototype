import { Award, Check, FileText, IdCard, PartyPopper, ShieldCheck, Upload } from 'lucide-react';

import {
  Body,
  Choice,
  Chips,
  Field,
  FootBar,
  Primary,
  PlainBar,
  TextLink,
} from '../kit';
import { VerifyStep } from './seekerAuth';
import { educationLevels, seeker, suggestedSkills, trustBreakdown, verificationSteps } from '../data';
import { useNav } from '../nav';

const stepRoute: Record<string, string> = {
  basic: 'js-verify-basic',
  education: 'js-verify-education',
  resume: 'js-verify-resume',
  skills: 'js-verify-skills',
  documents: 'js-verify-documents',
  review: 'js-verify-review',
};

/** app/verification/hub.tsx */
export function VerifyHub() {
  const nav = useNav();
  return (
    <>
      <div className="scroll" style={{ padding: '24px 20px 16px' }}>
        <div className="hero-icon">
          <ShieldCheck size={34} color="#4432ff" />
        </div>
        <h1 className="display" style={{ textAlign: 'center' }}>
          Verify Your Profile
        </h1>
        <p className="lede" style={{ textAlign: 'center', marginBottom: 22 }}>
          Get verified to build instant trust, stand out to top employers, and unlock applications.
        </p>

        <div className="progcard">
          <div className="top">
            <span>VERIFICATION PROGRESS</span>
            <b>0% Complete</b>
          </div>
          <div className="progtrack">
            <i style={{ width: '0%' }} />
          </div>
        </div>

        <div className="steps">
          {verificationSteps.map((step, index) => (
            <button
              key={step.key}
              className={index === 0 ? 'step active' : 'step'}
              onClick={() => nav.push(stepRoute[step.key])}
            >
              <span className="badge">{index + 1}</span>
              <span className="body">
                <strong>{step.title}</strong>
                <span>{step.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <FootBar>
        <Primary to="js-verify-basic">Start Verification</Primary>
        <TextLink to="js-jobs" action="reset">
          Skip
        </TextLink>
        <p className="footnote">Takes ~2 minutes • You can verify anytime from your profile</p>
      </FootBar>
    </>
  );
}

/** app/verification/dashboard.tsx */
export function VerifyDashboard() {
  const nav = useNav();
  return (
    <>
      <PlainBar title="Verification" />
      <Body>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="ring" style={{ ['--pct' as string]: 34 }}>
            <div className="inner">
              <b>34</b>
              <span>TRUST SCORE</span>
            </div>
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 14, color: '#374151', lineHeight: '21px' }}>
            Reach 70+ to earn the verified badge. Finish the remaining steps to add up to 44 points.
          </p>
        </div>

        <p className="label-xs">Your steps</p>
        <div className="steps">
          {verificationSteps.map((step, index) => {
            const done = index < 2;
            return (
              <button key={step.key} className={index === 2 ? 'step active' : 'step'} onClick={() => nav.push(stepRoute[step.key])}>
                <span className={done ? 'badge done' : 'badge'}>
                  {done ? <Check size={14} strokeWidth={3} /> : index + 1}
                </span>
                <span className="body">
                  <strong>{step.title}</strong>
                  <span>{step.subtitle}</span>
                </span>
                {done ? <span className="done-pill">Done</span> : null}
              </button>
            );
          })}
        </div>
      </Body>
      <FootBar>
        <Primary to="js-verify-resume">Continue verification</Primary>
      </FootBar>
    </>
  );
}

/** app/verification/basic-details.tsx */
export function VerifyBasic() {
  return (
    <VerifyStep
      step={1}
      eyebrow="STEP 1 OF 6"
      title="Basic Details"
      description="This is what employers see first. Keep it exactly as it appears on your ID."
      next="js-verify-education"
    >
      <Field label="Full name" value={seeker.name} placeholder="Your name" />
      <Field label="Current city" value={seeker.city} placeholder="City you live in" />
      <Field label="Date of birth" value={seeker.dob} placeholder="dd-mm-yyyy" />
      <Field label="Gender (optional)" value={seeker.gender} placeholder="Select gender" />
    </VerifyStep>
  );
}

/** app/verification/education.tsx */
export function VerifyEducation() {
  return (
    <VerifyStep
      step={2}
      eyebrow="STEP 2 OF 6"
      title="Highest qualification"
      description="Pick the highest level you have started or finished."
      next="js-verify-education-status"
    >
      <div className="steps">
        {educationLevels.map((level) => (
          <Choice
            key={level.id}
            title={level.title}
            sub={level.subtitle}
            on={level.title === seeker.education}
            to="js-verify-education-status"
          />
        ))}
      </div>
    </VerifyStep>
  );
}

/** app/verification/education-status.tsx */
export function VerifyEducationStatus() {
  return (
    <VerifyStep
      step={2}
      eyebrow="STEP 2 OF 6"
      title="Have you finished it?"
      description="M.Com — tell us where you are so we ask for the right document."
      next="js-verify-resume"
    >
      <div className="steps">
        <Choice title="Completed" sub="I have the final marksheet or certificate" on to="js-verify-resume" />
        <Choice title="Pursuing" sub="Still studying — we will ask for enrollment proof" to="js-verify-resume" />
      </div>
      <p className="label-xs">Institution details</p>
      <Field label="Institution" value="Osmania University" placeholder="College or school name" />
      <Field label="Year of passing" value="2024" placeholder="YYYY" />
    </VerifyStep>
  );
}

/** app/verification/resume.tsx */
export function VerifyResume() {
  return (
    <VerifyStep
      step={3}
      eyebrow="STEP 3 OF 6"
      title="Resume"
      description="Already on your profile. Replace it any time."
      next="js-verify-skills"
    >
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
        <button className="btn ghost sm">Replace</button>
        <button className="btn ghost sm">Preview</button>
      </div>
      <div className="banner indigo">
        <span className="title">
          <Upload size={18} color="#4432ff" /> Build a resume instead
        </span>
        <p>No file handy? We can generate one from your profile in about a minute.</p>
      </div>
    </VerifyStep>
  );
}

/** app/verification/skills.tsx */
export function VerifySkills() {
  return (
    <VerifyStep
      step={4}
      eyebrow="STEP 4 OF 6"
      title="Skills Profile"
      description="Add at least 3 skills for +5 trust score. 6 selected."
      next="js-verify-documents"
    >
      <Field label="Add a skill" placeholder="Type a skill and press enter" />
      <p className="label-xs">Your skills</p>
      <Chips items={seeker.skills} selected={seeker.skills} />
      <p className="label-xs">Suggested</p>
      <Chips items={suggestedSkills} selected={seeker.skills} />
    </VerifyStep>
  );
}

/** app/verification/documents.tsx */
export function VerifyDocuments() {
  const nav = useNav();
  return (
    <>
      <VerifyStep
        step={5}
        eyebrow="STEP 5 OF 6"
        title="Documents (Optional)"
        description="Identity adds 30 points. Education documents add up to 10 each."
        next="js-verify-review"
        skip="js-verify-review"
      >
        <p className="label-xs">Identity</p>
        <button className="choice" onClick={() => nav.push('js-digilocker')}>
          <span className="ibox" style={{ background: '#ffedd5' }}>
            <IdCard size={20} color="#ea580c" />
          </span>
          <span className="body">
            <strong>Fetch from DigiLocker</strong>
            <span>Aadhaar + PAN · government issued · fastest</span>
          </span>
        </button>
        <div style={{ height: 10 }} />
        <Choice title="Upload Aadhaar or PAN" sub="Manual ops review · 1–2 working days" />

        <p className="label-xs">Education</p>
        <div className="steps">
          <Choice title="Class 10 marksheet" sub="SSC / Matric / CBSE / ICSE / State Board" on />
          <Choice title="Class 12 marksheet" sub="Intermediate / HSC / PUC" on />
          <Choice title="Degree certificate" sub="Bachelor's degree or provisional certificate" />
          <Choice title="Master's certificate" sub="Master's degree certificate" />
        </div>
      </VerifyStep>
    </>
  );
}

/** app/verification/digilocker/complete.tsx */
export function SeekerDigilocker() {
  return (
    <>
      <div className="digibar">
        <span className="mark">
          <ShieldCheck size={18} />
        </span>
        DigiLocker
      </div>
      <div className="center-screen">
        <div className="burst">
          <Check size={44} strokeWidth={3} />
        </div>
        <h1 className="display">Identity document received</h1>
        <p className="lede">
          Aadhaar and PAN were fetched from DigiLocker. Face match scored 94%, so 30 points are added to your trust
          score.
        </p>
        <div className="card" style={{ width: '100%', textAlign: 'left' }}>
          <div className="kv">
            <span>Aadhaar</span>
            <b>XXXX XXXX 4417</b>
          </div>
          <div className="kv">
            <span>PAN</span>
            <b>ABCDE1234F</b>
          </div>
          <div className="kv">
            <span>Face match</span>
            <b style={{ color: '#16a34a' }}>94%</b>
          </div>
        </div>
      </div>
      <FootBar>
        <Primary to="js-verify-review">Continue</Primary>
      </FootBar>
    </>
  );
}

/** app/verification/review.tsx */
export function VerifyReview() {
  return (
    <VerifyStep
      step={6}
      eyebrow="STEP 6 OF 6"
      title="Final Review"
      description="Check everything, then submit to get your trust score."
      next="js-trust-score"
      cta="Submit for trust score"
    >
      <div className="card">
        <div className="kv">
          <span>Name</span>
          <b>{seeker.name}</b>
        </div>
        <div className="kv">
          <span>City</span>
          <b>{seeker.city}</b>
        </div>
        <div className="kv">
          <span>Date of birth</span>
          <b>{seeker.dob}</b>
        </div>
        <div className="kv">
          <span>Education</span>
          <b>{seeker.education} · Osmania University</b>
        </div>
        <div className="kv">
          <span>Resume</span>
          <b>{seeker.resumeFile}</b>
        </div>
        <div className="kv">
          <span>Skills</span>
          <b>{seeker.skills.length} added</b>
        </div>
        <div className="kv">
          <span>Documents</span>
          <b>Aadhaar, PAN, Class 10, Class 12</b>
        </div>
      </div>
      <div className="banner green">
        <span className="title">
          <ShieldCheck size={18} color="#16a34a" /> Ready to submit
        </span>
        <p>Employers see your trust score and verified badge on every application you send.</p>
      </div>
    </VerifyStep>
  );
}

/** app/verification/trust-score.tsx */
export function TrustScore() {
  return (
    <>
      <PlainBar title="Trust score" />
      <Body>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="ring" style={{ ['--pct' as string]: seeker.trustScore }}>
            <div className="inner">
              <b>{seeker.trustScore}</b>
              <span>TRUST SCORE</span>
            </div>
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 14, color: '#374151' }}>
            Verified badge earned. You are ahead of 82% of applicants in Hyderabad.
          </p>
        </div>
        <p className="label-xs">How you earned it</p>
        <div className="card">
          {trustBreakdown.map((item) => (
            <div key={item.label} className="scoreitem">
              <span className="checkbox on">
                <Check size={13} strokeWidth={3} />
              </span>
              {item.label}
              <b>+{item.points}</b>
            </div>
          ))}
        </div>
      </Body>
      <FootBar>
        <Primary to="js-milestone">Continue</Primary>
      </FootBar>
    </>
  );
}

/** app/verification/milestone.tsx */
export function Milestone() {
  return (
    <>
      <div className="center-screen">
        <div className="burst indigo">
          <Award size={44} />
        </div>
        <h1 className="display">You crossed 70</h1>
        <p className="lede">
          Your verified badge is now active. Verified candidates get replies about 3x more often on Applywizard.
        </p>
        <div className="card" style={{ width: '100%' }}>
          <div className="progcard" style={{ border: 0, padding: 0, margin: 0 }}>
            <div className="top">
              <span>NEXT MILESTONE</span>
              <b>78 / 90</b>
            </div>
            <div className="progtrack">
              <i style={{ width: '78%' }} />
            </div>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            Add your degree certificate to reach 90 and unlock priority ranking.
          </p>
        </div>
      </div>
      <FootBar>
        <Primary to="js-all-set">Continue</Primary>
      </FootBar>
    </>
  );
}

/** app/verification/all-set.tsx */
export function AllSet() {
  return (
    <>
      <div className="center-screen">
        <div className="burst">
          <PartyPopper size={44} />
        </div>
        <h1 className="display">You&apos;re all set</h1>
        <p className="lede">
          Your profile is verified and ready. Start applying — most employers reply within 4 days.
        </p>
      </div>
      <FootBar>
        <Primary to="js-jobs" action="reset">
          Start browsing jobs
        </Primary>
      </FootBar>
    </>
  );
}
