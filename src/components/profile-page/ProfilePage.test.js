// import React from 'react';
// import { unmountComponentAtNode } from 'react-dom';
import ReactDOM from 'react-dom';
// import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(ProfilePage, div);
//   ReactDOM.unmountComponentAtNode(div);
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
