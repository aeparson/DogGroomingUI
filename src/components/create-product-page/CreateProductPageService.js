import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export default async function postNewProduct(productData, setApiError) {
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'POST', productData)
    .then((response) => {
      if (response.ok) {
        return response.created();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(productData)
    .catch(() => {
      setApiError(true);
    });
}
