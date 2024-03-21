import { IProject } from '../Projects/store';
import { BaseNode } from './baseNode';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@codebase/configs';
import { v1 } from 'uuid';
import { INodeContent } from '../contents/types';
import { useParams } from 'react-router-dom';

export const BranchNode: any = ({ data }: { data: IProject }) => {
  const {projectId} = useParams()
  const updateProject = (newContents: INodeContent[]) => {
    return updateDoc(doc(collection(db, `projects/${projectId}/nodes`), data.id), {
      contents: newContents,
    });
  };
  return (
    <BaseNode
      data={data}
      addContent={(type) => {
        updateDoc(doc(collection(db, `projects/${projectId}/nodes`), data.id), {
          contents: arrayUnion({
            id: v1(),
            title: '',
            type: type, // Plain text content or markdown
            content: '',
          }),
        });
      }}
      updateContent={updateProject}
    />
  );
};
