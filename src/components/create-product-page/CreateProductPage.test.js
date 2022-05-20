import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import {
  render, screen, act, fireEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import CreateProductPage from './CreateProductPage';
import postNewProduct from './CreateProductPageService';

jest.mock('react-toastify');
jest.mock('./CreateProductPageService');

let container = null;
toast.configure();

describe('Create Product Component Tests', () => {
  function validForm() {
    // userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'valid name');
    // userEvent.type(screen.getByLabelText(/name/i), 'name');
    userEvent.type(screen.getByText(/name/i), 'names');

    userEvent.type(screen.getByText(/brand/i), 'brand');
    userEvent.type(screen.getByText(/category/i), 'category');
    userEvent.type(screen.getByText(/type/i), 'type');
    userEvent.type(screen.getByText(/material/i), 'material');
    userEvent.type(screen.getByText(/description/i), 'description');
    userEvent.type(screen.getByText(/demographic/i), 'men');
    userEvent.type(screen.getByText(/price/i), '10.54');
    userEvent.type(screen.getByText(/quantity/i), '50');
    userEvent.type(screen.getByRole('textbox', {
      name: /primary color code/i
    }), '#ffffff');
    userEvent.type(screen.getByText(/Secondary Color Code/i), '#ffffff');
    userEvent.type(screen.getByText(/style number/i), 'scGHIFT');
    const releaseDateFormInput = screen.getByLabelText(/release date/i);
    fireEvent.mouseDown(releaseDateFormInput);
    fireEvent.change(releaseDateFormInput, { target: { value: '2025-01-05' } });
    userEvent.type(screen.getByText(/image source/i), 'image');
    userEvent.click(screen.getByText(/active inactive/i), 'active');
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Renders the create product page without crashing', () => {
    render(<CreateProductPage />, container);
    validForm();
    expect(screen.getByText(/name/i)).toBeVisible();
  });

  it('Submits when all submitted info is valid', async () => {
    const toastCalls = [];
    toast.success.mockImplementation((text) => { toastCalls.push(text); });
    toast.error.mockImplementation((text) => { toastCalls.push(text); });
    // eslint-disable-next-line no-unused-vars
    postNewProduct.mockImplementation((newProductForm) => Promise.resolve({}));

    // navigate to page
    render(<CreateProductPage />, container);
    // fill out page with valid information
    validForm();
    // click the create product button
    await act(async () => {
      userEvent.click(screen.getByRole('button', {
        name: /create product/i
      }));
      // get a success toast
      expect(toastCalls).toEqual('Product created successfully.');
    });
  });

  it('shows error msg toast when an error is thrown', () => {
    const toastCalls = [];
    toast.success.mockImplementation((text) => { toastCalls.push(text); });
    toast.error.mockImplementation((text) => { toastCalls.push(text); });
    postNewProduct.mockImplementation((newProductForm, history) => {
      newProductForm(false);
    });
    render(<CreateProductPage />, container);

    userEvent.click(screen.getByRole('button', {
      name: /create product/i
    }));

    expect(toastCalls).toEqual(['Invalid input. Please check form for errors.']);
  });
});
