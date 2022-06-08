/**
 * Validates than an email address only has alphanumeric characters in the username
 * and only alphabetical characters in the domain name.
 * @param {string} email
 * @returns
 */
const validateEmail = (email) => {
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
const validateRoomType = (roomTypeId) => {
  if (roomTypeId === undefined) {
    return 'Must select a room type';
  }
  return '';
};

/**
 * Validates that the nights stayed must be a whole number greater than zero.
 * @param {number} days
 * @returns an empty string if valid, otherwise an error message
*/
const validateNightsStayed = (numberOfNights) => {
  if (numberOfNights - Math.floor(numberOfNights) === 0 && numberOfNights > 0) {
    return '';
  }
  return 'Must be a whole number greater than zero.';
};

/**
 * Calls all the validation helper functions and creates an invalidFields
 * object of relevant errors.
 * @param {guestEmail} string email entered for guest
 * @param {checkInDate} string date entered for the guest check in
 * @param {roomTypeId} number roomTypeId chosen for guest
 * @param {numberOfNights} number number of nights for guest stay
 * @returns invalidFields object of relevant errors.
 */
const checkReservation = ({
  guestEmail, checkInDate, roomTypeId, numberOfNights
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

  const roomTypeValidation = validateRoomType(roomTypeId);
  if (roomTypeValidation) {
    invalidFields.roomType = roomTypeValidation;
  }

  const nightsValidation = validateNightsStayed(numberOfNights);
  if (nightsValidation) {
    invalidFields.numberOfNights = nightsValidation;
  }
  return invalidFields;
};

/**
 * Runs the checkReservation validation function against a specificed set of
 * reservation information
 * @param {reservationInfo} reservationInfo
 * @returns errors fields, if any
 */
const validateReservation = (reservationInfo) => {
  const invalidReservation = checkReservation(reservationInfo);
  return invalidReservation;
};

export default validateReservation;
