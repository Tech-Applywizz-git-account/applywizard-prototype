import { useMemo, useState, type ReactNode } from 'react';
import {
  Bell,
  Check,
  Eye,
  MapPin,
  Send,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import {
  getResumeLibrary,
  getSelectedJob,
  hasAppliedToJob,
  seekerCityShort,
  seekerEducationLine,
  seekerInitials,
  submitApplication,
  useSelectedJob,
} from '../applyState';
import { seeker } from '../data';
import { useNav } from '../nav';

type Step = 'contact' | 'resume' | 'review' | 'sent';

const STEP_PROGRESS: Record<Exclude<Step, 'sent'>, number> = {
  contact: 33,
  resume: 67,
  review: 100,
};

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="qa-progress">
      <div className="qa-progress-track">
        <div className="qa-progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="qa-progress-label">{percent}%</span>
    </div>
  );
}

function FlowHeader({
  jobTitle,
  company,
  percent,
  onClose,
}: {
  jobTitle: string;
  company: string;
  percent: number;
  onClose: () => void;
}) {
  return (
    <div className="qa-header">
      <div className="qa-header-top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="qa-title">Quick Apply</h1>
          <p className="qa-jobline">
            {jobTitle} · {company}
          </p>
        </div>
        <button type="button" className="qa-close" aria-label="Close" onClick={onClose}>
          <X size={22} strokeWidth={2.2} />
        </button>
      </div>
      <ProgressBar percent={percent} />
    </div>
  );
}

function FooterActions({
  leftLabel,
  rightLabel,
  onLeft,
  onRight,
  rightDisabled,
  rightLoading,
  rightIcon,
}: {
  leftLabel: string;
  rightLabel: string;
  onLeft: () => void;
  onRight: () => void;
  rightDisabled?: boolean;
  rightLoading?: boolean;
  rightIcon?: ReactNode;
}) {
  return (
    <div className="qa-footer">
      <button type="button" className="qa-btn ghost" onClick={onLeft}>
        {leftLabel}
      </button>
      <button
        type="button"
        className="qa-btn primary"
        onClick={onRight}
        disabled={rightDisabled || rightLoading}
      >
        {rightIcon}
        {rightLoading ? 'Submitting…' : rightLabel}
      </button>
    </div>
  );
}

/** Complete multi-step Quick Apply flow. */
export function QuickApply() {
  const nav = useNav();
  const selectedJob = useSelectedJob();
  const job = selectedJob ?? getSelectedJob();

  const [step, setStep] = useState<Step>('contact');
  const [email, setEmail] = useState(seeker.email);
  const [country, setCountry] = useState('IN India (+91)');
  const [phone, setPhone] = useState(seeker.phone.replace(/\s/g, ''));
  const [contactError, setContactError] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [showDiscard, setShowDiscard] = useState(false);

  const resumes = useMemo(() => getResumeLibrary(), []);
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id ?? '');
  const [resumeList, setResumeList] = useState(resumes);

  const selectedResume = resumeList.find((r) => r.id === selectedResumeId) ?? resumeList[0];
  const initials = seekerInitials();
  const city = seekerCityShort();
  const education = seekerEducationLine();
  const alreadyApplied = hasAppliedToJob(job.id);

  const closeFlow = () => {
    if (step === 'sent') {
      nav.reset('js-jobs');
      return;
    }
    if (step !== 'contact' || email !== seeker.email || phone !== seeker.phone.replace(/\s/g, '')) {
      setShowDiscard(true);
      return;
    }
    nav.back();
  };

  const confirmDiscard = () => {
    setShowDiscard(false);
    nav.back();
  };

  const goContactNext = () => {
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedEmail || !trimmedPhone || !country.trim()) {
      setContactError('Please fill in email, country code and mobile number.');
      return;
    }
    if (!trimmedEmail.includes('@')) {
      setContactError('Enter a valid email address.');
      return;
    }
    setContactError('');
    setStep('resume');
  };

  const goResumeReview = () => {
    if (!selectedResume) {
      setResumeError('Select a resume to continue.');
      return;
    }
    setResumeError('');
    setStep('review');
  };

  const handleSubmit = () => {
    if (!selectedResume) {
      setSubmitError('Select a resume before submitting.');
      return;
    }
    if (alreadyApplied) {
      setSubmitError('You already applied to this job.');
      return;
    }
    setSubmitError('');
    setIsSubmitting(true);
    window.setTimeout(() => {
      const result = submitApplication({
        job,
        email: email.trim(),
        phone: `+91 ${phone.trim()}`,
        resumeFile: selectedResume.fileName,
        jobAlerts,
      });
      setIsSubmitting(false);
      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }
      setStep('sent');
    }, 700);
  };

  if (step === 'sent') {
    return (
      <div className="qa-screen qa-sent">
        <div className="qa-sent-body">
          <div className="qa-success-burst" aria-hidden>
            <Check size={40} strokeWidth={3} color="#fff" />
          </div>
          <h1 className="qa-sent-title">Application sent!</h1>
          <p className="qa-sent-lede">
            {job.company} typically responds within <strong>2 days</strong>.
          </p>
          <div className="qa-notify-card">
            <Bell size={22} color="#4432ff" />
            <p>You&apos;ll get a push when your application status changes.</p>
          </div>
          <button type="button" className="qa-btn primary full" onClick={() => nav.reset('js-applied')}>
            View my applications
          </button>
          <button type="button" className="qa-text-link" onClick={() => nav.reset('js-jobs')}>
            Browse more jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qa-screen">
      <FlowHeader
        jobTitle={job.title}
        company={job.company}
        percent={STEP_PROGRESS[step]}
        onClose={closeFlow}
      />

      {step === 'contact' ? (
        <>
          <div className="qa-body">
            <h2 className="qa-section-title">Contact info</h2>

            <div className="qa-profile-row">
              <span className="qa-avatar">{initials}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong className="qa-profile-name">{seeker.name.toUpperCase()}</strong>
                <p className="qa-profile-edu">{education}</p>
                <p className="qa-profile-loc">
                  <MapPin size={13} /> {city}
                </p>
              </div>
            </div>

            <label className="qa-field">
              <span>Email address *</span>
              <input
                className="qa-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </label>

            <label className="qa-field">
              <span>Phone country code *</span>
              <select
                className="qa-input qa-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>IN India (+91)</option>
                <option>US United States (+1)</option>
                <option>GB United Kingdom (+44)</option>
              </select>
            </label>

            <label className="qa-field">
              <span>Mobile number *</span>
              <input
                className="qa-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter mobile number"
              />
            </label>

            <p className="qa-hint">Submitting this application won&apos;t change your Verified profile.</p>
            {contactError ? <p className="qa-error">{contactError}</p> : null}
            {alreadyApplied ? (
              <p className="qa-error">You already applied to this job. You can still review details.</p>
            ) : null}
          </div>
          <FooterActions
            leftLabel="Cancel"
            rightLabel="Next"
            onLeft={closeFlow}
            onRight={goContactNext}
          />
        </>
      ) : null}

      {step === 'resume' ? (
        <>
          <div className="qa-body">
            <h2 className="qa-section-title">Resume</h2>
            <p className="qa-subtitle">Choose a resume from your library/upload a new one *</p>

            <p className="qa-eyebrow">YOUR RESUMES</p>
            <div className="qa-resume-list">
              {resumeList.map((item) => {
                const on = item.id === selectedResumeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={on ? 'qa-resume-card on' : 'qa-resume-card'}
                    onClick={() => setSelectedResumeId(item.id)}
                  >
                    <span className="qa-pdf">PDF</span>
                    <span className="qa-resume-meta">
                      <strong>{item.fileName}</strong>
                      <em>{item.label}</em>
                    </span>
                    <span className="qa-resume-actions" onClick={(e) => e.stopPropagation()}>
                      {on ? (
                        <span className="qa-check" aria-hidden>
                          <Check size={14} color="#fff" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="qa-check off" aria-hidden />
                      )}
                      <button
                        type="button"
                        className="qa-icon-soft"
                        aria-label="Preview resume"
                        onClick={() => window.alert(`Preview: ${item.fileName}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        type="button"
                        className="qa-icon-danger"
                        aria-label="Delete resume"
                        onClick={() => {
                          if (resumeList.length <= 1) {
                            window.alert('Keep at least one resume to apply.');
                            return;
                          }
                          setResumeList((list) => list.filter((r) => r.id !== item.id));
                          if (selectedResumeId === item.id) {
                            setSelectedResumeId(resumeList.find((r) => r.id !== item.id)?.id ?? '');
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="qa-upload"
              onClick={() => window.alert('Resume upload is simulated in this prototype.')}
            >
              <Upload size={18} color="#4432ff" /> Upload resume
            </button>
            <p className="qa-hint center">DOC, DOCX, PDF (2 MB)</p>
            {resumeError ? <p className="qa-error">{resumeError}</p> : null}
          </div>
          <FooterActions
            leftLabel="Back"
            rightLabel="Review"
            onLeft={() => setStep('contact')}
            onRight={goResumeReview}
          />
        </>
      ) : null}

      {step === 'review' ? (
        <>
          <div className="qa-body">
            <h2 className="qa-section-title">Review your application</h2>
            <p className="qa-subtitle">The employer will also receive a copy of your profile.</p>

            <div className="qa-divider" />

            <div className="qa-review-head">
              <h3>Contact info</h3>
              <button type="button" className="qa-edit" onClick={() => setStep('contact')}>
                Edit
              </button>
            </div>
            <div className="qa-profile-row compact">
              <span className="qa-avatar sm">{initials}</span>
              <div>
                <strong className="qa-profile-name">{seeker.name.toUpperCase()}</strong>
                <p className="qa-profile-loc" style={{ marginTop: 2 }}>
                  {city}
                </p>
              </div>
            </div>
            <div className="qa-kv">
              <span>Email</span>
              <b>{email}</b>
            </div>
            <div className="qa-kv">
              <span>Phone</span>
              <b>
                +91 {phone}
              </b>
            </div>

            <div className="qa-divider" />

            <div className="qa-review-head">
              <h3>Resume</h3>
              <button type="button" className="qa-edit" onClick={() => setStep('resume')}>
                Edit
              </button>
            </div>
            <div className="qa-resume-card static">
              <span className="qa-pdf">PDF</span>
              <span className="qa-resume-meta">
                <strong>{selectedResume?.fileName}</strong>
                <em>From your resume library</em>
              </span>
            </div>

            <label className="qa-alerts">
              <button
                type="button"
                className={jobAlerts ? 'qa-checkbox on' : 'qa-checkbox'}
                aria-pressed={jobAlerts}
                onClick={() => setJobAlerts((v) => !v)}
              >
                {jobAlerts ? <Check size={14} color="#fff" strokeWidth={3} /> : null}
              </button>
              <span>
                Get job alerts from <strong>{job.company}</strong> for similar openings.
              </span>
            </label>

            {submitError ? <p className="qa-error">{submitError}</p> : null}
          </div>
          <FooterActions
            leftLabel="Back"
            rightLabel="Submit application"
            rightIcon={<Send size={16} />}
            onLeft={() => setStep('resume')}
            onRight={handleSubmit}
            rightDisabled={alreadyApplied}
            rightLoading={isSubmitting}
          />
        </>
      ) : null}

      {showDiscard ? (
        <div className="qa-discard">
          <button type="button" className="qa-discard-backdrop" aria-label="Dismiss" onClick={() => setShowDiscard(false)} />
          <div className="qa-discard-sheet" role="dialog" aria-modal="true">
            <h3>Discard application?</h3>
            <p>Your progress on this application will be lost. Profile and resume data stay saved.</p>
            <button type="button" className="qa-btn primary full" onClick={confirmDiscard}>
              Discard
            </button>
            <button type="button" className="qa-btn ghost full" onClick={() => setShowDiscard(false)}>
              Keep editing
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
