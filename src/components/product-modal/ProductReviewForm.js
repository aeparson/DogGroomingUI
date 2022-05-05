import React from 'react';
import styles from './ProductModal.module.css';

const AddProductReviewForm = ({
  formErrors,
  onChange, reviewData, user, product, invalidFields
}) => (
  <div className={styles.reviewFormFields}>
    <form>
      <label htmlFor="rating" className={styles.label}>
        Rating
        <br />
        <input
          className={styles.inputField}
          type="number"
          id="rating"
          max={5}
          min={1}
          value={reviewData.rating}
          onChange={onChange}
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
          onChange={onChange}
        />
        <p className={styles.errorField}>{formErrors.title}</p>
        <p className={styles.errorMaxLength}>{invalidFields.title}</p>
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
          onChange={onChange}
        />
        <p className={styles.errorField}>{formErrors.comment}</p>
        <p className={styles.errorMaxLength}>{invalidFields.comment}</p>
      </label>
    </form>
    <input type="hidden" id="userId" value={user} user={user} />
    <input type="hidden" id="productId" value={product} product={product} />
  </div>
);

export default AddProductReviewForm;
