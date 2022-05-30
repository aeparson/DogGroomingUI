// import RegEx from '../../utils/regex';

// /**
//  * Validates that an email address is valid.
//  * @param {string} guestEmail
//  * @returns an empty string if valid, otherwise an error message
//  */
// const validateEmail = (guestEmail) => {
//   if (RegEx.VALID_EMAIL_REGEX(guestEmail)) {
//     return '';
//   }
//   return 'Must be a valid email address.';
// };

// /**
//  * Validates that a reservation date is in the right format.
//  * @param {string} date
//  * @returns an empty string if valid, otherwise an error message
// */
// const validateDate = (date) => {
//   if (RegEx.VALID_DATE_REGEX(date)) {
//     return '';
//   }
//   return 'Date format must be MM-DD-YYYY';
// };

// /**
//  * Validates that the nights stayed must be greater than zero.
//  * @param {int} days
//  * @returns an empty string if valid, otherwise an error message
// */
// const validateNightsStayed = (nights) => {
//   if (nights > 0) {
//     return '';
//   }
//   return 'Invalid characters';
// };

// /**
//  * Validates that room type is selected,
//  * apostrophes, hyphens, periods, and spaces
//  * @param {string} roomType
//  * @returns an empty string if valid, otherwise an error message
// */
// const validateCity = (roomType) => {
//   if ((/^[a-z '.-]+$/i).test(roomType)) {
//     return '';
//   }
//   return 'Invalid characters';
// };

// const checkProfile = ({
//   firstName, lastName, street, city, zip
// }) => {
//   const invalidFields = {};
//   const zipValidation = validateZip(zip);
//   if (zipValidation) {
//     invalidFields.zip = zipValidation;
//   }
//   const firstNameValidation = validateName(firstName);
//   if (firstNameValidation) {
//     invalidFields.firstName = firstNameValidation;
//   }
//   const lastNameValidation = validateName(lastName);
//   if (lastNameValidation) {
//     invalidFields.lastName = lastNameValidation;
//   }
//   const cityValidation = validateCity(city);
//   if (cityValidation) {
//     invalidFields.city = cityValidation;
//   }
//   const streetValidation = validateStreet(street);
//   if (streetValidation) {
//     invalidFields.street = streetValidation;
//   }
//   /* const stateValidation = validateState(profileState);
//   if (stateValidation) {
//     invalidFields.profileState = stateValidation; */
//   return invalidFields;
// };

// const validateProfile = (profileInfo) => {
//   const invalidProfile = checkProfile(profileInfo);
//   return invalidProfile;
// };

// export default validateProfile;
