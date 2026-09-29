import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  IdCard,
  Lock,
  Shield,
  ShieldCheck,
  User,
} from 'lucide-react';

import {
  DIGI_DOCS,
  setFetchedDigiDocs,
  type DigiDocId,
} from '../digilockerState';
import { useNav } from '../nav';

type Step =
  | 'connecting'
  | 'signin'
  | 'verifying'
  | 'verified'
  | 'consent'
  | 'select'
  | 'fetching'
  | 'success';

type FetchStatus = 'pending' | 'loading' | 'done';

const IDENTITY_IDS: DigiDocId[] = ['pan', 'aadhaar'];

/** Stylized Ashoka emblem (prototype representation). */
function EmblemMark({ size = 36, color = '#1f2937' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#fff" stroke={color} strokeWidth="1.5" />
      <g fill={color}>
        {/* lions (simplified) */}
        <ellipse cx="20" cy="28" rx="5" ry="4.2" />
        <ellipse cx="32" cy="24" rx="5.5" ry="4.5" />
        <ellipse cx="44" cy="28" rx="5" ry="4.2" />
        <rect x="17" y="30" width="6" height="10" rx="1.5" />
        <rect x="29" y="27" width="6" height="13" rx="1.5" />
        <rect x="41" y="30" width="6" height="10" rx="1.5" />
        {/* wheel */}
        <circle cx="32" cy="44" r="6" fill="none" stroke={color} strokeWidth="1.6" />
        <circle cx="32" cy="44" r="1.4" />
        <path d="M32 38.5v11M26.5 44h11M27.8 39.2l8.4 8.4M36.2 39.2l-8.4 8.4" stroke={color} strokeWidth="1.2" />
        <rect x="14" y="48" width="36" height="3" rx="1.2" />
      </g>
    </svg>
  );
}

/** DigiLocker mark: document + cloud + lock (prototype). */
function DigiLockerMark({ size = 28 }: { size?: number }) {
  const gid = `dlg-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4432ff" />
        </linearGradient>
      </defs>
      {/* back doc */}
      <rect x="8" y="6" width="20" height="26" rx="3" fill="#a5b4fc" />
      {/* front doc */}
      <rect x="12" y="10" width="20" height="26" rx="3" fill={`url(#${gid})`} />
      {/* cloud */}
      <path
        d="M18 24c0-2.8 2.2-5 5-5 1.8 0 3.4.9 4.3 2.3A3.7 3.7 0 0 1 32 25.5c0 2-1.6 3.5-3.5 3.5H19.5C17.6 29 16 27.4 16 25.5c0-.7.2-1.3.5-1.8.3-.2.7-.4 1.1-.5.2-.5.3-1 .4-1.2z"
        fill="#fff"
      />
      {/* lock */}
      <rect x="23.2" y="23.8" width="5.6" height="4.4" rx="1" fill="#4432ff" />
      <path d="M24.4 23.8v-1.4a1.6 1.6 0 0 1 3.2 0v1.4" fill="none" stroke="#4432ff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function EPramaanMark() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden>
      <text x="2" y="17" fontSize="14" fontWeight="800" fill="#f97316" fontFamily="system-ui,sans-serif">
        e
      </text>
      <path d="M12 7l2.2 2.2M14.5 6.5l3 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12l2.2 2.2M14.5 11.5l3 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function JanParichayMark() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l8 3.5v6.2c0 5-3.4 9.4-8 10.8-4.6-1.4-8-5.8-8-10.8V5.5L12 2z"
        fill="#2563eb"
      />
      <circle cx="12" cy="10" r="2.4" fill="#fff" />
      <path d="M8.5 17c1.2-2 2.5-3 3.5-3s2.3 1 3.5 3" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Shield with lock — used for “Connecting to DigiLocker”. */
function ShieldLockIcon({ size = 18, color = '#4432ff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5.5c0 4.4-3 8.3-7 9.5-4-1.2-7-5.1-7-9.5V6l7-3z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <rect x="9.2" y="11.2" width="5.6" height="4.2" rx="1" stroke={color} strokeWidth="1.6" />
      <path d="M10.4 11.2V9.8a1.6 1.6 0 0 1 3.2 0v1.4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InfoCircleIcon({ size = 18, color = '#2563eb' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill={color} />
      <rect x="11" y="10" width="2" height="7" rx="1" fill="#fff" />
      <circle cx="12" cy="7.2" r="1.2" fill="#fff" />
    </svg>
  );
}

function DigiBrandHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="dl2-top">
      {onBack ? (
        <button type="button" className="dl2-back" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
      ) : (
        <span style={{ width: 40 }} />
      )}
      <div className="dl2-brand">
        <EmblemMark size={36} />
        <i className="dl2-brand-sep" />
        <div className="dl2-brand-row">
          <DigiLockerMark size={28} />
          <div className="dl2-brand-text">
            <strong>DigiLocker</strong>
            <span>Government of India</span>
          </div>
        </div>
      </div>
      <span style={{ width: 40 }} />
    </div>
  );
}

function InfoBanner({
  icon,
  children,
  tone = 'blue',
}: {
  icon: ReactNode;
  children: ReactNode;
  tone?: 'blue' | 'indigo';
}) {
  return (
    <div className={`dl2-banner ${tone}`}>
      <span className="dl2-banner-icon">{icon}</span>
      <i className="dl2-banner-sep" />
      <p>{children}</p>
    </div>
  );
}

function SelectCard({
  title,
  sub,
  selected,
  onToggle,
  mode,
  icon,
}: {
  title: string;
  sub: string;
  selected: boolean;
  onToggle: () => void;
  mode: 'radio' | 'check';
  icon: ReactNode;
}) {
  return (
    <button type="button" className={selected ? 'dl2-select on' : 'dl2-select'} onClick={onToggle}>
      <span className="dl2-select-icon">{icon}</span>
      <span className="dl2-select-body">
        <strong>{title}</strong>
        <em>{sub}</em>
      </span>
      {mode === 'radio' ? (
        <span className={selected ? 'dl2-radio on' : 'dl2-radio'} aria-hidden />
      ) : selected ? (
        <span className="dl2-box on">
          <Check size={13} color="#fff" strokeWidth={3} />
        </span>
      ) : (
        <span className="dl2-box" />
      )}
    </button>
  );
}

/** Full DigiLocker prototype flow (mock only) — UI matched to design references. */
export function DigiLockerFlow() {
  const nav = useNav();
  const [step, setStep] = useState<Step>('connecting');
  const [authTab, setAuthTab] = useState<'mobile' | 'username' | 'other'>('mobile');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [otherIdType, setOtherIdType] = useState<'aadhaar' | 'pan' | 'dl'>('aadhaar');
  const [otherIdValue, setOtherIdValue] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinLess, setPinLess] = useState(false);
  const [consentCheck, setConsentCheck] = useState(true);
  const [selected, setSelected] = useState<DigiDocId[]>(['pan', 'class10', 'class12', 'degree']);
  const [fetchStatuses, setFetchStatuses] = useState<Record<string, FetchStatus>>({});

  const leaveFlow = () => nav.reset('js-verify-documents');

  useEffect(() => {
    if (step !== 'connecting') return;
    const t = window.setTimeout(() => setStep('signin'), 1800);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 'verifying') return;
    const t = window.setTimeout(() => setStep('verified'), 1400);
    return () => window.clearTimeout(t);
  }, [step]);

  const fetchQueue = useMemo(() => {
    const base: { key: string; label: string; sub: string; icon: 'lock' | 'user' | 'id' | 'file' | 'grad' }[] = [
      { key: 'connect', label: 'Connecting to DigiLocker', sub: 'Secure connection established', icon: 'lock' },
      { key: 'verify', label: 'Verifying account', sub: 'Account verified successfully', icon: 'user' },
    ];
    selected.forEach((id) => {
      const meta = DIGI_DOCS.find((d) => d.id === id);
      if (!meta) return;
      base.push({
        key: id,
        label: `Fetching ${meta.label}`,
        sub: id === 'degree' ? 'Waiting to fetch' : IDENTITY_IDS.includes(id) ? `Retrieving your ${meta.label} details` : 'Retrieving your document',
        icon: IDENTITY_IDS.includes(id) ? 'id' : id === 'degree' ? 'grad' : 'file',
      });
    });
    return base;
  }, [selected]);

  useEffect(() => {
    if (step !== 'fetching') return;
    const initial: Record<string, FetchStatus> = {};
    fetchQueue.forEach((item, i) => {
      initial[item.key] = i === 0 ? 'loading' : 'pending';
    });
    setFetchStatuses(initial);

    let index = 0;
    const timers: number[] = [];
    const advance = () => {
      setFetchStatuses((prev) => {
        const next = { ...prev };
        const current = fetchQueue[index];
        if (current) next[current.key] = 'done';
        const upcoming = fetchQueue[index + 1];
        if (upcoming) next[upcoming.key] = 'loading';
        return next;
      });
      index += 1;
      if (index >= fetchQueue.length) {
        timers.push(window.setTimeout(() => setStep('success'), 450));
      } else {
        timers.push(window.setTimeout(advance, 750));
      }
    };
    timers.push(window.setTimeout(advance, 750));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [step, fetchQueue]);

  const toggleIdentity = (id: DigiDocId) => {
    setSelected((prev) => {
      const without = prev.filter((x) => !IDENTITY_IDS.includes(x));
      if (prev.includes(id)) return without;
      return [...without, id];
    });
  };

  const toggleEducation = (id: DigiDocId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const finish = () => {
    setFetchedDigiDocs(selected);
    nav.reset('js-verify-documents');
  };

  const identitySelected = selected.find((id) => IDENTITY_IDS.includes(id));

  /* ---------- 1. CONNECTING ---------- */
  if (step === 'connecting') {
    return (
      <div className="dl2-screen">
        <div className="dl2-top plain">
          <button type="button" className="dl2-back" aria-label="Back" onClick={leaveFlow}>
            <ArrowLeft size={22} />
          </button>
        </div>
        <div className="dl2-connect">
          <div className="dl2-hero" aria-hidden>
            <span className="dl2-glow" />
            <span className="dl2-cloud c1" />
            <span className="dl2-cloud c2" />
            <span className="dl2-doc back" />
            <span className="dl2-doc front" />
            <span className="dl2-emblem-float">
              <EmblemMark size={54} color="#2563eb" />
            </span>
          </div>
          <h1>Connect to DigiLocker</h1>
          <p>Securely fetch your verified documents from DigiLocker.</p>
          <span className="dl2-ring-spinner" />
          <strong className="dl2-connecting-label">Connecting securely...</strong>
        </div>
        <div className="dl2-bottom-pad">
          <InfoBanner icon={<Lock size={18} color="#2563eb" strokeWidth={2} />}>
            You will be redirected to DigiLocker&apos;s authentication service.
          </InfoBanner>
        </div>
      </div>
    );
  }

  /* ---------- 2. SIGN IN ---------- */
  if (step === 'signin') {
    const authSubtitle =
      authTab === 'mobile'
        ? 'Use your registered mobile number to continue.'
        : authTab === 'username'
          ? 'Use your DigiLocker username to continue.'
          : 'Use Aadhaar, PAN, or Driving Licence to continue.';

    const otherIdLabel =
      otherIdType === 'aadhaar' ? 'Aadhaar number' : otherIdType === 'pan' ? 'PAN' : 'Driving Licence number';
    const otherIdPlaceholder =
      otherIdType === 'aadhaar'
        ? 'Enter 12-digit Aadhaar number'
        : otherIdType === 'pan'
          ? 'Enter PAN (e.g. ABCDE1234F)'
          : 'Enter Driving Licence number';

    return (
      <div className="dl2-screen">
        <DigiBrandHeader onBack={leaveFlow} />
        <div className="dl2-scroll">
          <h1 className="dl2-h1">Sign in to your account</h1>
          <p className="dl2-sub">{authSubtitle}</p>

          <div className="dl2-tabs">
            {(
              [
                ['mobile', 'Mobile'],
                ['username', 'Username'],
                ['other', 'Other ID'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={authTab === id ? 'dl2-tab on' : 'dl2-tab'}
                onClick={() => setAuthTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {authTab === 'mobile' ? (
            <label className="dl2-field">
              <span>
                Mobile <b>*</b>
              </span>
              <input
                className="dl2-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                inputMode="tel"
              />
            </label>
          ) : null}

          {authTab === 'username' ? (
            <label className="dl2-field">
              <span>
                Username <b>*</b>
              </span>
              <input
                className="dl2-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoCapitalize="none"
              />
            </label>
          ) : null}

          {authTab === 'other' ? (
            <>
              <label className="dl2-field">
                <span>
                  Select ID <b>*</b>
                </span>
                <select
                  className="dl2-input dl2-select-input"
                  value={otherIdType}
                  onChange={(e) => {
                    setOtherIdType(e.target.value as 'aadhaar' | 'pan' | 'dl');
                    setOtherIdValue('');
                  }}
                >
                  <option value="aadhaar">Aadhaar</option>
                  <option value="pan">PAN</option>
                  <option value="dl">Driving Licence</option>
                </select>
              </label>
              <label className="dl2-field">
                <span>
                  {otherIdLabel} <b>*</b>
                </span>
                <input
                  className="dl2-input"
                  value={otherIdValue}
                  onChange={(e) => setOtherIdValue(e.target.value)}
                  placeholder={otherIdPlaceholder}
                />
              </label>
            </>
          ) : null}

          <label className="dl2-field">
            <span>
              Security PIN <b>*</b>
            </span>
            <span className="dl2-input-wrap">
              <input
                className="dl2-input"
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter security PIN"
              />
              <button type="button" className="dl2-eye" onClick={() => setShowPin((v) => !v)} aria-label="Toggle PIN">
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <button type="button" className="dl2-link-right">
            Forgot security PIN?
          </button>

          <label className="dl2-checkrow">
            <input type="checkbox" checked={pinLess} onChange={(e) => setPinLess(e.target.checked)} />
            <span>PIN less authentication</span>
          </label>

          <label className="dl2-checkrow accent">
            <input type="checkbox" checked={consentCheck} onChange={(e) => setConsentCheck(e.target.checked)} />
            <span>
              I consent to <strong>terms of use.</strong>
            </span>
          </label>

          <button
            type="button"
            className="dl2-btn green"
            disabled={!consentCheck}
            onClick={() => setStep('verifying')}
          >
            Sign In
          </button>

          <p className="dl2-signup">
            New user? <button type="button">Sign up</button>
          </p>

          <div className="dl2-or">
            <i />
            <span>OR</span>
            <i />
          </div>
          <p className="dl2-or-cap">Continue with</p>

          <div className="dl2-alt-row">
            <button type="button" className="dl2-alt" onClick={() => setStep('verifying')}>
              <EPramaanMark /> e-Pramaan
            </button>
            <button type="button" className="dl2-alt" onClick={() => setStep('verifying')}>
              <JanParichayMark /> JanParichay
            </button>
          </div>

          <InfoBanner icon={<ShieldCheck size={18} color="#2563eb" strokeWidth={2} />}>
            Your information is safe and secure with DigiLocker.
          </InfoBanner>
        </div>
      </div>
    );
  }

  /* ---------- 3a. VERIFYING ---------- */
  if (step === 'verifying') {
    return (
      <div className="dl2-screen">
        <DigiBrandHeader />
        <div className="dl2-center">
          <span className="dl2-ring-spinner" />
          <h1 className="dl2-h1 center">Verifying your account</h1>
          <p className="dl2-sub center">Securely connecting to DigiLocker...</p>
        </div>
      </div>
    );
  }

  /* ---------- 3b. VERIFIED ---------- */
  if (step === 'verified') {
    return (
      <div className="dl2-screen">
        <DigiBrandHeader />
        <div className="dl2-center">
          <div className="dl2-success-burst">
            <Check size={36} color="#fff" strokeWidth={3} />
          </div>
          <h1 className="dl2-h1 center">Account verified</h1>
          <p className="dl2-sub center">Your DigiLocker account is connected.</p>
          <button type="button" className="dl2-btn purple" onClick={() => setStep('consent')}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  /* ---------- 4. CONSENT ---------- */
  if (step === 'consent') {
    return (
      <div className="dl2-screen">
        <DigiBrandHeader onBack={() => setStep('verified')} />
        <div className="dl2-scroll">
          <h1 className="dl2-h1">Allow document access</h1>
          <p className="dl2-sub tight">Share your documents with Applywizz?</p>
          <p className="dl2-body">
            Applywizz is requesting access to your DigiLocker documents to verify your identity and education.
          </p>

          <div className="dl2-app-card">
            <span className="dl2-app-logo">A</span>
            <span>
              <strong>Applywizz</strong>
              <em>Profile verification</em>
            </span>
          </div>

          <h2 className="dl2-section">Requested documents</h2>

          <div className="dl2-req-card">
            <span className="dl2-req-icon">
              <IdCard size={20} color="#4432ff" strokeWidth={1.8} />
            </span>
            <div>
              <strong>Identity (one required)</strong>
              <ul>
                <li>PAN</li>
                <li>Aadhaar</li>
              </ul>
            </div>
          </div>

          <div className="dl2-req-card">
            <span className="dl2-req-icon">
              <GraduationCap size={20} color="#4432ff" strokeWidth={1.8} />
            </span>
            <div>
              <strong>Education</strong>
              <ul>
                <li>Class 10 marksheet</li>
                <li>Class 12 marksheet</li>
                <li>Degree certificate</li>
              </ul>
            </div>
          </div>

          <InfoBanner icon={<ShieldCheck size={18} color="#2563eb" strokeWidth={2} />}>
            Your documents will only be used for profile verification. Your data is secure and private with DigiLocker.
          </InfoBanner>
        </div>
        <div className="dl2-footer">
          <button type="button" className="dl2-btn ghost" onClick={() => setStep('verified')}>
            Cancel
          </button>
          <button type="button" className="dl2-btn purple wide" onClick={() => setStep('select')}>
            Allow access
          </button>
        </div>
      </div>
    );
  }

  /* ---------- 5. SELECT ---------- */
  if (step === 'select') {
    return (
      <div className="dl2-screen soft">
        <DigiBrandHeader onBack={() => setStep('consent')} />
        <div className="dl2-scroll">
          <h1 className="dl2-h1">Select documents</h1>
          <p className="dl2-sub">Choose the documents you want to share with Applywizz.</p>

          <p className="dl2-eyebrow">Identity (Select one)</p>
          <SelectCard
            title="PAN"
            sub="Government issued identity document"
            selected={identitySelected === 'pan'}
            onToggle={() => toggleIdentity('pan')}
            mode="radio"
            icon={<IdCard size={18} color="#6b7280" strokeWidth={1.8} />}
          />
          <SelectCard
            title="Aadhaar"
            sub="Government issued identity document"
            selected={identitySelected === 'aadhaar'}
            onToggle={() => toggleIdentity('aadhaar')}
            mode="radio"
            icon={<Shield size={18} color="#6b7280" strokeWidth={1.8} />}
          />

          <p className="dl2-eyebrow">Education documents</p>
          <SelectCard
            title="Class 10 marksheet"
            sub="SSC / Matric / CBSE / ICSE / State Board"
            selected={selected.includes('class10')}
            onToggle={() => toggleEducation('class10')}
            mode="check"
            icon={<FileText size={18} color="#6b7280" strokeWidth={1.8} />}
          />
          <SelectCard
            title="Class 12 marksheet"
            sub="Intermediate / HSC / PUC"
            selected={selected.includes('class12')}
            onToggle={() => toggleEducation('class12')}
            mode="check"
            icon={<FileText size={18} color="#6b7280" strokeWidth={1.8} />}
          />
          <SelectCard
            title="Degree certificate"
            sub="Bachelor's / Master's degree"
            selected={selected.includes('degree')}
            onToggle={() => toggleEducation('degree')}
            mode="check"
            icon={<GraduationCap size={18} color="#6b7280" strokeWidth={1.8} />}
          />

          <InfoBanner icon={<InfoCircleIcon />}>
            One government ID (Aadhaar or PAN) is required. You can select multiple education documents.
          </InfoBanner>
        </div>
        <div className="dl2-footer">
          <button type="button" className="dl2-btn ghost" onClick={() => setStep('consent')}>
            Cancel
          </button>
          <button
            type="button"
            className="dl2-btn purple wide"
            disabled={!identitySelected}
            onClick={() => setStep('fetching')}
          >
            Fetch selected documents
          </button>
        </div>
      </div>
    );
  }

  /* ---------- 6. FETCHING ---------- */
  if (step === 'fetching') {
    const iconFor = (kind: string, active: boolean) => {
      const color = active ? '#4432ff' : '#9ca3af';
      if (kind === 'lock') return <ShieldLockIcon size={18} color={color} />;
      if (kind === 'user') return <User size={18} color={color} strokeWidth={1.8} />;
      if (kind === 'id') return <IdCard size={18} color={color} strokeWidth={1.8} />;
      if (kind === 'grad') return <GraduationCap size={18} color={color} strokeWidth={1.8} />;
      return <FileText size={18} color={color} strokeWidth={1.8} />;
    };

    return (
      <div className="dl2-screen soft">
        <DigiBrandHeader onBack={() => setStep('select')} />
        <div className="dl2-scroll">
          <h1 className="dl2-h1">Fetching your documents</h1>
          <p className="dl2-sub">Retrieving verified documents from DigiLocker...</p>

          <div className="dl2-timeline">
            {fetchQueue.map((item, index) => {
              const status = fetchStatuses[item.key] ?? 'pending';
              const active = status !== 'pending';
              const sub =
                status === 'pending' && item.key === 'degree'
                  ? 'Waiting to fetch'
                  : status === 'loading'
                    ? item.sub.replace('Waiting to fetch', 'Retrieving your document')
                    : item.sub === 'Waiting to fetch'
                      ? 'Retrieving your document'
                      : item.sub;
              return (
                <div key={item.key} className={`dl2-tl-item ${status}`}>
                  <div className="dl2-tl-rail">
                    <span className={`dl2-tl-dot ${status}`} />
                    {index < fetchQueue.length - 1 ? <span className={`dl2-tl-line ${status}`} /> : null}
                  </div>
                  <div className={`dl2-tl-card ${status}`}>
                    <span className={`dl2-tl-icon ${status}`}>{iconFor(item.icon, active)}</span>
                    <span className="dl2-tl-body">
                      <strong>{item.label}</strong>
                      <em>{sub}</em>
                    </span>
                    {status === 'done' ? (
                      <span className="dl2-ok">
                        <Check size={12} color="#fff" strokeWidth={3} />
                      </span>
                    ) : status === 'loading' ? (
                      <span className="dl2-mini-spin" />
                    ) : (
                      <span className="dl2-wait" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <InfoBanner icon={<InfoCircleIcon />}>
            This may take a few seconds. Please don&apos;t close this screen.
          </InfoBanner>
        </div>
      </div>
    );
  }

  /* ---------- 7. SUCCESS ---------- */
  return (
    <div className="dl2-screen">
      <DigiBrandHeader onBack={leaveFlow} />
      <div className="dl2-scroll">
        <div className="dl2-success-hero" aria-hidden>
          <span className="dl2-spark s1" />
          <span className="dl2-spark s2" />
          <span className="dl2-ghost-doc d1">
            <FileText size={22} color="#cbd5e1" />
          </span>
          <span className="dl2-ghost-doc d2">
            <FileText size={22} color="#cbd5e1" />
          </span>
          <div className="dl2-success-burst lg">
            <Check size={40} color="#fff" strokeWidth={3} />
          </div>
        </div>

        <h1 className="dl2-h1 center">Documents fetched successfully</h1>
        <p className="dl2-sub center">
          Your verified documents have been securely added to your Applywizz profile.
        </p>

        <div className="dl2-verified-list">
          {selected.map((id) => {
            const meta = DIGI_DOCS.find((d) => d.id === id);
            return (
              <div key={id} className="dl2-verified-card">
                <span className="dl2-select-icon">
                  {IDENTITY_IDS.includes(id) ? (
                    <IdCard size={18} color="#6b7280" strokeWidth={1.8} />
                  ) : id === 'degree' ? (
                    <GraduationCap size={18} color="#6b7280" strokeWidth={1.8} />
                  ) : (
                    <FileText size={18} color="#6b7280" strokeWidth={1.8} />
                  )}
                </span>
                <span className="dl2-select-body">
                  <strong>{meta?.label}</strong>
                  <em>Verified through DigiLocker</em>
                </span>
                <span className="dl2-verified-pill">
                  <Check size={12} color="#fff" strokeWidth={3} /> Verified
                </span>
              </div>
            );
          })}
        </div>

        <InfoBanner icon={<ShieldCheck size={18} color="#2563eb" strokeWidth={2} />}>
          These documents are verified by DigiLocker and can be used for profile verification.
        </InfoBanner>
      </div>
      <div className="dl2-footer">
        <button type="button" className="dl2-btn purple full" onClick={finish}>
          Continue
        </button>
      </div>
    </div>
  );
}
