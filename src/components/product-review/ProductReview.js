import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../star-rating/StarRating';
import EditReview from '../product-modal/EditReview';
import styles from './ProductReview.module.css';
import DeleteReviewButton from '../product-modal/DeleteReviewButton';

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

function ProductReview({
  productReview, user, product, update
}) {
  const deleteProductReview = () => {
    if (user.id === productReview.userId) {
      return (
        <DeleteReviewButton
          update={update}
          productReview={productReview}
          user={user}
          product={product}
        />
      );
    }
    return '';
  };

  const [edit, setEdit] = useState(false);
  const handleEditClick = () => {
    setEdit(!edit);
  };
  if (edit) {
    return (
      <EditReview
        user={user}
        review={productReview}
        product={{ id: productReview.productId }}
        setShow={setEdit}
        update={update}
      />
    );
  }
  return (
    <Box className={styles.review} mb="2rem">
      <Typography className={styles.reviewTitle}>{productReview.title}</Typography>
      <Box className={styles.reviewData} my="0.5rem">
        <StarRating rating={productReview.rating} className={styles.reviewRating} />
        {user.id === productReview.userId && (
          <>
            <IconButton
              onClick={handleEditClick}
              className={styles.actionButton}
              style={{ padding: 5 }}
            >
              <FontAwesomeIcon icon={faPencil} style={{ width: '17px', height: '16.5px', color: 'black' }} />
            </IconButton>
            {deleteProductReview(productReview, user, product, update)}
          </>
        )}
        <Typography
          className={styles.reviewDate}
          variant="body2"
          style={{ marginLeft: 'auto' }}
        >
          {formatDate(productReview.datePosted)}
        </Typography>
      </Box>
      <Typography className={styles.reviewComment} variant="body2">
        {productReview.comment}
        {' '}
        {(productReview.datePosted !== productReview.dateModified) && (
        <Typography
          variant="body2"
          style={{ color: '#969696', display: 'inline', whiteSpace: 'nowrap' }}
        >
          {`(edited: ${formatDate(productReview.dateModified)})`}
        </Typography>
        )}
      </Typography>
    </Box>
  );
}

export default ProductReview;
