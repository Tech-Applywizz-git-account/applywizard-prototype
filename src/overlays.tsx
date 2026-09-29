import { Bookmark, Briefcase, Check, FileText, LogOut, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

import { FILTER_CATEGORIES, FILTER_CITIES, FILTER_DATE_POSTED, FILTER_EMPLOYMENT_TYPES, FILTER_EXPERIENCE } from './data';
import { useNav } from './nav';

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function ChipRow({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="filter-section">
      <p>{title}</p>
      <div className="chips">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={selected.includes(option) ? 'chip on' : 'chip'}
            onClick={() => onToggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

/** features/jobseeker/components/FiltersModal.tsx */
export function FiltersSheet() {
  const nav = useNav();
  const [cities, setCities] = useState(['Hyderabad']);
  const [categories, setCategories] = useState(['Finance']);
  const [experience, setExperience] = useState(['0-1 yrs']);
  const [types, setTypes] = useState(['Full-time']);
  const [datePosted, setDatePosted] = useState<string | null>(null);

  return (
    <div className="overlay">
      <button className="backdrop" type="button" aria-label="Close filters" onClick={nav.close} />
      <div className="sheet">
        <i className="handle" />
        <div className="sheet-head">
          <h2>Filters</h2>
          <button className="iconbtn" type="button" aria-label="Close" onClick={nav.close}>
            <X size={22} />
          </button>
        </div>
        <div className="sheet-body">
          <div className="filter-section">
            <p>DATE POSTED</p>
            <div className="chips">
              {FILTER_DATE_POSTED.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={datePosted === option.id ? 'chip on' : 'chip'}
                  onClick={() => setDatePosted(datePosted === option.id ? null : option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <ChipRow title="CITY" options={FILTER_CITIES} selected={cities} onToggle={(value) => setCities(toggle(cities, value))} />
          <ChipRow
            title="CATEGORY"
            options={FILTER_CATEGORIES}
            selected={categories}
            onToggle={(value) => setCategories(toggle(categories, value))}
          />
          <ChipRow
            title="EXPERIENCE"
            options={FILTER_EXPERIENCE}
            selected={experience}
            onToggle={(value) => setExperience(toggle(experience, value))}
          />
          <ChipRow
            title="EMPLOYMENT TYPE"
            options={FILTER_EMPLOYMENT_TYPES}
            selected={types}
            onToggle={(value) => setTypes(toggle(types, value))}
          />
        </div>
        <div className="sheet-foot">
          <button
            className="text-btn accent"
            type="button"
            onClick={() => {
              setCities([]);
              setCategories([]);
              setExperience([]);
              setTypes([]);
              setDatePosted(null);
            }}
          >
            Clear all
          </button>
          <button className="btn sm" type="button" style={{ flex: 1 }} onClick={nav.close}>
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

/** features/jobseeker/components/JobseekerDrawer.tsx */
export function JobseekerDrawer() {
  const nav = useNav();
  const items = [
    { title: 'All jobs', subtitle: 'Browse everything', Icon: Briefcase, to: 'js-jobs' },
    { title: 'Find a job', subtitle: 'Quick Apply', Icon: Sparkles, to: 'js-jobs' },
    { title: 'Saved', subtitle: 'Jobs you bookmarked', Icon: Bookmark, to: 'js-saved' },
    { title: 'My applications', subtitle: 'Track your applications', Icon: FileText, to: 'js-applied' },
  ];

  return (
    <div className="overlay">
      <button className="backdrop" type="button" aria-label="Close menu" onClick={nav.close} />
      <aside className="drawer">
        <div className="drawer-head">
          <span className="brand-icon">
            <Briefcase size={18} color="#fff" />
          </span>
          <span>
            <strong>Jobs</strong>
            <em>Browse · apply · track</em>
          </span>
          <button className="iconbtn" type="button" aria-label="Close" onClick={nav.close}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-list">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === 0 ? 'drawer-item on' : 'drawer-item'}
              onClick={() => nav.reset(item.to)}
            >
              <span className="item-icon">
                <item.Icon size={18} color={index === 0 ? '#fff' : '#4432ff'} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <em>{item.subtitle}</em>
              </span>
              {index === 0 ? <Check size={18} color="#4432ff" /> : null}
            </button>
          ))}
        </div>
        <button className="logout-row" type="button" onClick={() => nav.reset('js-login')}>
          <LogOut size={20} color="#ef4444" />
          Log out
        </button>
      </aside>
    </div>
  );
}
