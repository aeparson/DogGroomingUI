import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/// summary- creates an HTTP helper function to post the new promo code to the API

export default async function postNewPromoCode(newPromoCodeForm, history) {
  await HttpHelper(constants.PROMO_CODE_ENDPOINT, 'POST', newPromoCodeForm)
    .then((response) => {
      if (response.status === 201) {
        history.push('/maintenance');
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      toast.error('Invalid entry. Please check form for details.');
    });
}
