const isEmpty = (field) => {
  if (field === undefined || field === null || field.trim().length === 0) {
    return true;
  }
  return false;
};

/**
 * Validates that a card number passes the Luhn algorithm
 * @param {string} cardNumber
 * @returns true if valid, false if not
 */
const isLuhnValid = (cardNumber) => {
  // Luhn algorithm
  // The sum of the even-indexed digits
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

const validateZip = (zip) => {
  if (isEmpty(zip)) {
    return 'Required';
  }
  if ((/^\d{5}(-\d{4})?$/).test(zip)) {
    return '';
  }
  return 'Must be 5 or 9 numerical digits';
};

const validateEmail = (email) => {
  if (isEmpty(email)) {
    return 'Required';
  }
  if ((/\w+@\w+\.\w+/).test(email)) {
    return '';
  }
  return 'Invalid email format';
};

const validatePhone = (phone) => {
  if (isEmpty(phone)) {
    return 'Required';
  }
  if ((/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/).test(phone)) {
    return '';
  }
  return 'Invalid format';
};

const validateName = (name) => {
  if (isEmpty(name)) {
    return 'Required';
  }
  if ((/^[a-zA-Z '-]+$/).test(name)) {
    return '';
  }
  return 'Invalid Characters';
};
/**
 * Validates that the cvv is three numerical digits
 * @param {string} cvv
 * @returns empty string if valid, otherwise an error message
 */
const validateCVV = (cvv) => {
  if (isEmpty(cvv)) {
    return 'Required';
  }
  if ((/^[0-9]{3}$/).test(cvv)) {
    return '';
  }
  return 'Must be three numerical digits';
};

/**
 * Validates that a card number contains 16 numerical digits and passes the Luhn algorithm
 * @param {string} cardNumber
 * @returns empty string if valid, otherwise an error message
 */
const validateCardNumber = (cardNumber) => {
  if (isEmpty(cardNumber)) {
    return 'Required';
  }
  if ((/^[0-9]{16}$/).test(cardNumber)) {
    if (isLuhnValid(cardNumber)) {
      return '';
    }
    return 'Invalid card number';
  }
  return 'Must be 16 numerical digits';
};

/**
 * Validates that an expiration date is formatted as MM/YY, and that that date is in the future
 * @param {string} expiration
 * @returns empty string if valid, otherwise an error message
 */
const validateExpiration = (expiration) => {
  if (isEmpty(expiration)) {
    return 'Required';
  }
  if ((/^[0-9]{2}\/[0-9]{2}$/).test(expiration)) {
    const expirationMonth = parseInt(expiration.substring(0, 2), 10);
    const expirationYear = parseInt(`20${expiration.substring(3)}`, 10);
    if (expirationMonth === 0 || expirationMonth > 12) {
      return 'Month must be between 1 and 12';
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    if (expirationYear === currentYear) {
      if (expirationMonth < currentMonth) {
        return 'Card is expired';
      }
      return '';
    } if (expirationYear < currentYear) {
      return 'Card is expired';
    }
    return '';
  }
  return 'Must be formatted as MM/YY';
};

/**
 * Validates that cardHolder only uses alphabetical characters, whitespace, apostrophes, and hyphens
 * @param {string} cardHolder
 * @returns false if valid, otherwise an error message
 */
const validateCardHolder = (cardHolder) => {
  if (isEmpty(cardHolder)) {
    return 'Required';
  }
  if ((/^[a-zA-Z '-]+$/).test(cardHolder)) {
    return '';
  }
  return 'Invalid characters';
};

/**
 * Validates all of the fields on a credit card
 * @param {Object} creditCard {cvv, cardNumber, cardholder, expiration}
 * @returns an object with one message entry per invalid field {field: message}
 */
const validateCreditCard = (creditCard) => {
  const invalidFields = {};
  const cvvValidation = validateCVV(creditCard.cvv);
  if (cvvValidation) {
    invalidFields.cvv = cvvValidation;
  }
  const cardNumberValidation = validateCardNumber(creditCard.cardNumber);
  if (cardNumberValidation) {
    invalidFields.cardNumber = cardNumberValidation;
  }
  const expirationValidation = validateExpiration(creditCard.expiration);
  if (expirationValidation) {
    invalidFields.expiration = expirationValidation;
  }
  const cardHolderValidation = validateCardHolder(creditCard.cardholder);
  if (cardHolderValidation) {
    invalidFields.cardholder = cardHolderValidation;
  }
  return invalidFields;
};
/**
 * Validates that all required address fields are filled in
 * @param {Object} deliveryAddress
 * @returns an object with 'required' message entries for empty fields {field: 'Required'}
 */
const validateDelivery = (deliveryAddress) => {
  const invalidFields = {};
  const requiredFields = ['deliveryStreet', 'deliveryCity', 'deliveryState'];
  requiredFields.forEach((field) => {
    if (isEmpty(deliveryAddress[field])) {
      invalidFields[field] = 'Required';
    }
  });
  const zipValidation = validateZip(deliveryAddress.deliveryZip);
  if (zipValidation) {
    invalidFields.deliveryZip = zipValidation;
  }
  const firstNameValidation = validateName(deliveryAddress.deliveryFirstName);
  if (firstNameValidation) {
    invalidFields.deliveryFirstName = firstNameValidation;
  }
  const lastNameValidation = validateName(deliveryAddress.deliveryLastName);
  if (lastNameValidation) {
    invalidFields.deliveryLastName = lastNameValidation;
  }
  return invalidFields;
};

/**
 * Validates that all required address fields are filled in
 * @param {Object} billingAddress
 * @returns an object with 'required' message entries for empty fields {field: 'Required'}
 */
const validateBilling = (billingAddress) => {
  const invalidFields = {};
  const requiredFields = ['billingStreet', 'billingCity', 'billingState'];
  requiredFields.forEach((field) => {
    if (isEmpty(billingAddress[field])) {
      invalidFields[field] = 'Required';
    }
  });
  const zipValidation = validateZip(billingAddress.billingZip);
  if (zipValidation) {
    invalidFields.billingZip = zipValidation;
  }
  const phoneValidation = validatePhone(billingAddress.phone);
  if (phoneValidation) {
    invalidFields.phone = phoneValidation;
  }
  const emailValidation = validateEmail(billingAddress.email);
  if (emailValidation) {
    invalidFields.email = emailValidation;
  }
  return invalidFields;
};

/**
 * Validates an attempted purchase
 * @param {Object} deliveryAddress {firstName, lastName, street, street2, city, state, zip}
 * @param {Object} billingAddress {street, street2, city, state, zip, email, phone}
 * @param {Object} creditCard {cardNumber, cvv, cardholder, expiration}
 * @returns A list of two objects:
 *          an object with message entries for invalid delivery fields {field: message}
 *          an object with message entries for invalid billing + credit card fields {field: message}
 *          Each invalid field has one corresponding error message
 *          [{deliveryField: message, deliveryField2: message}, {billingField: message}]
 */
const validatePurchase = (deliveryAddress, billingAddress, creditCard) => {
  const invalidCredit = validateCreditCard(creditCard);
  const invalidDelivery = validateDelivery(deliveryAddress);
  const invalidBilling = validateBilling(billingAddress);

  return [invalidDelivery, { ...invalidBilling, ...invalidCredit }];
};

export default validatePurchase;
