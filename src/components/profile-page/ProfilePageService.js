import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchUserPurchase
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPurchase sets state for data
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function fetchUserPurchase(setPurchase, setApiError, user) {
  await HttpHelper(`${Constants.PURCHASE_ENDPOINT}/${user.email}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPurchase)
    .catch(() => {
      setApiError(true);
    });
}

/**
 * @name updateUserInfo
 * @description Utilizes HttpHelper to make a put request to an API so user
 * can update information in their profile
 * @param {*} profileInfo information pulled from profile page input
 * @param {*} user unique user in database
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function updateUserInfo(profileInfo, user, setApiError) {
  await HttpHelper(`${Constants.USER_ENDPOINT}/${user.id}`, 'PUT', profileInfo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(Object.assign(user, profileInfo))
    .catch(() => {
      setApiError(true);
    });
}
export { updateUserInfo, fetchUserPurchase };
