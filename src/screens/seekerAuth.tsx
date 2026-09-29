import { Eye, Mail, ShieldCheck, Sparkles, Upload, X } from 'lucide-react';

import {
  Body,
  Choice,
  Chips,
  Field,
  FootBar,
  Ghost,
  Otp,
  Primary,
  PlainBar,
  TextLink,
  WizardBar,
} from '../kit';
import { filterCategories, seeker } from '../data';
import { useNav } from '../nav';

function GoogleMark() {
  return (
    <svg height={20} width={20} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        fill="#FFC107"
      />
      <path
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        fill="#FF3D00"
      />
      <path
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        fill="#4CAF50"
      />
      <path
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        fill="#1976D2"
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg height={18} width={18} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M16.36 12.78c.02 2.6 2.28 3.46 2.3 3.47-.02.06-.36 1.24-1.19 2.45-.72 1.05-1.47 2.1-2.65 2.12-1.16.02-1.53-.69-2.85-.69-1.32 0-1.73.67-2.83.71-1.14.04-2-1.11-2.72-2.16-1.57-2.27-2.77-6.42-1.16-9.23.8-1.4 2.23-2.28 3.78-2.3 1.12-.02 2.18.75 2.85.75.68 0 1.96-.93 3.31-.79.56.02 2.14.2 3.16 1.53-.08.05-1.88 1.1-1.86 3.14zM14.2 4.6c.6-.73 1-1.74.89-2.75-.87.04-1.92.58-2.54 1.3-.56.65-1.03 1.68-.9 2.67.97.08 1.95-.49 2.55-1.22z" />
    </svg>
  );
}

/** app/index.tsx — the login screen. */
export function Login() {
  const nav = useNav();
  return (
    <div className="scroll" style={{ padding: '20px 24px 24px' }}>
      <img src="/logo.png" alt="Applywizard" style={{ width: 64, height: 64, borderRadius: 16, marginBottom: 16 }} />
      <h1 className="display lg">Welcome back</h1>
      <p style={{ margin: '6px 0 20px', color: '#6b7280', fontSize: 15, lineHeight: '22px' }}>
        Log in to your Applywizard account.
      </p>

      <Field label="Email" value={seeker.email} placeholder="Enter your email" />
      <Field
        label="Password"
        value="••••••••••"
        placeholder="Enter your password"
        right={
          <span className="eye">
            <Eye size={20} strokeWidth={2.2} />
          </span>
        }
      />

      <button className="link-right" onClick={() => nav.push('js-forgot')}>
        Forgot password?
      </button>

      <Primary to="js-jobs" action="reset">
        Log in
      </Primary>

      <div className="divider-or">
        <i />
        <span>or continue with</span>
        <i />
      </div>

      <div className="gap" style={{ gap: 10 }}>
        <button className="btn dark" type="button" onClick={() => nav.reset('js-jobs')}>
          <AppleMark /> Sign in with Apple
        </button>
        <button className="btn ghost" type="button" onClick={() => nav.reset('js-jobs')}>
          <GoogleMark /> Google
        </button>
      </div>

      <div className="login-foot">
        <button className="guest" onClick={() => nav.reset('js-guest-jobs')}>
          Browse jobs as a guest
        </button>
        <p>
          New to Applywizard?{' '}
          <button onClick={() => nav.push('js-signup-method')}>Create account</button>
        </p>
        <p>
          Looking to hire? <a href="/employer">Create workspace</a>
        </p>
      </div>
    </div>
  );
}

/** app/forgot-password.tsx */
export function Forgot() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">Reset your password</h1>
        <p className="lede">Enter the email you signed up with. We&apos;ll send a 6-digit code to reset your password.</p>
        <Field label="Email address" value={seeker.email} placeholder="john@gmail.com" />
      </Body>
      <FootBar>
        <Primary to="js-signup-otp">Send reset code</Primary>
        <TextLink action="back">Back to log in</TextLink>
      </FootBar>
    </>
  );
}

/** app/reactivate-account.tsx */
export function Reactivate() {
  return (
    <>
      <PlainBar />
      <Body>
        <div className="burst amber">
          <ShieldCheck size={40} />
        </div>
        <h1 className="display">Welcome back — reactivate your account</h1>
        <p className="lede">
          This account was deactivated. Reactivating restores your profile, applications and saved jobs exactly as
          they were.
        </p>
        <div className="card">
          <div className="kv">
            <span>Email</span>
            <b>an•••ya@example.com</b>
          </div>
          <div className="kv">
            <span>Deactivated</span>
            <b>18 Sep 2026</b>
          </div>
          <div className="kv">
            <span>Deletion scheduled</span>
            <b>18 Oct 2026</b>
          </div>
        </div>
      </Body>
      <FootBar>
        <Primary to="js-jobs" action="reset">
          Reactivate account
        </Primary>
        <TextLink action="back">Not now</TextLink>
      </FootBar>
    </>
  );
}

/** app/jobseeker-signup.tsx — step: method */
export function SignupMethod() {
  const nav = useNav();
  return (
    <>
      <PlainBar />
      <div className="scroll" style={{ padding: '0 24px 24px', textAlign: 'center' }}>
        <img
          src="/logo.png"
          alt="Applywizard"
          style={{ width: 64, height: 64, borderRadius: 16, margin: '8px auto 20px' }}
        />
        <h1 className="display">Sign in</h1>
        <p className="lede">
          Find verified jobs near you and apply in one tap. Pick how you&apos;d like to continue.
        </p>
        <div className="gap" style={{ gap: 12, textAlign: 'left' }}>
          <button className="btn dark" type="button" onClick={() => nav.push('js-signup-resume')}>
            <AppleMark /> Continue with Apple
          </button>
          <button className="btn ghost" type="button" style={{ justifyContent: 'space-between', padding: '0 16px' }} onClick={() => nav.push('js-signup-resume')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <GoogleMark /> Continue with Google
            </span>
            <span className="pill" style={{ background: '#ecfdf5', color: '#059669' }}>
              Fastest
            </span>
          </button>
          <Ghost to="js-signup-email" icon={<Mail size={20} color="#4432ff" />}>
            Continue with Email
          </Ghost>
        </div>
        <p className="muted" style={{ marginTop: 22, textAlign: 'center' }}>
          By continuing, you agree to ApplyWizard&apos;s <b style={{ color: '#4432ff' }}>Terms</b> and{' '}
          <b style={{ color: '#4432ff' }}>Privacy</b>.
          <br />
          You can verify your ID later to stand out to employers.
        </p>
      </div>
    </>
  );
}

export function SignupEmail() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">What&apos;s your email?</h1>
        <p className="lede">We&apos;ll send a 6-digit code to verify.</p>
        <Field
          label="Email address"
          value={seeker.email}
          placeholder="john@gmail.com"
          right={
            <span className="eye">
              <X size={18} />
            </span>
          }
        />
      </Body>
      <FootBar>
        <Primary to="js-signup-otp">Send code</Primary>
      </FootBar>
    </>
  );
}

export function SignupOtp() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">Enter your code</h1>
        <p className="lede">We sent a 6-digit code to {seeker.email}.</p>
        <Otp />
        <p className="muted" style={{ marginTop: 16 }}>
          Didn&apos;t get it? Resend in 0:24
        </p>
      </Body>
      <FootBar>
        <Primary to="js-signup-password">Verify</Primary>
      </FootBar>
    </>
  );
}

export function SignupPassword() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">Set your password</h1>
        <p className="lede">Create a password so you can sign in again using your email.</p>
        <Field label="Password" value="••••••••••" placeholder="Minimum 8 characters" />
        <Field label="Confirm password" value="••••••••••" placeholder="Enter password again" />
        <div className="card" style={{ marginTop: 6 }}>
          {['At least 8 characters', 'One uppercase letter', 'One number'].map((rule) => (
            <div key={rule} className="row" style={{ padding: '5px 0' }}>
              <span className="checkbox on">
                <Sparkles size={12} />
              </span>
              <span style={{ fontSize: 13, color: '#374151' }}>{rule}</span>
            </div>
          ))}
        </div>
      </Body>
      <FootBar>
        <Primary to="js-signup-resume">Continue</Primary>
      </FootBar>
    </>
  );
}

export function SignupResume() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">Upload your resume</h1>
        <p className="lede">We&apos;ll autofill your details from your resume. PDF or Word works best.</p>
        <div className="upload">
          <Upload size={28} color="#4432ff" />
          <strong>{seeker.resumeFile}</strong>
          <span>{seeker.resumeSize}</span>
        </div>
        <p className="label-xs">Parsed from your resume</p>
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
            <span>Highest qualification</span>
            <b>{seeker.education}</b>
          </div>
          <div className="kv">
            <span>Skills found</span>
            <b>{seeker.skills.slice(0, 3).join(', ')}</b>
          </div>
        </div>
      </Body>
      <FootBar>
        <Primary to="js-signup-details">Continue</Primary>
        <TextLink to="js-signup-details">Skip for now</TextLink>
      </FootBar>
    </>
  );
}

export function SignupDetails() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">Tell us about you</h1>
        <p className="lede">Just the basics - you can edit anything later.</p>
        <Field label="Full name" value={seeker.name} placeholder="Your name" />
        <Field label="Gender (optional)" value={seeker.gender} placeholder="Select gender (optional)" />
        <Field label={seeker.email} value={seeker.phone} placeholder="1234567891" />
      </Body>
      <FootBar>
        <Primary to="js-signup-categories">Continue</Primary>
      </FootBar>
    </>
  );
}

export function SignupCategories() {
  return (
    <>
      <PlainBar />
      <Body>
        <h1 className="display">What kind of work are you looking for?</h1>
        <p className="lede">Pick at least 1 — we&apos;ll match jobs to you. 2 selected.</p>
        <Chips items={filterCategories} selected={seeker.categories} />
      </Body>
      <FootBar>
        <Primary to="js-verify-hub" action="reset">
          Finish signup
        </Primary>
      </FootBar>
    </>
  );
}

/** Reusable verification wizard step. */
export function VerifyStep({
  step,
  eyebrow,
  title,
  description,
  children,
  next,
  cta = 'Continue',
  skip,
}: {
  step: number;
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  next: string;
  cta?: string;
  skip?: string;
}) {
  return (
    <>
      <WizardBar step={step} />
      <Body>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display">{title}</h1>
        {description ? <p className="lede">{description}</p> : null}
        {children}
      </Body>
      <FootBar>
        <Primary to={next}>{cta}</Primary>
        {skip ? <TextLink to={skip}>Skip for now</TextLink> : null}
      </FootBar>
    </>
  );
}

export { Choice };
