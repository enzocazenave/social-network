import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

import 'animate.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
)
