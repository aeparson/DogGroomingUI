import React from 'react';
import { ReactDOM, render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProfilePage from './ProfilePage';

jest.mock('./ProfilePage]');
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
    ReactDOM.render(ProfilePage, div);
  });

  it('changes to edit mode based on click', () => {
    const mockEditMode = jest.fn();

    act(() => {
      render(<ProfilePage edit={mockEditMode} />, container);
    });

    const editProfileSpot = document.querySelector('[data-testid=edit-spot]');

    editProfileSpot.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mockEditMode).toHaveBeenCalled();
  });

  // it('renders welcome message', () => {
  //   render(ProfilePage);
  //   expect(screen.getByText('')).toBeInTheDocument();
  // });

// it('shows error msg text when an error is thrown', () => {
//   fetchProducts.mockImplementation((setProducts, setApiError) => {
//     setApiError(true);
//   });
//   render(
//     <ProfilePage />, container
//   );
//   expect(screen.getByTestId('errMsg')).toHaveTextContent('Oops, something went wrong');
// });
});
