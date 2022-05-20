import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import postNewReview from './ProductReviewPageService';
import AddProductReviewForm from './ProductReviewForm';
import validateReview from './ReviewValidation';
import styles from './ProductModal.module.css';

const AddReview = ({
  user, product, setShowReviews, setShow
}) => {
  const initialValues = { rating: 0, title: '', comment: '' };

  const [reviewData, setReviewData] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const handleReviewCreate = async () => {
    const errors = validateReview(reviewData);
    if (errors !== null && errors !== undefined && Object.keys(errors).length === 0) {
      const newReviewForm = {
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        userId: user.id,
        productId: product.id
      };
      await postNewReview(newReviewForm);
      setShow(false);
      setShowReviews(false);
      setShowReviews(true);
    } else {
      toast.error('Invalid input. Please check form for errors.');
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <AddProductReviewForm
        data-testid="addProductReviewForm"
        reviewData={reviewData}
        setReviewData={setReviewData}
        product={product}
        user={user}
        formErrors={formErrors}
      />
      <Button
        type="submit"
        onClick={handleReviewCreate}
        className={styles.addReview}
        variant="outlined"
        size="small"
      >
        Submit
      </Button>
      <Button
        type="submit"
        onClick={() => {
          setShow(false);
        }}
        variant="outlined"
        size="small"
        style={{ marginLeft: '1rem' }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default AddReview;
