import { auth, environment } from "@codebase/configs";
import { defaultErrorMessage } from "@codebase/constants";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GithubAuthProvider();
export const githubAuth = async () => {
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