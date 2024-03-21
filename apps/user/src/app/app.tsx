import { userStore } from '../MIDL/UserAuth/store';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '@codebase/configs';
import Projects from '../MIDL/Projects';
import { useStore } from './store';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import {Project} from '../MIDL/project';
import { LoadingOverlay } from '@mantine/core';
import Auth from '../MIDL/UserAuth/index.ui';
export function App() {
  const { setUser,user } = useStore();
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      setUser(cred);
    });
    return () => Unsubscribe();
  }, []);
  if (user === undefined) return <LoadingOverlay visible />;
  else if (!user) return <Auth />;
  return (
    <div className="text-center">
      <Routes>
        <Route index element={<Projects />} />
        <Route path="project" element={<Outlet />}>
          <Route path=":projectId" element={<Project />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
