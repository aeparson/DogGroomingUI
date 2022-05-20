import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export default async function postNewReview(newReviewForm) {
  await HttpHelper(constants.PRODUCT_REVIEWS_ENDPOINT, 'POST', newReviewForm)
    .then((response) => {
      if (response.ok) {
        toast.success('Review created successfully.');
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      toast.error('Review not created.');
    });
}

/**
 *
 * @name deleteReview
 * @description Utilizes HttpHelper to make a DELETE request to an API
 * @param {int} reviewId reviewId of user review to be deleted
 * @param {string} productName name of product to be deleted
 * @returns a deleted review returns success toast
 */
export async function deleteReview(reviewId, productName) {
  await HttpHelper(`${constants.PRODUCT_REVIEWS_ENDPOINT}/${reviewId}`, 'DELETE')
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.ok) {
        toast.success(`Review for ${productName} successfully deleted`);
        return response.text();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      toast.error('A server error occurred. Your review has not been deleted.');
    });
}
