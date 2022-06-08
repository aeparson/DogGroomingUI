const isEmpty = (field) => {
  if (field === undefined || field === null || field.trim().length === 0) {
    return true;
  }
  return false;
};

/**
 * Validates than an email address only has alphanumeric characters in the username
 * and only alphabetical characters in the domain name.
 * @param {string} name
 * @returns
 */
const validateName = (name) => {
  if (isEmpty(name)) {
    return 'Name must be at least 3 characters';
  }
  if (name.length >= 3) {
    return '';
  }
  return 'Name must be at least 3 characters';
};

/**
 * Validates that the nights stayed must be greater than zero.
 * @param {int} days
 * @returns an empty string if valid, otherwise an error message
*/
const validateRate = (rate) => {
  if (rate > 0) {
    return '';
  }
  return 'Must be a number greater than zero.';
};

/**
 * Calls all the validation helper functions and creates an invalidFields
 * object of relevant errors.
 * @param {rate} number entered for nightly room rate.
 * @param {name} string room type name entered.
 * @returns invalidFields object of relevant errors.
 */
const checkRoom = ({
  rate, name
}) => {
  const invalidFields = {};

  const NameValidation = validateName(name);
  if (NameValidation) {
    invalidFields.name = NameValidation;
  }

  const rateValidation = validateRate(rate);
  if (rateValidation) {
    invalidFields.rate = rateValidation;
  }

  return invalidFields;
};

/**
 * Runs the checkRoom validation function against a specificed set of
 * room information
 * @param {roomInfo} roomInfo
 * @returns errors fields, if any
 */
const validateRoom = (roomInfo) => {
  const invalidRoom = checkRoom(roomInfo);
  return invalidRoom;
};

export default validateRoom;
