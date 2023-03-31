import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ReactQueryProvider from 'providers/ReactQueryProvider';
import ConnectProvider from 'providers/ConnectProvider';
import AlertProvider from 'providers/AlertProvider';
import { setupAxios } from 'api/axios';
import App from 'components/App/App';
import { store } from 'redux/store';

import 'assets/translations';
import 'assets/styles/index.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

const root = createRoot(container);

setupAxios();

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ReactQueryProvider>
        <AlertProvider>
          <ConnectProvider>
            <App />
          </ConnectProvider>
        </AlertProvider>
      </ReactQueryProvider>
    </Provider>
  </BrowserRouter>,
);
