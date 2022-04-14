import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export default async function postNewProduct(newProductForm, history) {
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'POST', newProductForm)
    .then((response) => {
      if (response.ok) {
        toast.success('Product created successfully.');
        history.push('/maintenance');
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      ('Product not created.');
    });
}
