// import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
// import { render, screen } from '@testing-library/react';
// import CheckoutPage from './CheckoutPage';
// import makePurchase from './CheckoutService';

jest.mock('./CheckoutService');
let container = null;

describe('Checkout Page Component Tests', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
});
