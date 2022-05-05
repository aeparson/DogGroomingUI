import { List } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import fetchProductReviews from './ProductReviewService';
import ProductReview from './ProductReview';
import Constants from '../../utils/constants';

import styles from './ProductReviewList.module.css';

/**
 * Comparison functions for sorting reviews by date.
 * @param {review} review1
 * @param {review} review2
 * @returns Positive int, negative int, or zero
 */
const sortDateDescending = (review1, review2) => new Date(review2.datePosted)
  - new Date(review1.datePosted);
const sortDateAscending = (review1, review2) => new Date(review1.datePosted)
  - new Date(review2.datePosted);

function ProductReviewList({ productId, sortOrder }) {
  const [reviews, setReviews] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProductReviews(productId, setReviews, setApiError);
  }, [productId]);

  return (
    <>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <List className={styles.reviewList}>
        {reviews
          .slice()
          .sort(sortOrder === 'descending' ? sortDateDescending : sortDateAscending)
          .map((review) => (
            <ProductReview
              key={review.id}
              productReview={review}
            />
          ))}
      </List>
    </>
  );
}

export default ProductReviewList;
