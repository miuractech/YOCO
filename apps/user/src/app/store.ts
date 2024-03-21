import { create } from 'zustand';
import { IUserStore, userStore } from '../MIDL/UserAuth/store';
import { IProjectStore,projectStore } from '../MIDL/Projects/store';

export interface IRootstate extends IUserStore,IProjectStore {}

export const useStore = create<IRootstate>()((...a) => ({
  ...userStore(...a),
  ...projectStore(...a),
}));
