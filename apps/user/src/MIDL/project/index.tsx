import { Loader } from '@mantine/core';

import { useParams } from 'react-router-dom';


import 'reactflow/dist/style.css';
import { useProjectHook } from './hooks';
import ProjectView from './projectView';


export function Project() {
  const { projectId } = useParams();
  const { project } = useProjectHook(projectId);
  if (project) {
    return <ProjectView project={project} />;
  } else {
    return <Loader />;
  }
}
