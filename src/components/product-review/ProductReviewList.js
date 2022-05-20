import { List } from '@material-ui/core';
import React from 'react';
import ProductReview from './ProductReview';

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

function ProductReviewList({
  user, sortOrder, reviews, updateReviews, product
}) {
  return (
    <>
      <List className={styles.reviewList}>
        {reviews
          .slice()
          .sort(sortOrder === 'descending' ? sortDateDescending : sortDateAscending)
          .map((review) => (
            <ProductReview
              key={review.id}
              user={user}
              productReview={review}
              update={updateReviews}
              product={product}
            />
          ))}
      </List>
    </>
  );
}

export default ProductReviewList;
