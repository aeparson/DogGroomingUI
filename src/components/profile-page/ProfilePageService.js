import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchUserPurchase
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPurchase sets state for data
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function fetchUserPurchase(setPurchase, setApiError) {
  await HttpHelper(`${Constants.PURCHASE_ENDPOINT}/customer@home.com`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPurchase)
    .catch(() => {
      setApiError(true);
    });
}

export default fetchUserPurchase;
