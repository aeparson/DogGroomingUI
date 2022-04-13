import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { ToastContainer, toast } from 'react-toastify';
import CheckoutPage from './CheckoutPage';
import makePurchase from './CheckoutService';
import { useCart } from './CartContext';

jest.mock('./CheckoutService');
jest.mock('./CartContext');
let container = null;

toast.configure();

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

  it('shows error toast when api fails', () => {
    // eslint-disable-next-line no-unused-vars
    makePurchase.mockImplementation((products, delivery, billing, creditCard) => false);
    useCart.mockImplementation(() => {
      React.useContext(React.createContext({ state: { products: [] } }));
    });
    render(
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          limit={1}
        />
        <CheckoutPage />
      </>, container
    );
    expect(screen.findByText('Transaction could not be processed')).toBeInTheDocument();
  });
});
