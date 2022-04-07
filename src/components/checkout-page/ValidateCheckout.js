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

const validatePurchase = (setInvalidFields, deliveryAddress, billingAddress, creditCard) => {
  const invalidCreditFields = validateCreditCard(creditCard);
  const invalidDeliveryFields = validateAddress(deliveryAddress);
  const invalidBillingFields = validateAddress(billingAddress);

  console.log(invalidCreditFields.concat(invalidDeliveryFields).concat(invalidBillingFields));
  setInvalidFields(invalidCreditFields.concat(invalidDeliveryFields).concat(invalidBillingFields));
};

export default validatePurchase;
