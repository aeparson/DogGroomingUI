const isEmpty = (field) => {
  if (field === undefined || field.trim().length === 0) {
    return true;
  }
  return false;
};

const validateDeliveryAddress = (address) => {
  const invalidFields = [];
  const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'zip'];
  requiredFields.forEach((field) => {
    if (isEmpty(address[field])) {
      invalidFields.push({ field, error: 'Required field' });
    }
  });
  return invalidFields;
};

const validateBillingAddress = (address) => {
  const invalidFields = [];
  const requiredFields = ['street', 'city', 'state', 'zip'];
  requiredFields.forEach((field) => {
    if (isEmpty(address[field])) {
      invalidFields.push({ field, error: 'Required field' });
    }
  });
  return invalidFields;
};

const validateCreditCard = (creditCard) => {
  const invalidFields = [];
  const requiredFields = ['cardNumber', 'cvv', 'expiration', 'cardholder'];
  requiredFields.forEach((field) => {
    if (isEmpty(creditCard[field])) {
      invalidFields.push({ field, error: 'Required field' });
    }
  });
  return invalidFields;
};

const validatePurchase = (deliveryAddress, billingAddress, creditCard) => {
  const invalidCreditFields = validateCreditCard(creditCard);
  const invalidDeliveryFields = validateDeliveryAddress(deliveryAddress);
  const invalidBillingFields = validateBillingAddress(billingAddress);
  if (isEmpty(billingAddress.email)) {
    invalidBillingFields.push({ field: 'email', error: 'Required field' });
  }
  if (isEmpty(billingAddress.phone)) {
    invalidBillingFields.push({ field: 'phone', error: 'Required field' });
  }

  return [invalidDeliveryFields, invalidBillingFields.concat(invalidCreditFields)];
};

export default validatePurchase;
