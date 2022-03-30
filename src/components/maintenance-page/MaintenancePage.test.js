import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import MaintenancePage from './MaintenancePage';
import fetchProducts from '../product-page/ProductPageService';

jest.mock('../product-page/ProductPageService');
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
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(true);
    });
    render(
      <MaintenancePage />, container
    );
    expect(screen.getByTestId('errMsg')).toHaveTextContent('Oops, something went wrong');
  });

  it('shows 20 columns in each row and one row per product', () => {
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(false);
      setProducts([{ id: 0, price: 80.00 }, { id: 1, price: 80.00 }]);
    });
    render(
      <MaintenancePage />, container
    );
    expect(screen.getAllByRole('columnheader').length).toBe(20);
    expect(screen.getAllByRole('row').length).toEqual(3);
  });
});
