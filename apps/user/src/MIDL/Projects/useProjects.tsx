import { useEffect } from 'react';
import { useStore } from '../../app/store';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@codebase/configs';
import { IProject } from './store';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export const projectCollection = collection(db, 'projects')
export const useProjects = () => {
  const { projects, setProjects } = useStore();
  useEffect(() => {
    getDocs(projectCollection)
      .then((snap) => {
        if (snap.empty) {
          setProjects(null);
        } else {
          setProjects(
            snap.docs.map((d) => ({ ...d.data(), id: d.id })) as IProject[]
          );
        }
      })
      .catch((e) => {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error!',
          message: 'Unexpected error happened. try again!',
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      });
  }, []);
  return { projects };
};
