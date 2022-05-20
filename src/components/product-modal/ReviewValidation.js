/**
 * Validates that review contains a title, comment, and rating.
 * Validates that comment is 100 characters or fewer and title is 2000 characters or fewer.
 * @param {Object} value contains review form data
 * @returns errors object
 */
const validateReview = (value) => {
  const errors = {};
  const isEmpty = (field) => {
    if (field === undefined || field === null || field.trim().length === 0) {
      return true;
    }
    return false;
  };

  if (value.rating === 0) {
    errors.rating = 'Rating is required.';
  } else if (value.rating > 5 || value.rating < 1) {
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

export default validateReview;
