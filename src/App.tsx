import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { employerScreens, jobseekerScreens } from './registry';
import { Walkthrough } from './Walkthrough';

function Start() {
  return (
    <div className="start">
      <img className="start-mark" src="/logo.png" alt="Applywizard" />
      <h1>Applywizard</h1>
      <p>Open the same screens as the mobile app. Tap inside the phone to move — nothing plays on its own.</p>
      <div className="start-actions">
        <Link className="start-card" to="/jobseeker">
          <img src="/logo.png" alt="" />
          <div>
            <strong>I’m looking for a job</strong>
            <span>Log in, verify, browse jobs, and apply.</span>
          </div>
        </Link>
        <Link className="start-card" to="/employer">
          <img src="/logo.png" alt="" />
          <div>
            <strong>I’m hiring</strong>
            <span>Create a workspace, post a job, and review candidates.</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Story() {
  const { pathname } = useLocation();
  const employer = pathname.startsWith('/employer');
  return (
    <Walkthrough
      key={employer ? 'employer' : 'jobseeker'}
      story={employer ? 'employer' : 'jobseeker'}
      list={employer ? employerScreens : jobseekerScreens}
      initial={employer ? 'hr-account' : 'js-login'}
    />
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/jobseeker" element={<Story />} />
      <Route path="/employer" element={<Story />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
