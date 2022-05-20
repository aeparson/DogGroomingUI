/**
 * Validates that a field is not empty
 * @param {string} field
 * @returns a boolean
*/
const isEmpty = (field) => {
  if (field === undefined || field === null || field.trim().length === 0) {
    return true;
  }
  return false;
};
/**
 * Validates that a name only contains alphabetical characters, periods and hyphens
 * @param {string} name
 * @returns an empty string if valid, otherwise an error message
*/
const validateName = (name) => {
  if (isEmpty(name)) {
    return 'This field is required';
  }
  if ((/^[ A-Za-z0-9_./&--']*$/).test(name)) {
    return '';
  }
  return 'May contain letters, spaces, numbers, periods, dashes, apostrophes, and ampersands';
};
/**
 * Validates that a brand only contains alphabetical characters, periods and hyphens
 * @param {string} brand
 * @returns an empty string if valid, otherwise an error message
*/
const validateBrand = (brand) => {
  if (isEmpty(brand)) {
    return 'This field is required';
  }
  if ((/^[ A-Za-z0-9_./&--']*$/).test(brand)) {
    return '';
  }
  return 'May contain letters, spaces, numbers, periods, dashes, apostrophes, and ampersands';
};
/**
 * Validates that a category only contains alphabetical characters, periods and hyphens
 * @param {string} category
 * @returns an empty string if valid, otherwise an error message
*/
const validateCategory = (category) => {
  if (isEmpty(category)) {
    return 'This field is required';
  }
  if ((/^[-\sa-zA-Z]+$/).test(category)) {
    return '';
  }
  return 'May only contain letters, dashes, and spaces.';
};
/**
 * Validates that a type only contains alphabetical characters, periods and hyphens
 * @param {string} type
 * @returns an empty string if valid, otherwise an error message
*/
const validateType = (type) => {
  if (isEmpty(type)) {
    return 'This field is required';
  }
  if ((/^[-\sa-zA-Z]+$/).test(type)) {
    return '';
  }
  return 'May only contain letters, dashes, and spaces.';
};
/**
 * Validates that a material only contains alphabetical characters, periods and hyphens
 * @param {string} material
 * @returns an empty string if valid, otherwise an error message
*/
const validateMaterial = (material) => {
  if (isEmpty(material)) {
    return 'This field is required';
  }
  if ((/^[-\sa-zA-Z]+$/).test(material)) {
    return '';
  }
  return 'May only contain letters, dashes, and spaces.';
};
/**
 * Validates that a description only contains alphabetical characters, periods and hyphens
 * @param {string} description
 * @returns an empty string if valid, otherwise an error message
*/
const validateDescription = (description) => {
  if (isEmpty(description)) {
    return 'This field is required';
  }
  if ((/^[ A-Za-z0-9_./&--']*$/).test(description)) {
    return '';
  }
  return 'May contain letters, spaces, numbers, periods, dashes, apostrophes, and ampersands';
};
/**
 * Validates that a demographic only contains alphabetical characters, periods and hyphens
 * @param {string} name
 * @returns an empty string if valid, otherwise an error message
*/
const validateDemographic = (demographic) => {
  if (isEmpty(demographic)) {
    return 'This field is required';
  }
  if ((/^[a-zA-Z]+$/).test(demographic)) {
    return '';
  }
  return 'May only contain letters';
};

/**
 * Validates that a price only contains numbers with 2 digits
 * @param {string} price
 * @returns an empty string if valid, otherwise an error message
*/
const validatePrice = (price) => {
  if (isEmpty(price)) {
    return 'This field is required';
  }
  if ((/^(0(?!\.00)|[1-9]\d{0,6})\.\d{2}$/).test(price)) {
    return '';
  }
  return 'Must be a number with two decimal places';
};

/**
 * Validates that a quantity only contains numbers
 * @param {string} quantity
 * @returns an empty string if valid, otherwise an error message
*/
const validateQuantity = (quantity) => {
  if (isEmpty(quantity)) {
    return 'This field is required';
  }
  if ((/^\d+$/).test(quantity)) {
    return '';
  }
  return 'Must be a whole number';
};
/**
 * Validates that a color code contains only numbers and letters
 * @param {string} primaryColorCode
 * @returns an empty string if valid, otherwise an error message
*/
const validatePriColorCode = (primaryColorCode) => {
  if (isEmpty(primaryColorCode)) {
    return 'This field is required';
  }
  if ((/^[#]+[A-Za-z0-9]{6}$/).test(primaryColorCode)) {
    return '';
  }
  return 'Input must be a valid hexcode ex. #ffffff';
};
/**
 * Validates that a color code contains only numbers and letters
 * @param {string} secondaryColorCode
 * @returns an empty string if valid, otherwise an error message
*/
const validateSecColorCode = (secondaryColorCode) => {
  if (isEmpty(secondaryColorCode)) {
    return 'This field is required';
  }
  if ((/^[#]+[A-Za-z0-9]{6}$/).test(secondaryColorCode)) {
    return '';
  }
  return 'Input must be a valid hexcode ex. #ffffff';
};
/**
 * Validates that a style code contains scLLLLL
 * @param {string} styleNumber
 * @returns an empty string if valid, otherwise an error message
*/
const validateStyleNumber = (styleNumber) => {
  if (isEmpty(styleNumber)) {
    return 'This field is required';
  }
  if ((/^[s][c][A-Z]{5}$/).test(styleNumber)) {
    return '';
  }
  return 'Must contain "sc" followed by any 5 capital letters ex. scABCDE';
};
/**
 * Validates a date
 * @param {string} releaseDate
 * @returns an empty string if valid, otherwise an error message
*/
const validateDate = (releaseDate) => {
  if (isEmpty(releaseDate)) {
    return 'This field is required';
  }
  if
  ((/^[0-9A-Za-z!@.,;:'"?/-]{1,10}$/).test(releaseDate)) {
    return '';
  }
  return 'Must be in ##/##/####';
};
/**
 * Validates that an image source
 * @param {string} imageSrc
 * @returns an empty string if valid, otherwise an error message
*/
const validateImageSrc = (imageSrc) => {
  if (isEmpty(imageSrc)) {
    return 'This field is required';
  }
  if
  ((/[^]/)
    .test(imageSrc)) {
    return '';
  }
  return '';
};

/**
 * Validates all required fields
 * @param {Object} input
 * @returns an object with field errors given as {field: 'message'}
 */
const validateProductCreation = ({
  name, brand, category, type, material,
  description, demographic, price, quantity, primaryColorCode,
  secondaryColorCode, styleNumber, releaseDate, imageSrc
}) => {
  const invalidFields = {};

  const nameValidation = validateName(name);
  if (nameValidation) {
    invalidFields.name = nameValidation;
  }
  const brandValidation = validateBrand(brand);
  if (brandValidation) {
    invalidFields.brand = brandValidation;
  }
  const categoryValidation = validateCategory(category);
  if (categoryValidation) {
    invalidFields.category = categoryValidation;
  }
  const typeValidation = validateType(type);
  if (typeValidation) {
    invalidFields.type = typeValidation;
  }
  const materialValidation = validateMaterial(material);
  if (materialValidation) {
    invalidFields.material = materialValidation;
  }
  const descriptionValidation = validateDescription(description);
  if (descriptionValidation) {
    invalidFields.description = descriptionValidation;
  }
  const demographicValidation = validateDemographic(demographic);
  if (demographicValidation) {
    invalidFields.demographic = demographicValidation;
  }
  const priceValidation = validatePrice(price);
  if (priceValidation) {
    invalidFields.price = priceValidation;
  }
  const quantityValidation = validateQuantity(quantity);
  if (quantityValidation) {
    invalidFields.quantity = quantityValidation;
  }
  const priColorCodeValidation = validatePriColorCode(primaryColorCode);
  if (priColorCodeValidation) {
    invalidFields.primaryColorCode = priColorCodeValidation;
  }
  const secColorCodeValidation = validateSecColorCode(secondaryColorCode);
  if (secColorCodeValidation) {
    invalidFields.secondaryColorCode = secColorCodeValidation;
  }
  const styleNumberValidation = validateStyleNumber(styleNumber);
  if (styleNumberValidation) {
    invalidFields.styleNumber = styleNumberValidation;
  }
  const dateValidation = validateDate(releaseDate);
  if (dateValidation) {
    invalidFields.releaseDate = dateValidation;
  }
  const imageSrcValidation = validateImageSrc(imageSrc);
  if (imageSrcValidation) {
    invalidFields.imageSrc = imageSrcValidation;
  }
  return [{ ...invalidFields }];
};

export default validateProductCreation;
