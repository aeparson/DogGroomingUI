import HttpHelper from '../../utils/HttpHelper';

/**
 * @name loginUser
 * @description Sends a login request to the backend and get user information
 * @param {Object} googleUser The googleUser object
 * @param {Function} setUser Sets the user
 * @param {Function} setApiError Sets the Api Error
 */
const loginUser = (googleUser, setUser, setApiError) => {
  HttpHelper('/users/login', 'POST', googleUser)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((response) => {
      setUser(response);
      setApiError(false);
      document.cookie = `user=${JSON.stringify(response)}`;
    })
    .catch(() => {
      setApiError(true);
    });
};

export default loginUser;
