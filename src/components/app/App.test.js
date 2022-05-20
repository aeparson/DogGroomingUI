import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import loginUser from '../header/HeaderService';

jest.mock('../header/HeaderService');
let container = null;

describe('App', () => {
  const fakeApp = {
    get: jest.fn(() => Promise.resolve({ email: 'abc@gmail.org', firstName: 'Arya', lastName: 'Stark' }))
  };

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders user info', () => {
    loginUser.mockImplementation();
    render(<App axios={fakeApp} />, container);
    // expect(localStorageMock.getItem.mock.calls.length).toBe(1);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
});
