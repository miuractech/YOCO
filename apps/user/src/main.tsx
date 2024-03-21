import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider
  defaultColorScheme='dark'
    theme={{
      defaultRadius: 8,
      // primaryColor:"",
      components: {
        Modal: {
          defaultProps: {
            transitionProps: { transition: 'slide-down' },
          },
        },
      },
    }}
  >
    <BrowserRouter>
      <Notifications />
      <App />
    </BrowserRouter>
  </MantineProvider>
);
