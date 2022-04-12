import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export default async function postNewProduct(newProductForm) {
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'POST', newProductForm)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(newProductForm)
    .catch(() => {
      ('Product not created.');
    });
}
