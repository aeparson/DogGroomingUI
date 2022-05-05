/* eslint-disable import/no-duplicates */
import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import {
  render, cleanup, screen, act
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { toast } from 'react-toastify';
import AddReview from './AddReview';
import validate from './AddReview';
import postNewReview from './ProductReviewPageService';
import AddProductReviewForm from './ProductReviewForm';

jest.mock('./ProductReviewPageService');
jest.mock('./AddReview');
jest.mock('react-toastify');
const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistory
  })
}));

let container = null;

toast.configure();

describe('Add Review Component Tests', () => {
  const onSubmit = jest.fn();
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    postNewReview.mockImplementation((newReviewForm) => Promise.reject(
      Error
    ));
    validate.mockImplementation((reviewData) => [{}]);
    onSubmit.mockClear();
    render(<AddProductReviewForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('onSubmit is called when all fields pass validation', async () => {
    const rating = screen.getByRole('spinbutton', {
      name: /rating/i
    });
    user.type(rating, 3);
    const title = screen.getByRole('textbox', {
      name: /title/i
    });
    user.type(title, 'Awesome');
    const comment = screen.getByRole('textbox', {
      name: /comment/i
    });
    user.type(comment, 'Such a wonderful product. Loved it.');
    user.click(screen.getByRole('button', { name: /Submit/ }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        rating: 3,
        title: 'Awesome',
        comment: 'Such a wonderful product. Loved it.'
      });

      expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
    });
  });
});
