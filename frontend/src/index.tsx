import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupAxios } from './api/axios';

import App from './App';
import './assets/styles/index.css';
import { store } from './redux/store';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

const root = createRoot(container);

setupAxios();

root.render(
  <Provider store={store}>
    <App isTest age={45} />
  </Provider>,
);
