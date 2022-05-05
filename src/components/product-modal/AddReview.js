import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import postNewReview from './ProductReviewPageService';
import AddProductReviewForm from './ProductReviewForm';
import styles from './ProductModal.module.css';

const AddReview = ({
  user, product, setShowReviews, setShow
}) => {
  const initialValues = { rating: '', title: '', comment: '' };

  const [reviewData, setReviewData] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const [errorMaxLength, setErrorMaxLength] = useState({});

  const [isSubmit, setIsSumbit] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      postNewReview(); setShowReviews(false);
      setShow(false);
      setShowReviews(true);
    }
  }, [formErrors, isSubmit, setShow, setShowReviews]);

  const validate = (value) => {
    const errors = {};
    const isEmpty = (field) => {
      if (field === undefined || field === null || field.trim().length === 0) {
        return true;
      }
      return false;
    };
    if (isEmpty(value.rating)) {
      errors.rating = 'Rating is required.';
    }
    if (value.rating > 5 || value.rating < 1) {
      errors.rating = 'Rating must be a whole number between 1 and 5';
    }
    if (isEmpty(value.title)) {
      errors.title = 'Title is required.';
    }
    if (value.title.trim().length > 100) {
      errors.title = 'Character limit of 100 has been reached.';
    }
    if (isEmpty(value.comment)) {
      errors.comment = 'Comment is required.';
    }
    if (value.comment.trim().length > 2000) {
      errors.comment = 'Character limit of 2000 has been reached.';
    }
    return errors;
  };

  // eslint-disable-next-line consistent-return
  const handleReviewChange = (e) => {
    const { id, value } = e.target;
    const invalidFields = {};
    if (id === 'title' && value.length === 101) {
      setReviewData({ ...reviewData, [id]: value.slice(0, 100) });
      invalidFields.title = 'Character limit of 100 has been reached.';
      setErrorMaxLength({ title: invalidFields.title });
      return invalidFields;
    }
    if (id === 'comment' && value.length === 2001) {
      setReviewData({ ...reviewData, [id]: value.slice(0, 2000) });
      invalidFields.comment = 'Character limit of 2000 has been reached.';
      setErrorMaxLength({ comment: invalidFields.comment });
      return invalidFields;
    } setReviewData({ ...reviewData, [id]: value });
  };

  const handleReviewCreate = async () => {
    setFormErrors(validate(reviewData));
    setIsSumbit(!isSubmit);
    const newReviewForm = {
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      userId: user.id,
      productId: product.id
    };
    const errors = validate(reviewData);
    if (errors !== null && errors !== undefined && Object.keys(errors).length === 0) {
      await postNewReview(newReviewForm);
      setShowReviews(false);
      setShow(false);
      setShowReviews(true);
    }
  };

  return (
    <div>
      <AddProductReviewForm
        data-testid="addProductReviewForm"
        onChange={handleReviewChange}
        reviewData={reviewData}
        product={product}
        user={user}
        formErrors={formErrors}
        invalidFields={errorMaxLength}
      />
      <Button
        type="submit"
        onClick={() => { handleReviewCreate(); }}
        className={styles.addReview}
        variant="outlined"
        size="small"
      >
        Submit
      </Button>
    </div>
  );
};

export default AddReview;
