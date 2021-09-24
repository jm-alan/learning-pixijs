import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';

import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.dispatch = store.dispatch;
}

function Root () {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
