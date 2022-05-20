import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MaintenancePage from './MaintenancePage';
import { fetchAllProducts, deleteProductById } from './MaintenancePageService';
import { fetchUserPurchase } from '../profile-page/ProfilePageService';
// import { createArrayLiteral } from 'typescript';

jest.mock('./MaintenancePageService');
jest.mock('../profile-page/ProfilePageService');
jest.mock('react-toastify');
let container = null;

toast.configure();
describe('Maintenance Page Component Tests', () => {
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

  it('shows error msg text when an error is thrown', () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(true);
    });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    expect(screen.getByTestId('errMsg')).toHaveTextContent('Oops, something went wrong');
  });

  it('shows 21 columns in each row and one row per product', () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{ id: 0, price: 80.00 }, { id: 1, price: 80.00 }]);
    });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    expect(screen.getAllByRole('columnheader').length).toBe(21);
    expect(screen.getAllByRole('row').length).toEqual(3);
  });

  it('sorts products based on id', () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{ id: 5, price: 80.00 },
        { id: 999999999, price: 80.00 },
        { id: 0, price: 80.00 }]);
    });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    const rows = screen.getAllByRole('row');
    expect(rows[0].childNodes[1].textContent).toBe('ID');
    expect(rows[1].childNodes[1].textContent).toBe('0');
    expect(rows[2].childNodes[1].textContent).toBe('5');
    expect(rows[3].childNodes[1].textContent).toBe('999999999');
  });

  it('displays delete button only when product has no reviews', () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{ id: 5, price: 80.00 },
        { id: 1, price: 80.00, reviewCount: 0 },
        { id: 2, price: 80.00, reviewCount: 10 }]);
    });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    const rows = screen.getAllByRole('row');
    expect(rows[1].childNodes[0].childNodes.length).toBe(1);
    expect(rows[2].childNodes[0].childNodes.length).toBe(0);
  });

  it('toasts a success message when a product is deleted', async () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{
        name: 'testProduct', id: 1, price: 10.00, reviewCount: 0
      }]);
    });
    deleteProductById.mockImplementation(async (productId) => productId);
    const toastCalls = [];
    toast.success.mockImplementation((text) => { toastCalls.push(text); });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    await act(async () => {
      userEvent.click(screen.getByTestId('delete 1'));
    });
    expect(toastCalls).toEqual(['testProduct successfully deleted.']);
  });
  it('toasts an error message when product is not deleted', async () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{ id: 1, price: 10.00, reviewCount: 0 }]);
    });
    deleteProductById.mockImplementation(async (productId) => { throw Error(productId); });
    fetchUserPurchase.mockImplementation();
    const toastCalls = [];
    toast.error.mockImplementation((text) => { toastCalls.push(text); });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    await act(async () => {
      userEvent.click(screen.getByTestId('delete 1'));
    });
    expect(toastCalls).toEqual(['Server Error. Product not deleted. Please try again.']);
  });

  // it('modal opens when attempt to delete a product that has been purchased', async () => {
  //   fetchAllProducts.mockImplementation((setProducts, setApiError) => {
  //     setApiError(false);
  //     setProducts([{
  //       name: 'testProduct', id: 1, price: 10.00, reviewCount: 0, active: true
  //     }]);
  //   });
  //   fetchUserPurchase.mockImplementation((setPurchase) => {
  //     setPurchase([{
  //       // object that looks like a purchase
  //       lineItems: [
  //         {
  //           productId: 1,
  //           quantity: 1,
  //           productName: 'Next Gen Soccer Wristband'
  //         }
  //       ]
  //     }]);
  //   });
  //   deleteProductById.mockImplementation(async (productId) => productId);
  //   const toastCalls = [];
  //   toast.success.mockImplementation((text) => { toastCalls.push(text); });
  //   render(
  //     <BrowserRouter>
  //       <MaintenancePage />
  //     </BrowserRouter>, container
  //   );
  //   await act(async () => {
  //     userEvent.click(screen.getByTestId('delete 1'));
  //   });
  //   expect(screen.getByText('Next Gen Soccer Wristband')).toBeEnabled();
  // });
});
