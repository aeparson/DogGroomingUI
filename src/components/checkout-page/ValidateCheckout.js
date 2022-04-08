const isEmpty = (field) => {
  if (field === undefined || field.trim().length === 0) {
    return true;
  }
  return false;
};

/**
 * Validates that all required address fields are filled in
 * @param {Object} address
 * @returns a list of error objects {field: field, message: 'Required'}
 */
const validateAddress = (address) => {
  const invalidFields = [];
  const requiredFields = ['street', 'city', 'state', 'zip'];
  requiredFields.forEach((field) => {
    if (isEmpty(address[field])) {
      invalidFields.push({ field, message: 'Required' });
    }
  });
  return invalidFields;
};

/**
 * Validates that the cvv is three numerical digits
 * @param {string} cvv
 * @returns true if valid, otherwise an error message
 */
const validateCVV = (cvv) => {
  if (isEmpty(cvv)) {
    return 'Required';
  }
  if (cvv.match(/^[0-9]{3}$/)) {
    return true;
  }
  return 'Must be three numerical digits';
};

/**
 * Validates that a card number passes the Luhn algorithm
 * @param {string} cardNumber
 * @returns true if valid, false if not
 */
const validateLuhn = (cardNumber) => {
  let sum = 0;
  for (let i = 0; i < cardNumber.length; i += 1) {
    if (i % 2 === 0) {
      if (cardNumber[i] * 2 >= 10) {
        sum += ((cardNumber[i] * 2) - 9);
      } else {
        sum += cardNumber[i] * 2;
      }
    } else {
      sum += parseInt(cardNumber[i], 10);
    }
  }
  return (sum % 10 === 0);
};

/**
 * Validates that a card number contains 16 numerical digits and passes the Luhn algorithm
 * @param {string} cardNumber
 * @returns true if valid, otherwise an error message
 */
const validateCardNumber = (cardNumber) => {
  if (isEmpty(cardNumber)) {
    return 'Required';
  }
  if (cardNumber.match(/^[0-9]{16}$/)) {
    if (validateLuhn(cardNumber)) {
      return true;
    }
    return 'Invalid card number';
  }
  return 'Must be 16 numerical digits';
};

/**
 * Validates that an expiration date is formatted as MM/YY, and that that date is in the future
 * @param {string} expiration
 * @returns true if valid, otherwise an error message
 */
const validateExpiration = (expiration) => {
  if (isEmpty(expiration)) {
    return 'Required';
  }
  if (expiration.match(/^[0-9]{2}\/[0-9]{2}$/)) {
    const month = parseInt(expiration.substring(0, 2), 10);
    const year = parseInt(`20${expiration.substring(3)}`, 10);
    if (month === 0 || month > 12) {
      return 'Month must be between 1 and 12';
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    if (year === currentYear) {
      if (month < currentMonth) {
        return 'Card is expired';
      }
      return true;
    } if (year < currentYear) {
      return 'Card is expired';
    }
    return true;
  }
  return 'Must be formatted as MM/YY';
};

/**
 * Validates that cardHolder only uses alphabetical characters, whitespace, apostrophes, and hyphens
 * @param {string} cardHolder
 * @returns true if valid, otherwise and error message
 */
const validateCardHolder = (cardHolder) => {
  if (isEmpty(cardHolder)) {
    return 'Required';
  }
  if (cardHolder.match(/^[a-zA-Z '-]+$/)) {
    return true;
  }
  return 'Invalid characters';
};

/**
 * Validates all of the fields on a credit card
 * @param {Object} creditCard {cvv, cardNumber, cardholder, expiration}
 * @returns a list of error objects {field, message}
 */
const validateCreditCard = (creditCard) => {
  const invalidFields = [];
  const cvvValidation = validateCVV(creditCard.cvv);
  if (cvvValidation !== true) {
    invalidFields.push({ field: 'cvv', message: cvvValidation });
  }
  const cardNumberValidation = validateCardNumber(creditCard.cardNumber);
  if (cardNumberValidation !== true) {
    invalidFields.push({ field: 'cardNumber', message: cardNumberValidation });
  }
  const expirationValidation = validateExpiration(creditCard.expiration);
  if (expirationValidation !== true) {
    invalidFields.push({ field: 'expiration', message: expirationValidation });
  }
  const cardHolderValidation = validateCardHolder(creditCard.cardholder);
  if (cardHolderValidation !== true) {
    invalidFields.push({ field: 'cardholder', message: cardHolderValidation });
  }
  return invalidFields;
};

/**
 * Validates an attempted purchase
 * @param {Object} deliveryAddress {firstName, lastName, street, street2, city, state, zip}
 * @param {Object} billingAddress {street, street2, city, state, zip, email, phone}
 * @param {Object} creditCard {cardNumber, cvv, cardholder, expiration}
 * @returns A list of invalid field objects in the delivery form
 *          and a list of invalid field objects in the billing form (including credit card)
 *          Each invalid field has one corresponding error message
 *          [[{field, message}, {field2, message}], [{field, message}]]
 */
const validatePurchase = (deliveryAddress, billingAddress, creditCard) => {
  const invalidCredit = validateCreditCard(creditCard);
  const invalidDelivery = validateAddress(deliveryAddress);
  if (isEmpty(deliveryAddress.firstName)) {
    invalidDelivery.push({ field: 'firstName', message: 'Required' });
  }
  if (isEmpty(deliveryAddress.lastName)) {
    invalidDelivery.push({ field: 'lastName', message: 'Required' });
  }
  const invalidBilling = validateAddress(billingAddress);
  if (isEmpty(billingAddress.email)) {
    invalidBilling.push({ field: 'email', message: 'Required' });
  }
  if (isEmpty(billingAddress.phone)) {
    invalidBilling.push({ field: 'phone', message: 'Required' });
  }

  return [invalidDelivery, invalidBilling.concat(invalidCredit)];
};

export default validatePurchase;
