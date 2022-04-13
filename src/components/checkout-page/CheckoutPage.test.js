import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import CheckoutPage from './CheckoutPage';
import makePurchase from './CheckoutService';
import { useCart } from './CartContext';
import validatePurchase from './CheckoutValidation';

jest.mock('./CheckoutService');
jest.mock('./CartContext');
jest.mock('./CheckoutValidation');
jest.mock('react-toastify');
const mockHistory = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistory
  })
}));

let container = null;

toast.configure();

describe('Checkout Page Component Tests', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);

    // Some default mocked functions
    useCart.mockImplementation(() => React.useContext(
      React.createContext({
        state: {
          products: [{
            price: 1, title: '1', description: '1', quantity: 1
          }]
        }
      })
    ));
    // eslint-disable-next-line no-unused-vars
    makePurchase.mockImplementation((products, delivery, billing, creditCard) => Promise.resolve(
      false
    ));
    // eslint-disable-next-line no-unused-vars
    validatePurchase.mockImplementation((delivery, billing, credit) => [{}, {}]);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('shows error toast and does not redirect when api fails', async () => {
    const toastCalls = [];
    toast.error.mockImplementation((text) => { toastCalls.push(text); });

    render(
      <CheckoutPage />, container
    );

    await act(async () => {
      userEvent.click(screen.getByText('Checkout'));
    });

    expect(toastCalls).toEqual(['Transaction could not be processed']);
    expect(mockHistory).not.toHaveBeenCalled();
  });

  it('redirects when transaction is successful', async () => {
    // eslint-disable-next-line no-unused-vars
    makePurchase.mockImplementation((products, delivery, billing, creditCard) => Promise.resolve(
      {} // Successful transaction returns an object
    ));

    render(
      <CheckoutPage />, container
    );
    await act(async () => {
      userEvent.click(screen.getByText('Checkout'));
    });

    expect(mockHistory).toHaveBeenCalledWith('/confirmation');
  });

  it('toasts and does not redirect when form is invalid', async () => {
    // eslint-disable-next-line no-unused-vars
    validatePurchase.mockImplementation((delivery, billing, credit) => [{ field: 'message' }, {}]); // Fake error
    const toastCalls = [];
    toast.error.mockImplementation((text) => { toastCalls.push(text); });

    render(
      <CheckoutPage />, container
    );

    await act(async () => {
      userEvent.click(screen.getByText('Checkout'));
    });

    expect(toastCalls).toEqual(['Transaction could not be processed']);
    expect(mockHistory).not.toHaveBeenCalled();
  });
});
