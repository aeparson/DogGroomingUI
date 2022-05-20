import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import AddProductReviewForm from './ProductReviewForm';

let container = null;

describe('Star Rating Input tests', () => {
  // const
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

  it('Contains a star rating input', () => {
    let reviewData = { rating: 0, title: '', comment: '' };
    const handler = jest.fn((obj) => { reviewData = obj; });

    render(<AddProductReviewForm
      formErrors={{}}
      reviewData={reviewData}
      setReviewData={handler}
      user={{}}
      product={{}}
    />);

    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');
    const yellowStars = highlightedContainer.querySelectorAll('[data-icon="star"]');

    expect(greyStars.length).toEqual(5);
    expect(yellowStars.length).toEqual(5);
  });

  it('Initially has no stars highlighted', () => {
    let reviewData = { rating: 0, title: '', comment: '' };
    const handler = jest.fn((obj) => { reviewData = obj; });

    render(<AddProductReviewForm
      formErrors={{}}
      reviewData={reviewData}
      setReviewData={handler}
      user={{}}
      product={{}}
    />);

    const highlightedContainer = screen.getByTestId('highlightedContainer');

    expect(highlightedContainer.style.width).toEqual('0.00%');
  });

  it('Highlights stars when clicked', () => {
    let reviewData = { rating: 0, title: '', comment: '' };
    const handler = jest.fn((obj) => { reviewData = obj; });

    render(<AddProductReviewForm
      formErrors={{}}
      reviewData={reviewData}
      setReviewData={handler}
      user={{}}
      product={{}}
    />);

    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('0.00%');
    fireEvent.click(greyStars[3]);
    expect(highlightedContainer.style.width).toEqual('80.00%');
  });

  it('Calls a function when clicked', () => {
    let reviewData = { rating: 0, title: '', comment: '' };
    const handler = jest.fn((obj) => { reviewData = obj; });

    render(<AddProductReviewForm
      formErrors={{}}
      reviewData={reviewData}
      setReviewData={handler}
      user={{}}
      product={{}}
    />);

    const greyContainer = screen.getByTestId('greyContainer');

    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');

    fireEvent.click(greyStars[3]);
    expect(handler).toHaveBeenCalled();
  });

  it('Updates review data when clicked', () => {
    let reviewData = { rating: 0, title: '', comment: '' };
    const handler = jest.fn((obj) => { reviewData = obj; });

    render(<AddProductReviewForm
      formErrors={{}}
      reviewData={reviewData}
      setReviewData={handler}
      user={{}}
      product={{}}
    />);

    const greyContainer = screen.getByTestId('greyContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');

    fireEvent.click(greyStars[3]);
    expect(reviewData.rating).toEqual(4);
  });
});
