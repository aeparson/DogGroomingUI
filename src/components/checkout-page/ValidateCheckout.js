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
      invalidFields.push({ field, message: 'Required field' });
    }
  });
  return invalidFields;
};

const validateCreditCard = (creditCard) => {
  const invalidFields = [];
  const requiredFields = ['cardNumber', 'cvv', 'expiration', 'cardholder'];
  requiredFields.forEach((field) => {
    if (isEmpty(creditCard[field])) {
      invalidFields.push({ field, message: 'Required field' });
    }
  });
  return invalidFields;
};

const validatePurchase = (deliveryAddress, billingAddress, creditCard) => {
  const invalidCreditFields = validateCreditCard(creditCard);
  const invalidDeliveryFields = validateAddress(deliveryAddress);
  if (isEmpty(deliveryAddress.firstName)) {
    invalidDeliveryFields.push({ field: 'firstName', message: 'Required field' });
  }
  if (isEmpty(deliveryAddress.lastName)) {
    invalidDeliveryFields.push({ field: 'lastName', message: 'Required field' });
  }
  const invalidBillingFields = validateAddress(billingAddress);
  if (isEmpty(billingAddress.email)) {
    invalidBillingFields.push({ field: 'email', message: 'Required field' });
  }
  if (isEmpty(billingAddress.phone)) {
    invalidBillingFields.push({ field: 'phone', message: 'Required field' });
  }

  return [invalidDeliveryFields, invalidBillingFields.concat(invalidCreditFields)];
};

export default validatePurchase;
