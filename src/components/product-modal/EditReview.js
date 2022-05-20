import { React, useState } from 'react';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import AddProductReviewForm from './ProductReviewForm';
import validateReview from './ReviewValidation';
import updateReview from './EditReviewService';

/**
 * Displays edit review form and buttons; sends request to update review
 * @returns A review form, a cancel button, and a submit button.
 */
const EditReview = ({
  user, product, review, setShow, update
}) => {
  const initialValues = {
    rating: review.rating,
    title: review.title,
    comment: review.comment
  };

  const [reviewData, setReviewData] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const handleReviewEdit = async () => {
    const newReviewForm = {
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      userId: review.userId,
      productId: review.productId
    };
    if (reviewData.rating !== review.rating
       || reviewData.title !== review.title
       || reviewData.comment !== review.comment) {
      const errors = validateReview(reviewData);
      if (errors !== null && errors !== undefined && Object.keys(errors).length === 0) {
        updateReview(review.id, newReviewForm).then(() => {
          setShow(false);
          update();
          toast.success('Review successfully updated');
        }).catch(() => toast.error('A server error occurred. Your updates have not been saved.'));
      } else {
        setFormErrors(validateReview(reviewData));
        toast.error('Invalid input. Please check form for errors.');
      }
    } else {
      // If no changes were made, close the form without sending a request
      setShow(false);
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
        onClick={handleReviewEdit}
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

export default EditReview;
