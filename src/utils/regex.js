module.exports = Object.freeze({

  // RegEx checks for exactly two decimal places
  TWO_DECIMAL_POINT_REGEX: /^[0-9]*\.[0-9]{2}$/,

  // RegEx checks for just numbers between 0-9
  ONLY_NUMBERS_REGEX: /^[0-9]*$/,

  // RegEx checks for only uppercase letters and numbers
  CAPITAL_LETTERS_NUMBERS_REGEX: /^[A-Z_0-9]*$/,

  // RegEx checks for valid email address
  VALID_EMAIL_REGEX: (/^\w+@([a-z]+\.)+[a-z]+$/i).test(),

  // RegEx checks for valid date format
  VALID_DATE_REGEX: /^(0[1-9]|1[0-2])([-]{1})\d{2}([-]{1})(\d{4})$/

});
