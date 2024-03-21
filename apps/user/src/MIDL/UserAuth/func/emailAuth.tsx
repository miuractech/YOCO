import { auth, environment } from '@codebase/configs';
import { defaultErrorMessage } from '@codebase/constants';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { authType } from '../index.ui';
export const emailAuth = async (mode: 'login' | 'register', data: authType) => {
  try {
    if (mode === 'login') {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } else {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    }
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Log In!',
          message: 'Email Already in use',
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
        break;
      case 'auth/invalid-credential':
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Invalid credentials!',
          message: 'Check your password',
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
        break;
      default:
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Not Authorised!',
          message: environment.production ? defaultErrorMessage : error.message,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
    }
  }
};
