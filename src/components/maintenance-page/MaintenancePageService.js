import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchAllProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
async function fetchAllProducts(setProducts, setApiError) {
  await HttpHelper(Constants.ALL_PRODUCTS_ENDPOINT, 'GET')
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

/**
 *
 * @name deleteProductById
 * @description Utilizes HttpHelper to make a DELETE request to an API
 * @param {int} productId id of product to be deleted
 * @returns a deleted product or throws an error
 */
async function deleteProductById(productId) {
  await HttpHelper(`${Constants.ALL_PRODUCTS_ENDPOINT}/${productId}`, 'DELETE')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('Product has reviews');
      }
      throw new Error(Constants.API_ERROR);
    });
}

export { fetchAllProducts, deleteProductById };
