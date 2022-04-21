import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { CartProvider } from './components/checkout-page/CartContext';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
