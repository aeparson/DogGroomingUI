import React from 'react';
import { ReactDOM, render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Reservations from './reservations';

jest.mock('./reservations]');
let container = null;

describe('Filter Menu Component Tests', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(Reservations, div);
  });

  it('changes to edit mode based on click', () => {
    const mockEditMode = jest.fn();

    act(() => {
      render(<Reservations edit={mockEditMode} />, container);
    });

    const editReservationSpot = document.querySelector('[data-testid=edit-spot]');

    editReservationSpot.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mockEditMode).toHaveBeenCalled();
  });
});
