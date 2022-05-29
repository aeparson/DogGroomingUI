module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  BASE_URL_API: 'https://arcadia-hotel-booking-project.herokuapp.com/',
  // BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE:
    'https://www.telegraph.co.uk/content/dam/family/2021/06/22/dog-hotel-love_4_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXH-5rYAcEMfZ-k6qzXXxMMM.jpg',
  RESERVATIONS_ENDPOINT: '/reservations',

  CREATE_RESERVATION_ENDPOINT: '/reservations/create',

  EDIT_RESERVATIONS_ENDPOINT: '/reservations/edit',

  ROOM_TYPES_ENDPOINT: '/roomTypes',

  CREATE_ROOM_TYPES_ENDPOINT: '/roomTypes/create',

  EDIT_ROOM_TYPES_ENDPOINT: '/roomTypes/edit',

  // RegEx checks for exactly two decimal places
  TWO_DECIMAL_POINT_REGEX: /^[0-9]*\.[0-9]{2}$/,

  // RegEx checks for just numbers between 0-9
  ONLY_NUMBERS_REGEX: /^[0-9]*$/,

  // RegEx checks for only uppercase letters and numbers
  CAPITAL_LETTERS_NUMBERS_REGEX: /^[A-Z_0-9]*$/,

  
});
