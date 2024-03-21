import { useEffect, useState } from 'react';
import { IProject } from '../Projects/store';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { projectCollection } from '../Projects/useProjects';

export const useProjectHook = (id: string | undefined) => {
  const [project, setProject] = useState<IProject | null>();
  useEffect(() => {
    let unsub: any = () => void 0;
    if (id)
      unsub = onSnapshot(doc(projectCollection, id), (pro) =>
        setProject(pro.data() as IProject)
      );
    return () => unsub();
  }, [id]);
  return { project };
};
