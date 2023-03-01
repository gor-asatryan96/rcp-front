import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupAxios } from './api/axios';
import App from './components/App/App';
import { store } from './redux/store';
import ConnectProvider from './providers/ConnectProvider';

import './assets/translations';
import './assets/styles/index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

const root = createRoot(container);

setupAxios();

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectProvider>
        <App />
      </ConnectProvider>
    </Provider>
  </BrowserRouter>,
);
