import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
export default async function makePurchase(products, deliveryAddress, billingAddress,
  creditCard, purchaseTotal) {
  const removePunctuation = (data) => data.replace(/[^\w]|_/g, '');
  return HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
    lineItems: products,
    deliveryAddress: {
      ...deliveryAddress,
      // 12345-6789 => 123456789
      deliveryZip: removePunctuation(deliveryAddress.deliveryZip)
    },
    billingAddress: {
      ...billingAddress,
      billingZip: removePunctuation(billingAddress.billingZip),
      // (123)-456-7890 => 1234567890
      phone: removePunctuation(billingAddress.phone)
    },
    creditCard,
    purchaseTotal: purchaseTotal.substring(1)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    });
}
