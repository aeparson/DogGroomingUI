import validatePurchase from './CheckoutValidation';

describe('Checkout Page Validation Tests', () => {
  it('returns Required for each empty required field', () => {
    expect(validatePurchase({
      deliveryFirstName: '', deliveryLastName: '        ', deliveryStreet: undefined, deliveryCity: '', deliveryState: ' ', deliveryZip: undefined
    }, {}, {})).toEqual(
      [
        {
          deliveryCity: 'Required',
          deliveryFirstName: 'Required',
          deliveryLastName: 'Required',
          deliveryState: 'Required',
          deliveryStreet: 'Required',
          deliveryZip: 'Required'
        },
        {
          billingCity: 'Required',
          billingState: 'Required',
          billingStreet: 'Required',
          billingZip: 'Required',
          cardNumber: 'Required',
          cardholder: 'Required',
          cvv: 'Required',
          email: 'Required',
          expiration: 'Required',
          phone: 'Required'
        }
      ]
    );
  });
});
