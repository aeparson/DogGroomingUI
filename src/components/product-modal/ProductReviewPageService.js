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
      ('Review not created.');
    });
}
