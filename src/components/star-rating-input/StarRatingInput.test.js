import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import StarRatingInput, { testExports } from './StarRatingInput';

let container = null;

describe('ratingToNearestQuarter unit tests', () => {
  const { ratingToNearestQuarter } = testExports;

  it('Correctly rounds down', () => {
    const rating = 3.874;
    expect(ratingToNearestQuarter(rating)).toEqual(3.75);
  });

  it('Correctly rounds up', () => {
    const rating = 2.875;
    expect(ratingToNearestQuarter(rating)).toEqual(3);
  });

  it('Is idempotent if rating is at nearest quarter', () => {
    const rating = 1;
    expect(ratingToNearestQuarter(rating)).toEqual(1);
  });
});

describe('getPercentage unit tests', () => {
  const { getPercentage } = testExports;

  it('Returns a string with length 5', () => {
    const rating = 3.141592654;
    expect(getPercentage(rating).length).toEqual(5);
  });

  it('Returns a string of length 6 if 5 stars', () => {
    const rating = 5;
    expect(getPercentage(rating).length).toEqual(6);
  });

  it('Correctly rounds down', () => {
    const rating = 2.874;
    expect(getPercentage(rating)).toEqual('55.00');
  });

  it('Correctly rounds up', () => {
    const rating = 1.125;
    expect(getPercentage(rating)).toEqual('25.00');
  });

  it('Correctly handles ratings at nearest quarter', () => {
    const rating = 4.5;
    expect(getPercentage(rating)).toEqual('90.00');
  });
});

describe('Component tests', () => {
  const noop = () => { };

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

  it('Throws an error if rating is not a number', () => {
    const rating = 'foo';
    expect(() => render(<StarRatingInput rating={rating} onChange={noop} />, container))
      .toThrow(`Error parsing rating prop with value ${rating} into numeric value.`);
  });

  it('Is all grey with rating 0', () => {
    render(<StarRatingInput rating={0} onChange={noop} />);
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    expect(highlightedContainer.style.width).toEqual('0.00%');
  });

  it('Is all yellow with rating 5', () => {
    render(<StarRatingInput rating={5} onChange={noop} />);
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    expect(highlightedContainer.style.width).toEqual('100.00%');
  });

  it('Has 5 grey stars and 5 yellow stars', () => {
    render(<StarRatingInput rating={0} onChange={noop} />);
    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');
    const yellowStars = highlightedContainer.querySelectorAll('[data-icon="star"]');

    expect(greyStars.length).toEqual(5);
    expect(yellowStars.length).toEqual(5);
  });

  it('Lights up when clicked', () => {
    render(<StarRatingInput rating={0} onChange={noop} />);
    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('0.00%');

    fireEvent.click(greyStars[0]);
    expect(highlightedContainer.style.width).toEqual('20.00%');

    fireEvent.click(greyStars[1]);
    expect(highlightedContainer.style.width).toEqual('40.00%');

    fireEvent.click(greyStars[2]);
    expect(highlightedContainer.style.width).toEqual('60.00%');

    fireEvent.click(greyStars[3]);
    expect(highlightedContainer.style.width).toEqual('80.00%');

    fireEvent.click(greyStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');
  });

  it('Goes dark when clicked', () => {
    render(<StarRatingInput rating={5} onChange={noop} />);
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const yellowStars = highlightedContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('100.00%');

    fireEvent.click(yellowStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');

    fireEvent.click(yellowStars[3]);
    expect(highlightedContainer.style.width).toEqual('80.00%');

    fireEvent.click(yellowStars[2]);
    expect(highlightedContainer.style.width).toEqual('60.00%');

    fireEvent.click(yellowStars[1]);
    expect(highlightedContainer.style.width).toEqual('40.00%');

    fireEvent.click(yellowStars[0]);
    expect(highlightedContainer.style.width).toEqual('20.00%');
  });

  it('Lights up when hovered', () => {
    render(<StarRatingInput rating={0} onChange={noop} />);
    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('0.00%');

    fireEvent.mouseEnter(greyStars[0]);
    expect(highlightedContainer.style.width).toEqual('20.00%');

    fireEvent.mouseEnter(greyStars[1]);
    expect(highlightedContainer.style.width).toEqual('40.00%');

    fireEvent.mouseEnter(greyStars[2]);
    expect(highlightedContainer.style.width).toEqual('60.00%');

    fireEvent.mouseEnter(greyStars[3]);
    expect(highlightedContainer.style.width).toEqual('80.00%');

    fireEvent.mouseEnter(greyStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');
  });

  it('Goes dark when hovered after click', () => {
    render(<StarRatingInput rating={0} onChange={noop} />);
    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');
    const yellowStars = highlightedContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('0.00%');
    fireEvent.click(greyStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');

    fireEvent.mouseEnter(yellowStars[0]);
    expect(highlightedContainer.style.width).toEqual('20.00%');

    fireEvent.mouseEnter(yellowStars[1]);
    expect(highlightedContainer.style.width).toEqual('40.00%');

    fireEvent.mouseEnter(yellowStars[2]);
    expect(highlightedContainer.style.width).toEqual('60.00%');

    fireEvent.mouseEnter(yellowStars[3]);
    expect(highlightedContainer.style.width).toEqual('80.00%');

    fireEvent.mouseEnter(yellowStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');
  });

  it('Retains rating after hover', () => {
    render(<StarRatingInput rating={0} onChange={noop} />);
    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');
    const yellowStars = highlightedContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('0.00%');
    fireEvent.click(greyStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');

    fireEvent.mouseEnter(yellowStars[2]);
    expect(highlightedContainer.style.width).toEqual('60.00%');

    fireEvent.mouseLeave(yellowStars[2]);
    expect(highlightedContainer.style.width).toEqual('100.00%');
  });

  it('Calls a handler when clicked', () => {
    const handler = jest.fn();
    render(<StarRatingInput rating={0} onChange={handler} />);
    const greyContainer = screen.getByTestId('greyContainer');
    const highlightedContainer = screen.getByTestId('highlightedContainer');
    const greyStars = greyContainer.querySelectorAll('[data-icon="star"]');

    expect(highlightedContainer.style.width).toEqual('0.00%');
    fireEvent.click(greyStars[4]);
    expect(highlightedContainer.style.width).toEqual('100.00%');

    expect(handler).toHaveBeenCalled();
  });
});
