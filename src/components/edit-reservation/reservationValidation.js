const isEmpty = (field) => {
  if (field === undefined || field === null || field.trim().length === 0) {
    return true;
  }
  return false;
};
/**
 * Validates than an email address only has alphanumeric characters in the username
 * and only alphabetical characters in the domain name.
 * @param {string} email
 * @returns
 */
const validateEmail = (email) => {
  if (isEmpty(email)) {
    return 'Required';
  }
  if ((/^\w+@([a-z]+\.)+[a-z]+$/i).test(email)) {
    return '';
  }
  return 'Must be valid email';
};

/**
 * Validates that a reservation date is in the right format.
 * @param {string} date
 * @returns an empty string if valid, otherwise an error message
*/
const validateDate = (checkInDate) => {
  if (isEmpty(checkInDate)) {
    return 'Required';
  }
  if ((/^(0[1-9]|1[0-2])([-]{1})\d{2}([-]{1})(\d{4})$/i).test(checkInDate)) {
    return '';
  }
  return 'Date must be MM-DD-YYYY.';
};

/**
 * Validates that a field is not empty.
 * @param {string} field
 * @returns an empty string if valid, otherwise an error message
*/
const validateRoomType = (roomType) => {
  if (isEmpty(roomType)) {
    return '';
  }
  return 'Must select a room type';
};

/**
 * Validates that the nights stayed must be greater than zero.
 * @param {int} days
 * @returns an empty string if valid, otherwise an error message
*/
const validateNightsStayed = (numberOfNights) => {
  if (numberOfNights > 0) {
    return '';
  }
  return 'Must be a number greater than zero.';
};

const checkReservation = ({
  guestEmail, checkInDate, roomType, numberOfNights
}) => {
  const invalidFields = {};

  const EmailValidation = validateEmail(guestEmail);
  if (EmailValidation) {
    invalidFields.guestEmail = EmailValidation;
  }

  const dateValidation = validateDate(checkInDate);
  if (dateValidation) {
    invalidFields.checkInDate = dateValidation;
  }

  const roomTypeValidation = validateRoomType(roomType);
  if (roomTypeValidation) {
    invalidFields.roomType = roomTypeValidation;
    return invalidFields;
  }

  const nightsValidation = validateNightsStayed(numberOfNights);
  if (nightsValidation) {
    invalidFields.numberOfNights = nightsValidation;
  }
  return invalidFields;
};

const validateReservation = (reservationInfo) => {
  const invalidReservation = checkReservation(reservationInfo);
  return invalidReservation;
};

export default validateReservation;
