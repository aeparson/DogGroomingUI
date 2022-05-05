import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchProductReviews
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProductReviews sets state for reviews
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchProductReviews(productId, setProductReviews, setApiError) {
  await HttpHelper(`${Constants.PRODUCT_REVIEWS_ENDPOINT}?productId=${productId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProductReviews)
    .catch(() => {
      setApiError(true);
    });
}
