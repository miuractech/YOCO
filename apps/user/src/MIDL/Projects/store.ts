import { User } from 'firebase/auth';
import { StateCreator, create } from 'zustand';
import { IRootstate } from '../../app/store';
import { INodeType } from '../nodes/types';

export interface IProject extends INodeType {
  projectId: string;
  description: string;
  updatedAt?: string;
  uid?: string;
  image?: string;
}

export interface IProjectStore {
  projects: IProject[] | null | undefined;
  setProjects: (projects: IProject[] | null) => void;
}
export const projectStore: StateCreator<IRootstate, [], [], IProjectStore> = (
  set
) => ({
  projects: undefined,
  setProjects: (projects) => set(() => ({ projects: projects })),
});
