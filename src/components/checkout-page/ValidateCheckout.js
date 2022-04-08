const isEmpty = (field) => {
  if (field === undefined || field.trim().length === 0) {
    return true;
  }
  return false;
};

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

const validateCVV = (cvv) => {
  if (isEmpty(cvv)) {
    return 'Required';
  }
  // Must be 3 digits
  if (cvv.match(/^[0-9]{3}$/)) {
    return true;
  }
  return 'Must be three numerical digits';
};

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

const validateCardNumber = (cardNumber) => {
  if (isEmpty(cardNumber)) {
    return 'Required';
  }
  // Must be 16 digits and must satisfy Luhn algorithm
  if (cardNumber.match(/^[0-9]{16}$/)) {
    if (validateLuhn(cardNumber)) {
      return true;
    }
    return 'Invalid card number';
  }
  return 'Must be 16 numerical digits';
};

const validateExpiration = (expiration) => {
  if (isEmpty(expiration)) {
    return 'Required';
  }
  // Must be 2 digits followed by a '/' and then two more digits
  if (expiration.match(/^[0-9]{2}\/[0-9]{2}$/)) {
    const month = parseInt(expiration.substring(0, 2), 10);
    const year = parseInt(`20${expiration.substring(3)}`, 10);
    // Must represent a date
    if (month === 0 || month > 12) {
      return 'Month must be between 1 and 12';
    }
    // in the future
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

const validateCardHolder = (cardHolder) => {
  if (isEmpty(cardHolder)) {
    return 'Required';
  }
  // Must be alphabetical characters, apostrophes and hyphens
  if (cardHolder.match(/^[\p{L} .'-]+$/)) {
    return true;
  }
  return 'Must contain only alphabetical characters, apostrophes, and hyphens';
};

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
