import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import MaintenancePage from './MaintenancePage';
import fetchAllProducts from './MaintenancePageService';

jest.mock('./MaintenancePageService');
let container = null;

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

  it('shows 20 columns in each row and one row per product', () => {
    fetchAllProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{ id: 0, price: 80.00 }, { id: 1, price: 80.00 }]);
    });
    render(
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>, container
    );
    expect(screen.getAllByRole('columnheader').length).toBe(20);
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
    expect(rows[0].firstChild.textContent).toBe('ID');
    expect(rows[1].firstChild.textContent).toBe('0');
    expect(rows[2].firstChild.textContent).toBe('5');
    expect(rows[3].firstChild.textContent).toBe('999999999');
  });
});
