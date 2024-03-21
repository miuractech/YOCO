import { auth, environment } from "@codebase/configs";
import { defaultErrorMessage } from "@codebase/constants";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();
export const googleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: 'Not Authorised!',
        message: environment.production
          ? defaultErrorMessage
          : error.message,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }