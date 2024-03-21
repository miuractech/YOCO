import { User } from 'firebase/auth';
import { StateCreator } from 'zustand';
import { IRootstate } from '../../app/store';

export interface IUserStore {
  user: User | null | undefined;
  setUser: (userProfile: User | null) => void;
}

export const userStore:StateCreator<IRootstate,[],[],IUserStore> = ((set) => ({
  user: undefined,
  setUser: (userProfile) => set(() => ({ user: userProfile })),
}));
