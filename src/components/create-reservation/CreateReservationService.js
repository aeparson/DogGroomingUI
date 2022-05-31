import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchAllReservations
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setReservations sets state for reservations
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for reservations if 200 response, else sets state for apiError
 */
async function fetchAllReservations(setReservations, setApiError) {
  await HttpHelper(Constants.RESERVATIONS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setReservations)
    .catch(() => {
      setApiError(true);
    });
}

export default {
  fetchAllReservations
};
