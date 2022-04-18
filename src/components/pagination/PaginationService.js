import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchActiveProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchActiveProducts(setProducts, page, setApiError) {
  await HttpHelper(`${Constants.PRODUCT_ENDPOINT}?page=${page}&itemsperpage=20`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch(() => {
      setApiError(false);
    });
}
/**
 *
 * @name fetchProductsCount
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setCount sets state for amount of products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for product count if 200 response, else sets state for apiError
 */
export async function fetchProductsCount(setCount, setApiError) {
  await HttpHelper(Constants.PRODUCT_COUNT_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setCount)
    .catch(() => {
      setApiError(false);
    });
}
