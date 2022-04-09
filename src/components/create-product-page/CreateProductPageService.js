import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export default async function postNewProduct(newProduct, setApiError) {
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'POST', newProduct)
    .then((response) => {
      if (response.ok) {
        return response.created();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(newProduct)
    .catch(() => {
      setApiError(true);
    });
}
