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

  it('validates that delivery first and last name contain only letters, periods, apostrophes and hyphens', () => {
    const invalid = { deliveryFirstName: 'May only contain letters, periods, and hyphens', deliveryLastName: 'May only contain letters, periods, and hyphens' };
    // Spaces
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: 'a b', deliveryLastName: '  a' }, validBilling, validCreditCard)[0]).toEqual(invalid);
    // Numbers
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: 'abc123', deliveryLastName: '5' }, validBilling, validCreditCard)[0]).toEqual(invalid);
    // Special Characters
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: '@', deliveryLastName: '!' }, validBilling, validCreditCard)[0]).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: '*', deliveryLastName: '&' }, validBilling, validCreditCard)[0]).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: '(', deliveryLastName: '}' }, validBilling, validCreditCard)[0]).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: '%', deliveryLastName: '^' }, validBilling, validCreditCard)[0]).toEqual(invalid);
    // Valid
    expect(validatePurchase({ ...validDelivery, deliveryFirstName: 'A-b\'c.', deliveryLastName: '--\'..a' }, validBilling, validCreditCard)[0]).toEqual({});
  });

  it('validates that phone number contains 10 digits with optional formatting', () => {
    // Too short
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '123456789' }, validCreditCard)[1].phone).toEqual('Must be 10 digits, e.g. (123) 456-7890');
    // Too long
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '12345678901' }, validCreditCard)[1].phone).toEqual('Must be 10 digits, e.g. (123) 456-7890');
    // Alphabetical characters
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '123456789a' }, validCreditCard)[1].phone).toEqual('Must be 10 digits, e.g. (123) 456-7890');
    // Special characters
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '123456789 ' }, validCreditCard)[1].phone).toEqual('Must be 10 digits, e.g. (123) 456-7890');
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '123456789)' }, validCreditCard)[1].phone).toEqual('Must be 10 digits, e.g. (123) 456-7890');
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '123456789-' }, validCreditCard)[1].phone).toEqual('Must be 10 digits, e.g. (123) 456-7890');
    // Valid
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '1234567890' }, validCreditCard)[1]).toEqual({});
    // Valid with formatting
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '(123) 456-7890' }, validCreditCard)[1]).toEqual({});
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '123-456-7890' }, validCreditCard)[1]).toEqual({});
    expect(validatePurchase(validDelivery, { ...validBilling, phone: '(123)-456 7890' }, validCreditCard)[1]).toEqual({});
  });

  it('validates that email address is properly formatted as [alphanumeric username]@[period-separated alphabetic subdomains]', () => {
    const errorMessage = 'Must be formatted as user@email.com';
    // Numeric domain
    expect(validatePurchase(validDelivery, { ...validBilling, email: 'abc@123.org' }, validCreditCard)[1].email).toEqual(errorMessage);
    // Special characters username
    expect(validatePurchase(validDelivery, { ...validBilling, email: '1 3@abc.org' }, validCreditCard)[1].email).toEqual(errorMessage);
    expect(validatePurchase(validDelivery, { ...validBilling, email: '1\'3@abc.org' }, validCreditCard)[1].email).toEqual(errorMessage);
    expect(validatePurchase(validDelivery, { ...validBilling, email: 'abc@123.org' }, validCreditCard)[1].email).toEqual(errorMessage);
    // Ends with .
    expect(validatePurchase(validDelivery, { ...validBilling, email: '123@abc.' }, validCreditCard)[1].email).toEqual(errorMessage);
    // Valid
    expect(validatePurchase(validDelivery, { ...validBilling, email: 'abc123@abc.co.uk' }, validCreditCard)[1]).toEqual({});
  });

  it('validates that delivery and billing street only contain letters, numbers, spaces, hyphens, apostrophes, and periods', () => {
    const invalid = [{ deliveryStreet: 'Invalid characters' }, { billingStreet: 'Invalid characters' }];
    expect(validatePurchase({ ...validDelivery, deliveryStreet: '*' }, { ...validBilling, billingStreet: '#' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryStreet: '&' }, { ...validBilling, billingStreet: '^' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryStreet: '(' }, { ...validBilling, billingStreet: ')' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryStreet: '[' }, { ...validBilling, billingStreet: '}' }, validCreditCard)).toEqual(invalid);

    expect(validatePurchase({ ...validDelivery, deliveryStreet: '123 ABC-DEF\'s Ln. ' }, { ...validBilling, billingStreet: '. 1a\'-' }, validCreditCard)).toEqual([{}, {}]);
  });
  it('validates that delivery and billing street2 only contain letters, numbers, spaces, hyphens, apostrophes, and periods', () => {
    const invalid = [{ deliveryStreet2: 'Invalid characters' }, { billingStreet2: 'Invalid characters' }];
    expect(validatePurchase({ ...validDelivery, deliveryStreet2: '*' }, { ...validBilling, billingStreet2: '#' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryStreet2: '&' }, { ...validBilling, billingStreet2: '^' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryStreet2: '(' }, { ...validBilling, billingStreet2: ')' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryStreet2: '[' }, { ...validBilling, billingStreet2: '}' }, validCreditCard)).toEqual(invalid);

    expect(validatePurchase({ ...validDelivery, deliveryStreet2: '123 ABC-DEF\'s Ln. ' }, { ...validBilling, billingStreet2: '. 1a\'-' }, validCreditCard)).toEqual([{}, {}]);
  });

  it('validates that delivery and billing city only contain letters, spaces, hyphens, apostrophes and periods', () => {
    const invalid = [{ deliveryCity: 'Invalid characters' }, { billingCity: 'Invalid characters' }];
    // Numbers
    expect(validatePurchase({ ...validDelivery, deliveryCity: '1' }, { ...validBilling, billingCity: '12345' }, validCreditCard)).toEqual(invalid);
    // Special characters
    expect(validatePurchase({ ...validDelivery, deliveryCity: '*' }, { ...validBilling, billingCity: '&' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryCity: 'a_x' }, { ...validBilling, billingCity: '$' }, validCreditCard)).toEqual(invalid);
    expect(validatePurchase({ ...validDelivery, deliveryCity: '%' }, { ...validBilling, billingCity: '+' }, validCreditCard)).toEqual(invalid);
    // Valid
    expect(validatePurchase({ ...validDelivery, deliveryCity: 'A a - \' .' }, { ...validBilling, billingCity: 'a-\'.' }, validCreditCard)).toEqual([{}, {}]);
  });

  it('validates that zip code contains 5 or 9 digits, with optional hyphen after first 5 digits', () => {
    const invalid = [{ deliveryZip: 'Must be 5 or 9 numerical digits' }, { billingZip: 'Must be 5 or 9 numerical digits' }];
    // Too short
    expect(validatePurchase({ ...validDelivery, deliveryZip: '1234' }, { ...validBilling, billingZip: '1' }, validCreditCard)).toEqual(invalid);
    // Too long
    expect(validatePurchase({ ...validDelivery, deliveryZip: '1234567890123' }, { ...validBilling, billingZip: '1234567890' }, validCreditCard)).toEqual(invalid);
    // Between 5 and 9
    expect(validatePurchase({ ...validDelivery, deliveryZip: '123456' }, { ...validBilling, billingZip: '12345678' }, validCreditCard)).toEqual(invalid);
    // Alphabetical characters
    expect(validatePurchase({ ...validDelivery, deliveryZip: 'abcde' }, { ...validBilling, billingZip: 'fghijklmn' }, validCreditCard)).toEqual(invalid);
    // Special characters
    expect(validatePurchase({ ...validDelivery, deliveryZip: '12345*1235' }, { ...validBilling, billingZip: '12345+1234' }, validCreditCard)).toEqual(invalid);
    // Valid
    expect(validatePurchase({ ...validDelivery, deliveryZip: '12345' }, { ...validBilling, billingZip: '123456789' }, validCreditCard)).toEqual([{}, {}]);
    // Valid with formatting
    expect(validatePurchase({ ...validDelivery, deliveryZip: '12345' }, { ...validBilling, billingZip: '12345-6789' }, validCreditCard)).toEqual([{}, {}]);
  });
});
