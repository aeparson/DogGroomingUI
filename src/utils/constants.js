module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  // BASE_URL_API: 'https://array-of-sunshine-apparel-api.herokuapp.com',
  BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE:
    'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  PURCHASE_ENDPOINT: '/purchases',

  PRODUCT_ENDPOINT: '/products/active',

  PRODUCT_COUNT_ENDPOINT: '/products/count',

  ALL_PRODUCTS_ENDPOINT: '/products',

  PROMO_CODE_ENDPOINT: '/promos',

  // RegEx checks for exactly two decimal places
  TWO_DECIMAL_POINT_REGEX: /^[0-9]*\.[0-9]{2}$/,

  // RegEx checks for just numbers between 0-9
  ONLY_NUMBERS_REGEX: /^[0-9]*$/,

  // RegEx checks for only uppercase letters and numbers
  CAPITAL_LETTERS_NUMBERS_REGEX: /^[A-Z_0-9]*$/,

  GOOGLE_CLIENT_ID: '912899852587-7996nh9mlpvpa2446q0il4f9hj5o492h.apps.googleusercontent.com', // ENTER CLIENT ID HERE
  USER_ENDPOINT: '/users',

  PRODUCT_REVIEWS_ENDPOINT: '/reviews',

  WISHLIST_ENDPOINT: '/wishlist'
});
