import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 * Sends a request to update a review with new data
 * @param {*} reviewId ID of review to be updated
 * @param {*} newReviewForm Updated review data
 * @returns The updated review, or displays an error toast and returns nothing
 */
export default async function updateReview(reviewId, newReviewForm) {
  await HttpHelper(`${constants.PRODUCT_REVIEWS_ENDPOINT}/${reviewId}`, 'PUT', newReviewForm)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    });
}
