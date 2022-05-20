import React, { useState } from 'react';
import StarRatingInput from '../star-rating-input/StarRatingInput';
import styles from './ProductModal.module.css';

const AddProductReviewForm = ({
  formErrors, reviewData, setReviewData, user, product
}) => {
  const [errorMaxLength, setErrorMaxLength] = useState({});

  // eslint-disable-next-line consistent-return
  const handleReviewChange = (e) => {
    const { id, value } = e.target;
    if (id === 'title' && value.length > 100) {
      setReviewData({ ...reviewData, [id]: value.slice(0, 100) });
      setErrorMaxLength({ title: 'Character limit of 100 has been reached.' });
    } else if (id === 'comment' && value.length > 2000) {
      setReviewData({ ...reviewData, [id]: value.slice(0, 2000) });
      setErrorMaxLength({ comment: 'Character limit of 2000 has been reached.' });
    } else { setReviewData({ ...reviewData, [id]: value }); }
  };

  return (
    <div className={styles.reviewFormFields}>
      <form>
        <label htmlFor="rating" className={styles.label}>
          Rating
          <br />
          <StarRatingInput
            rating={reviewData.rating}
            onChange={(value) => setReviewData({ ...reviewData, rating: value })}
          />
          <p className={styles.errorField}>{formErrors.rating}</p>
        </label>
        <br />
        <label htmlFor="title" className={styles.label}>
          Title
          <br />
          <textarea
            className={styles.inputField}
            type="textarea"
            id="title"
            label="Title"
            value={reviewData.title}
            onChange={handleReviewChange}
          />
          <p className={styles.errorField}>{formErrors.title}</p>
          <p className={styles.errorMaxLength}>{errorMaxLength.title}</p>
        </label>
        <br />
        <label htmlFor="comment" className={styles.label}>
          Comment
          <br />
          <textarea
            className={styles.inputField}
            type="textarea"
            id="comment"
            label="Comment"
            value={reviewData.comment}
            onChange={handleReviewChange}
          />
          <p className={styles.errorField}>{formErrors.comment}</p>
          <p className={styles.errorMaxLength}>{errorMaxLength.comment}</p>
        </label>
      </form>
      <input type="hidden" id="userId" value={user} user={user} />
      <input type="hidden" id="productId" value={product} product={product} />
    </div>
  );
};

export default AddProductReviewForm;
