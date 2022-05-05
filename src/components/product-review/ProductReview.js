import { Box, Typography } from '@material-ui/core';
import React from 'react';
import StarRating from '../star-rating/StarRating';

import styles from './ProductReview.module.css';

/**
 * Formats a date for readability.
 * @param {string} dateString The datePosted property of a review object
 * @returns A nicely formatted date.
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

function ProductReview({ productReview }) {
  return (
    <Box className={styles.review} mb="2rem">
      <Typography className={styles.reviewTitle}>{productReview.title}</Typography>
      <Box className={styles.reviewData} my="0.5rem">
        <StarRating rating={productReview.rating} className={styles.reviewRating} />
        <Typography
          className={styles.reviewDate}
          variant="body2"
        >
          {formatDate(productReview.datePosted)}
        </Typography>
      </Box>
      <Typography className={styles.reviewComment} variant="body2">{productReview.comment}</Typography>
    </Box>
  );
}

export default ProductReview;
