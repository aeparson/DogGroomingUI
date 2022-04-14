import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchUserData
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setUserData sets state for data
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
export default async function fetchUserData(setUserData, setApiError) {
  await HttpHelper(Constants.USER_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setUserData)
    .catch(() => {
      setApiError(true);
    });
}
