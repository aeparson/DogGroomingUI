import validatePurchase from './CheckoutValidation';

describe('Checkout Page Validation Tests', () => {
  const validDelivery = {
    deliveryFirstName: 'John', deliveryLastName: 'Doe', deliveryStreet: 'Easy Street', deliveryCity: 'Chicago', deliveryState: 'IL', deliveryZip: '12345'
  };
  const validBilling = {
    billingStreet: 'Easy Street', billingCity: 'Chicago', billingState: 'IL', billingZip: '12345', phone: '123-456-7890', email: '123@abc.com'
  };
  const validCreditCard = {
    cardNumber: '1111222233334444', cvv: '123', cardholder: 'John Doe', expiration: '12/99'
  };
  it('returns Required for each empty required field', () => {
    // When every field is empty
    expect(validatePurchase({
      deliveryFirstName: '', deliveryLastName: '        ', deliveryStreet: undefined, deliveryCity: '', deliveryState: ' ', deliveryZip: null
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
    // When only some fields are empty
    expect(validatePurchase(validDelivery, { ...validBilling, billingCity: undefined, billingZip: '' }, { ...validCreditCard, cardholder: null })).toEqual(
      [
        {},
        {
          billingCity: 'Required',
          billingZip: 'Required',
          cardholder: 'Required'
        }
      ]
    );
  });

  it('accurately validates card number with Luhn algorithm', () => {
    // Invalid:
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '1111222233334445' })[1].cardNumber).toEqual('Invalid card number');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '4485693264690289' })[1].cardNumber).toEqual('Invalid card number');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '5596241844241422' })[1].cardNumber).toEqual('Invalid card number');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '6011158594983307' })[1].cardNumber).toEqual('Invalid card number');
    // Valid:
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '1111222233334444' })[1]).toEqual({});
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '4485693264690288' })[1]).toEqual({});
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '5596241844241421' })[1]).toEqual({});
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '6011158594983306' })[1]).toEqual({});
  });

  it('validates card number format', () => {
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '11112222333344444' })[1].cardNumber).toEqual('Must be 16 numerical digits');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '111122223333444' })[1].cardNumber).toEqual('Must be 16 numerical digits');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: '111122223333444a' })[1].cardNumber).toEqual('Must be 16 numerical digits');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardNumber: 'aaaabbbbccccdddd' })[1].cardNumber).toEqual('Must be 16 numerical digits');
  });

  it('validates CVV format', () => {
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cvv: '1234' })[1].cvv).toEqual('Must be three numerical digits');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cvv: 'abc' })[1].cvv).toEqual('Must be three numerical digits');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cvv: '999' })[1]).toEqual({});
  });

  it('validates expiration format', () => {
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, expiration: '20/99' })[1].expiration).toEqual('Month must be between 1 and 12');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, expiration: '00/99' })[1].expiration).toEqual('Month must be between 1 and 12');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, expiration: 'march/99' })[1].expiration).toEqual('Must be formatted as MM/YY');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, expiration: '10/99' })[1]).toEqual({});
  });

  it('validates expiration date is in the future', () => {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    if (currentMonth < 10) {
      currentMonth = `0${currentMonth}`;
    }
    const currentYear = currentDate.getFullYear() % 100;
    const lastMonth = (currentMonth === 1) ? `12/${(currentYear - 1) % 100}` : `0${currentMonth - 1}/${currentYear}`;
    // Expired:
    // By year
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, expiration: `${currentMonth}/${(currentYear - 1)}` })[1].expiration)
      .toEqual('Card is expired');
    // By month
    expect(validatePurchase(validDelivery, validBilling, {
      ...validCreditCard,
      expiration: lastMonth
    })[1].expiration)
      .toEqual('Card is expired');
    // Valid:
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, expiration: `${currentMonth}/${currentYear}` })[1])
      .toEqual({});
  });

  it('validates that cardholder contains only letters, spaces, hyphens, or apostrophes', () => {
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardholder: 'Typo @' })[1].cardholder).toEqual('Invalid characters');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardholder: '& Typo' })[1].cardholder).toEqual('Invalid characters');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardholder: '|_(^_^)_/*' })[1].cardholder).toEqual('Invalid characters');
    expect(validatePurchase(validDelivery, validBilling, { ...validCreditCard, cardholder: 'Cthulu Amon-Gorloth-Ayi\'ig' })[1]).toEqual({});
  });
});
