/**
 * Validates that a zip code only contains numerical digits and is either 5 or 9 chraaters long
 * @param {string} zip
 * @returns an empty string if valid, otherwise an error message
 */
const validateZip = (zip) => {
  if ((/^\d{5}(-?\d{4})?$/).test(zip)) {
    return '';
  }
  return 'Must be 5 or 9 numerical digits';
};

/**
 * Validates that a name only contains alphabetical characters, periods and hyphens
 * @param {string} name
 * @returns an empty string if valid, otherwise an error message
*/
const validateName = (name) => {
  if ((/^[a-z'.-]+$/i).test(name)) {
    if (!(/^[a-z'.-]{1,50}$/i).test(name)) {
      return 'Must be under 50 characters';
    }
    return '';
  }
  return 'May only contain letters, periods, and hyphens';
};

/**
 * Validates that a street address only contains alphanumerical characters,
 * apostrophes, hyphens, spaces, and periods
 * @param {string} street
 * @returns an empty string if valid, otherwise an error message
*/
const validateStreet = (street) => {
  if (((/^[\w '.-]+$/).test(street))) {
    return '';
  }
  return 'Invalid characters';
};

/**
 * Validates that a city name only contains alphabetical characters,
 * apostrophes, hyphens, periods, and spaces
 * @param {string} city
 * @returns an empty string if valid, otherwise an error message
*/
const validateCity = (city) => {
  if ((/^[a-z '.-]+$/i).test(city)) {
    return '';
  }
  return 'Invalid characters';
};

const checkProfile = ({
  firstName, lastName, street, city, zip
}) => {
  const invalidFields = {};
  const zipValidation = validateZip(zip);
  if (zipValidation) {
    invalidFields.zip = zipValidation;
  }
  const firstNameValidation = validateName(firstName);
  if (firstNameValidation) {
    invalidFields.firstName = firstNameValidation;
  }
  const lastNameValidation = validateName(lastName);
  if (lastNameValidation) {
    invalidFields.lastName = lastNameValidation;
  }
  const cityValidation = validateCity(city);
  if (cityValidation) {
    invalidFields.city = cityValidation;
  }
  const streetValidation = validateStreet(street);
  if (streetValidation) {
    invalidFields.street = streetValidation;
  }
  /* const stateValidation = validateState(profileState);
  if (stateValidation) {
    invalidFields.profileState = stateValidation; */
  return invalidFields;
};

const validateProfile = (profileInfo) => {
  const invalidProfile = checkProfile(profileInfo);
  return invalidProfile;
};

export default validateProfile;
