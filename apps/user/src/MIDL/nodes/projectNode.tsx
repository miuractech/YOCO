import { IProject } from '../Projects/store';
import { BaseNode } from './baseNode';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@codebase/configs';
import { v1 } from 'uuid';
import { INodeContent } from '../contents/types';

export const ProjectNode: any = ({ data }: { data: IProject }) => {
  const updateProject = (newContents: INodeContent[]) => {
    return updateDoc(doc(collection(db, `projects`), data.projectId), {
      contents: newContents,
    });
  };
  return (
    <BaseNode
      data={data}
      addContent={(type) => {
        updateDoc(doc(collection(db, `projects`), data.projectId), {
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
