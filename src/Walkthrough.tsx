import { useEffect, useMemo, useState } from 'react';
import { Signal, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

import { NavProvider, useNav } from './nav';
import { useTheme } from './theme';
import { FiltersSheet, JobseekerDrawer } from './overlays';
import { indexScreens, type ScreenDef } from './registry';

function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <span className="island" />
      <span className="status-icons">
        <Signal size={14} strokeWidth={2.4} />
        <Wifi size={14} strokeWidth={2.4} />
        <i className="batt" />
      </span>
    </div>
  );
}

function SyncStory({ initial }: { initial: string }) {
  const { reset } = useNav();
  useEffect(() => {
    reset(initial);
  }, [initial, reset]);
  return null;
}

function useDeviceScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const measure = () => {
      const byHeight = (window.innerHeight - 88) / 844;
      const byWidth = (window.innerWidth - 48) / 390;
      setScale(Math.max(0.55, Math.min(1, byHeight, byWidth)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return scale;
}

function Phone({ screens }: { screens: Map<string, ScreenDef> }) {
  const nav = useNav();
  const { mode } = useTheme();
  const screen = screens.get(nav.current.id) ?? [...screens.values()][0];

  return (
    <div className="device">
      <div className="device-screen" data-theme={mode}>
        <StatusBar />
        <div className="stack">
          <div className={`page ${nav.current.transition}`} key={nav.current.id + nav.depth}>
            {screen ? screen.render() : null}
          </div>
          {nav.overlay === 'filters' ? <FiltersSheet /> : null}
          {nav.overlay === 'drawer' ? <JobseekerDrawer /> : null}
        </div>
        <div className="homebar" />
      </div>
    </div>
  );
}

export function Walkthrough({
  story,
  list,
  initial,
}: {
  story: 'jobseeker' | 'employer';
  list: ScreenDef[];
  initial: string;
}) {
  const screens = useMemo(() => indexScreens(list), [list]);
  const scale = useDeviceScale();

  return (
    <NavProvider key={story} initial={initial}>
      <SyncStory initial={initial} />
      <div className="studio">
        <header className="studio-bar">
          <Link className="brand" to="/">
            <img src="/logo.png" alt="" />
            Applywizard
          </Link>
          <nav>
            <Link to="/jobseeker" className={story === 'jobseeker' ? 'on' : ''}>
              Jobseeker
            </Link>
            <Link to="/employer" className={story === 'employer' ? 'on' : ''}>
              Employer
            </Link>
          </nav>
        </header>
        <main className="studio-main">
          <div className="device-slot" style={{ width: 390 * scale, height: 844 * scale }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
              <Phone screens={screens} />
            </div>
          </div>
        </main>
      </div>
    </NavProvider>
  );
}
