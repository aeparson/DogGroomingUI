import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchDemographicProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchDemographicProducts(setProducts, setApiError, page, filterAddy) {
  await HttpHelper(`${Constants.PRODUCT_ENDPOINT}?filterBy=demographic${filterAddy}&page=${page}&itemsperpage=20`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch(() => {
      setApiError(true);
    });
}
