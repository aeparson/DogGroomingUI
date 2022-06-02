/**
 * Validates than an email address only has alphanumeric characters in the username
 * and only alphabetical characters in the domain name.
 * @param {string} email
 * @returns
 */
// const validateName = (name) => {
//   if (name.length >= 3) {
//     return '';
//   }
//   return 'Name must be at least 3 characters';
// };

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

const checkRoom = ({
  rate
}) => {
  const invalidFields = {};

  //   const NameValidation = validateName(name);
  //   if (NameValidation) {
  //     invalidFields.name = NameValidation;
  //   }

  const rateValidation = validateRate(rate);
  if (rateValidation) {
    invalidFields.rate = rateValidation;
  }

  return invalidFields;
};

const validateRoom = (roomInfo) => {
  const invalidRoom = checkRoom(roomInfo);
  return invalidRoom;
};

export default validateRoom;
