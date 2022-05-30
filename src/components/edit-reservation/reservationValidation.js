import RegEx from '../../utils/regex';

/**
 * Validates that an email address is valid.
 * @param {string} guestEmail
 * @returns an empty string if valid, otherwise an error message
 */
const validateEmail = (guestEmail) => {
  if (RegEx.VALID_EMAIL_REGEX(guestEmail)) {
    return '';
  }
  return 'Must be a valid email address.';
};

/**
 * Validates that a reservation date is in the right format.
 * @param {string} date
 * @returns an empty string if valid, otherwise an error message
*/
const validateDate = (date) => {
  if (RegEx.VALID_DATE_REGEX(date)) {
    return '';
  }
  return 'Date format must be MM-DD-YYYY.';
};

/**
 * Validates that a field is not empty.
 * @param {string} field
 * @returns an empty string if valid, otherwise an error message
*/
const validateRoomType = (field) => {
  if (field === undefined || field === null || field.trim().length === 0) {
    return '';
  }
  return 'Room Type is required';
};

/**
 * Validates that the nights stayed must be greater than zero.
 * @param {int} days
 * @returns an empty string if valid, otherwise an error message
*/
const validateNightsStayed = (nights) => {
  if (nights > 0) {
    return '';
  }
  return 'Nights Stayed must be greater than zero.';
};

const checkReservation = ({
  guestEmail, date, roomType, nights
}) => {
  const invalidFields = {};

  const EmailValidation = validateEmail(guestEmail);
  if (EmailValidation) {
    invalidFields.guestEmail = EmailValidation;
  }

  const dateValidation = validateDate(date);
  if (dateValidation) {
    invalidFields.checkInDate = dateValidation;
  }

  const roomTypeValidation = validateRoomType(roomType);
  if (roomTypeValidation) {
    invalidFields.roomType = roomTypeValidation;
    return invalidFields;
  }

  const nightsValidation = validateNightsStayed(nights);
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
