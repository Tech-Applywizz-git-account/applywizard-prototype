import { useLayoutEffect, useRef, type ComponentType, type ReactNode } from 'react';
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  Filter,
  LayoutGrid,
  MapPin,
  Menu,
  Search,
  Sparkles,
  UserCircle2,
  Users,
} from 'lucide-react';

import { useNav } from './nav';
import { useLanguage } from './language';
import { useTheme } from './theme';
import { scrollMemory } from './scrollMemory';

/* ------------------------------------------------------------------ chrome */

export function Screen({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** JobseekerHeader.tsx — centered title, optional back / menu / bell / filter. */
export function AppBar({
  title,
  back,
  menu,
  bell,
  filter,
  guest,
  onBell,
  right,
}: {
  title: string;
  back?: boolean;
  menu?: boolean;
  bell?: boolean;
  filter?: boolean;
  guest?: boolean;
  onBell?: string;
  right?: ReactNode;
}) {
  const nav = useNav();
  return (
    <div className="appbar">
      <div className="slot">
        {back ? (
          <button className="iconbtn" onClick={nav.back} aria-label="Back">
            <ArrowLeft size={22} />
          </button>
        ) : null}
        {menu ? (
          <button
            className="iconbtn"
            type="button"
            aria-label="Menu"
            onClick={() => nav.open('drawer')}
          >
            <Menu size={22} />
          </button>
        ) : null}
      </div>
      <h1>{title}</h1>
      <div className="slot end">
        {right}
        {guest ? (
          <button className="chip-signin" type="button" onClick={() => nav.push('js-login')}>
            Sign in
          </button>
        ) : null}
        {bell ? (
          <button
            className="iconbtn"
            type="button"
            onClick={() => {
              if (onBell) nav.push(onBell);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <i className="dot-badge" />
          </button>
        ) : null}
        {filter ? (
          <button
            className="iconbtn"
            type="button"
            aria-label="Filters"
            onClick={() => nav.open('filters')}
          >
            <Filter size={20} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** VerificationStepShell.tsx — back arrow, segmented progress, step counter. */
export function WizardBar({ step, total = 6 }: { step: number; total?: number }) {
  const nav = useNav();
  return (
    <div className="wizbar">
      <button className="iconbtn" onClick={nav.back} aria-label="Back">
        <ArrowLeft size={22} />
      </button>
      <div className="segs">
        {Array.from({ length: total }).map((_, index) => (
          <i key={index} className={index < step ? 'on' : ''} />
        ))}
      </div>
      <span className="count">
        {step}/{total}
      </span>
    </div>
  );
}

export function PlainBar({ title }: { title?: string }) {
  const nav = useNav();
  return (
    <div className="wizbar">
      <button className="iconbtn" onClick={nav.back} aria-label="Back">
        <ArrowLeft size={22} />
      </button>
      {title ? <span className="count" style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{title}</span> : null}
    </div>
  );
}

export function Body({ children, pad = 20 }: { children: ReactNode; pad?: number }) {
  const nav = useNav();
  const ref = useRef<HTMLDivElement>(null);
  const key = nav.current.id;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = scrollMemory.get(key);
    return () => {
      scrollMemory.set(key, el.scrollTop);
    };
  }, [key]);

  return (
    <div
      ref={ref}
      className="scroll"
      style={{ padding: `0 ${pad}px 24px` }}
      onScroll={(e) => scrollMemory.set(key, e.currentTarget.scrollTop)}
    >
      {children}
    </div>
  );
}

export function FootBar({ children }: { children: ReactNode }) {
  return <div className="footbar">{children}</div>;
}

/* ------------------------------------------------------------------ tabs */


export function SeekerTabs({ active, locked }: { active: string; locked?: boolean }) {
  const nav = useNav();
  const { t } = useLanguage();
  const tabs = [
    { id: 'js-jobs', label: t('allJobs'), Icon: Briefcase },
    { id: 'js-applied', label: t('applied'), Icon: FileText },
    { id: 'js-saved', label: t('saved'), Icon: Bookmark },
    { id: 'js-profile', label: t('profile'), Icon: UserCircle2 },
  ];
  return (
    <div className="tabbar">
      {tabs.map(({ id, label, Icon }) => {
        const on = id === active;
        return (
          <button
            key={id}
            className={on ? 'on' : ''}
            onClick={() => {
              if (on) return;
              if (locked && id !== 'js-jobs') {
                nav.push('js-login');
                return;
              }
              nav.reset(id);
            }}
          >
            <span className="slot">
              {id === 'js-profile' && !locked ? <span className="tab-avatar">AR</span> : <Icon size={22} />}
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

const hrTabs = [
  { id: 'hr-home', label: 'Home', Icon: LayoutGrid },
  { id: 'hr-jobs', label: 'Jobs', Icon: Briefcase },
  { id: 'hr-candidates', label: 'Candidates', Icon: Users },
  { id: 'hr-interviews', label: 'Interviews', Icon: Calendar },
  { id: 'hr-more', label: 'More', Icon: Menu },
];

export function HrTabs({ active }: { active: string }) {
  const nav = useNav();
  return (
    <div className="tabbar hr">
      {hrTabs.map(({ id, label, Icon }) => {
        const on = id === active;
        return (
          <button key={id} className={on ? 'on' : ''} onClick={() => !on && nav.reset(id)}>
            <span className="slot">
              <Icon size={22} />
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ inputs */

export function Field({
  label,
  value,
  placeholder,
  right,
  area,
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  right?: ReactNode;
  area?: boolean;
}) {
  return (
    <label className="field">
      {label ? <span>{label}</span> : null}
      <span className="control">
        {area ? (
          <textarea className="input area" defaultValue={value} placeholder={placeholder} />
        ) : (
          <input className="input" defaultValue={value} placeholder={placeholder} />
        )}
        {right}
      </span>
    </label>
  );
}

export function Otp({ code = '4 8 1 2 0 9' }: { code?: string }) {
  const digits = code.split(' ');
  return (
    <div className="otp">
      {digits.map((digit, index) => (
        <i key={index} className={digit ? 'filled' : ''}>
          {digit}
        </i>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ buttons */

export function Primary({ children, to, action = 'push', off }: { children: ReactNode; to?: string; action?: 'push' | 'reset' | 'swap' | 'back'; off?: boolean }) {
  const nav = useNav();
  return (
    <button
      className={off ? 'btn off' : 'btn'}
      disabled={off}
      onClick={() => {
        if (!to) return;
        if (action === 'reset') nav.reset(to);
        else if (action === 'swap') nav.swap(to);
        else nav.push(to);
      }}
    >
      {children}
    </button>
  );
}

export function Ghost({ children, to, icon }: { children: ReactNode; to?: string; icon?: ReactNode }) {
  const nav = useNav();
  return (
    <button className="btn ghost" onClick={() => to && nav.push(to)}>
      {icon}
      {children}
    </button>
  );
}

export function Outline({ children, to }: { children: ReactNode; to?: string }) {
  const nav = useNav();
  return (
    <button className="btn outline" onClick={() => to && nav.push(to)}>
      {children}
    </button>
  );
}

export function TextLink({ children, to, accent, action = 'push' }: { children: ReactNode; to?: string; accent?: boolean; action?: 'push' | 'reset' | 'back' }) {
  const nav = useNav();
  return (
    <button
      className={accent ? 'text-btn accent' : 'text-btn'}
      onClick={() => {
        if (action === 'back') nav.back();
        else if (to) (action === 'reset' ? nav.reset : nav.push)(to);
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ rows */

export function MenuRow({
  icon: Icon,
  tint = 'transparent',
  color,
  title,
  sub,
  value,
  right,
  to,
  danger,
  action = 'push',
  onClick,
}: {
  icon?: ComponentType<{ size?: number; color?: string }>;
  tint?: string;
  color?: string;
  title: string;
  sub?: string;
  value?: string;
  right?: ReactNode;
  to?: string;
  danger?: boolean;
  action?: 'push' | 'reset';
  onClick?: () => void;
}) {
  const nav = useNav();
  const { mode } = useTheme();
  // Resolve icon color: explicit prop > danger red > theme-aware default
  const iconColor = danger ? '#ef4444' : color ?? (mode === 'dark' ? '#d1d5db' : '#111827');
  return (
    <button
      type="button"
      className={danger ? 'mrow danger' : 'mrow'}
      onClick={() => {
        if (onClick) onClick();
        else if (to) (action === 'reset' ? nav.reset(to) : nav.push(to));
      }}
    >
      {Icon && (
        <span className="ibox" style={{ background: tint }}>
          <Icon size={20} color={iconColor} />
        </span>
      )}
      <span className="body">
        <strong style={danger ? { color: '#ef4444' } : undefined}>{title}</strong>
        {sub ? <span>{sub}</span> : null}
      </span>
      {value ? (
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted-2)', marginRight: right ? 0 : 4 }}>
          {value}
        </span>
      ) : null}
      {right !== undefined ? right : <ChevronRight size={18} className="chev" />}
    </button>
  );
}

export function Choice({
  title,
  sub,
  on,
  to,
  icon: Icon,
  tint,
  color,
  action = 'push',
}: {
  title: string;
  sub?: string;
  on?: boolean;
  to?: string;
  icon?: ComponentType<{ size?: number; color?: string }>;
  tint?: string;
  color?: string;
  action?: 'push' | 'swap';
}) {
  const nav = useNav();
  return (
    <button
      className={on ? 'choice on' : 'choice'}
      onClick={() => to && (action === 'swap' ? nav.swap(to) : nav.push(to))}
    >
      {Icon ? (
        <span className="ibox" style={{ background: tint }}>
          <Icon size={20} color={color} />
        </span>
      ) : null}
      <span className="body">
        <strong>{title}</strong>
        {sub ? <span>{sub}</span> : null}
      </span>
      {on ? <Check size={18} color="#4432ff" /> : null}
    </button>
  );
}

export function Chips({ items, selected = [], scroll, onSelect }: { items: string[]; selected?: string[]; scroll?: boolean; onSelect?: (item: string) => void }) {
  return (
    <div className={scroll ? 'chips scrollx' : 'chips'}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={selected.includes(item) ? 'chip on' : 'chip'}
          onClick={() => onSelect?.(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function SearchBox({
  placeholder,
  value,
  onChange,
  band = true,
}: {
  placeholder: string;
  value?: string;
  onChange?: (val: string) => void;
  band?: boolean;
}) {
  const box = (
    <div className="searchbox">
      <Search size={18} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
  return band ? <div className="searchband">{box}</div> : box;
}

export function Avatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: color, fontSize: Math.round(size / 3) }}
    >
      {initials}
    </span>
  );
}

export function Pill({ children, bg, color }: { children: ReactNode; bg: string; color: string }) {
  return (
    <span className="pill" style={{ background: bg, color }}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ job card */

export type CardJob = {
  id?: string;
  title: string;
  company: string;
  initials: string;
  logoColor: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  salary: string;
  posted: string;
  match: number;
  applicationType?: 'QUICK_APPLY' | 'APPLY_NOW' | string;
  applyUrl?: string;
};

/** JobCard.tsx getJobTitleTypography — the title shrinks as it gets longer. */
function titleType(title: string, hasBadge: boolean) {
  const length = title.trim().length + (hasBadge ? 8 : 0);
  if (length <= 22) return { fontSize: 17, lineHeight: '22px' };
  if (length <= 32) return { fontSize: 15, lineHeight: '20px' };
  if (length <= 44) return { fontSize: 14, lineHeight: '19px' };
  if (length <= 56) return { fontSize: 13, lineHeight: '18px' };
  return { fontSize: 12, lineHeight: '17px' };
}

export function JobCard({
  job,
  to,
  saved,
  applied,
  guest,
  onApply,
  onToggleSave,
  onOpen,
}: {
  job: CardJob;
  to?: string;
  saved?: boolean;
  applied?: boolean;
  guest?: boolean;
  onApply?: (job: CardJob) => void;
  onToggleSave?: (job: CardJob) => void;
  onOpen?: (job: CardJob) => void;
}) {
  const nav = useNav();
  const isApplyNow = job.applicationType === 'APPLY_NOW';
  const applyLabel = applied
    ? 'Applied'
    : isApplyNow
    ? 'Apply Now'
    : 'Quick Apply';

  return (
    <div className="jobcard">
      <button
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        onClick={() => {
          if (onOpen) onOpen(job);
          else if (to) nav.push(to);
        }}
      >        <div className="top">
          <span className="logo" style={{ background: job.logoColor }}>
            {job.initials}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="title">
              <strong style={titleType(job.title, true)}>{job.title}</strong>
              <span className="match">
                <Sparkles size={12} /> {job.match}% MATCH
              </span>
            </div>
            <p className="company">{job.company}</p>
          </div>
        </div>
        <div className="tags">
          <span className="tag dept">{job.department}</span>
          <span className="tag">{job.type}</span>
          <span className="tag">{job.experience}</span>
        </div>
        <div className="loc">
          <span className="tag">
            <MapPin size={11} /> {job.location}
          </span>
        </div>
        <div className="meta">
          <span className="salary">{job.salary}</span>
          <span className="posted">{job.posted}</span>
        </div>
      </button>
      <div className="actions">
        <button
          className={applied ? 'apply done' : 'apply'}
          onClick={(e) => {
            e.stopPropagation();
            if (applied) return;
            if (guest) {
              nav.push('js-login');
            } else if (onApply) {
              onApply(job);
            } else {
              nav.push(isApplyNow ? 'js-apply-now' : 'js-apply');
            }
          }}
        >
          {applied ? null : <Sparkles size={16} />}
          {applyLabel}
        </button>
        <button
          className={saved ? 'save on' : 'save'}
          aria-label="Save job"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleSave) {
              onToggleSave(job);
            }
          }}
        >
          <Bookmark size={18} fill={saved ? '#4432ff' : 'transparent'} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ misc */

export function Stat({
  label,
  value,
  sub,
  subColor,
  icon: Icon,
  iconBg,
  iconColor,
  to,
}: {
  label: string;
  value: string | number;
  sub: string;
  subColor?: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  iconBg: string;
  iconColor: string;
  to?: string;
}) {
  const nav = useNav();
  return (
    <button className="stat" onClick={() => to && nav.reset(to)}>
      <span className="top">
        <span>{label}</span>
        <span className="ibox" style={{ background: iconBg }}>
          <Icon size={18} color={iconColor} />
        </span>
      </span>
      <b>{value}</b>
      <em style={subColor ? { color: subColor } : undefined}>{sub}</em>
    </button>
  );
}

export function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={on ? 'toggle on' : 'toggle'}>
      <i />
    </span>
  );
}

export function SettingRow({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="mrow" style={{ gap: 12 }}>
      <span className="body">
        <strong style={{ fontSize: 15 }}>{title}</strong>
        {sub ? <span>{sub}</span> : null}
      </span>
      {right}
    </div>
  );
}
