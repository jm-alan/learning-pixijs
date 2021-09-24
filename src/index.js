import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import App from './App';
import configureStore from './store';

import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.dispatch = store.dispatch;
}

function Root () {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  useEffect(() => {
  }, [dispatch]);

  return (
    <BrowserRouter>
      <App />
      <canvas ref={canvasRef} id='canvas' />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
