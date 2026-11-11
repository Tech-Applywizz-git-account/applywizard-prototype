import { useMemo, useState } from 'react';

import { useNav } from '../nav';
import {
  REPORT_REASONS,
  blockCompany,
  isReelReported,
  markReelReported,
  useReportReel,
  type ReportReason,
} from '../reelsState';

function shareUrlFor(reelId: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/jobseeker?post=${encodeURIComponent(reelId)}`;
}

/** Report Post screen opened from Posts → More. */
export function ReportPost() {
  const nav = useNav();
  const reel = useReportReel();
  const alreadyReported = isReelReported(reel.id);

  const [reason, setReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [toast, setToast] = useState('');
  const [submitted, setSubmitted] = useState(alreadyReported);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [error, setError] = useState('');

  const url = useMemo(() => shareUrlFor(reel.id), [reel.id]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1800);
  };

  const submitReport = () => {
    if (submitted || alreadyReported) {
      showToast('You already reported this post');
      return;
    }
    if (!reason) {
      setError('Please select a reason to continue.');
      return;
    }
    setError('');
    markReelReported(reel.id);
    setSubmitted(true);
    showToast('Thanks — your report was submitted');
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      showToast('Link copied');
    } catch {
      showToast('Could not copy link');
    }
  };

  const confirmBlock = () => {
    blockCompany(reel.company);
    setShowBlockConfirm(false);
    showToast(`${reel.company} blocked`);
    window.setTimeout(() => nav.back(), 700);
  };

  return (
    <div className="report-screen">
      <div className="report-scroll">
        <button type="button" className="report-close" onClick={() => nav.back()}>
          Close
        </button>

        <h1 className="report-title">Report post</h1>

        <div className="report-chips" role="listbox" aria-label="Report reasons">
          {REPORT_REASONS.map((option) => {
            const on = reason === option;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={on}
                className={on ? 'report-chip on' : 'report-chip'}
                onClick={() => {
                  setReason(option);
                  setError('');
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        <input
          className="report-input"
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Additional details (optional)"
          aria-label="Additional details"
        />

        {error ? <p className="report-error">{error}</p> : null}

        <div className="report-actions">
          <button
            type="button"
            className="report-action"
            disabled={submitted}
            onClick={submitReport}
          >
            {submitted ? 'Report submitted' : 'Submit report'}
          </button>
          <button type="button" className="report-action" onClick={copyLink}>
            Copy link
          </button>
          <button
            type="button"
            className="report-action danger"
            onClick={() => setShowBlockConfirm(true)}
          >
            Block this account
          </button>
          <button
            type="button"
            className="report-action"
            onClick={() => nav.push('js-community-guidelines')}
          >
            Community Guidelines
          </button>
        </div>
      </div>

      {showBlockConfirm ? (
        <div className="report-confirm">
          <button
            type="button"
            className="report-confirm-backdrop"
            aria-label="Dismiss"
            onClick={() => setShowBlockConfirm(false)}
          />
          <div className="report-confirm-sheet" role="dialog" aria-modal="true">
            <h3>Block {reel.company}?</h3>
            <p>You will no longer see posts from this account in Posts.</p>
            <button type="button" className="report-confirm-primary" onClick={confirmBlock}>
              Block account
            </button>
            <button
              type="button"
              className="report-confirm-secondary"
              onClick={() => setShowBlockConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {toast ? <div className="reel-toast report-toast">{toast}</div> : null}
    </div>
  );
}

/** Lightweight Community Guidelines page for Posts reporting. */
export function CommunityGuidelines() {
  const nav = useNav();

  return (
    <div className="report-screen">
      <div className="report-scroll">
        <button type="button" className="report-close" onClick={() => nav.back()}>
          Close
        </button>
        <h1 className="report-title">Community Guidelines</h1>
        <div className="guidelines-body">
          <p>
            ApplyWizz Posts should help people discover jobs and career content safely. Content that
            misleads, harasses, or exploits users is not allowed.
          </p>
          <p className="label-xs">Do not post</p>
          <ul className="bullets">
            <li>Spam, scams, or fraudulent hiring offers</li>
            <li>Harassment, hate, or discriminatory content</li>
            <li>Inappropriate or sexual content</li>
            <li>Fake company claims or misleading job details</li>
          </ul>
          <p className="label-xs">Reporting</p>
          <p>
            Use Report post to flag content that breaks these rules. Our team reviews reports and may
            remove content or restrict accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
