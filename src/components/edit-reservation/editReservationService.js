import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchReservationById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPurchase sets state for data
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function fetchReservationById(setReservation, setApiError, reservation) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservation.id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setReservation)
    .catch(() => {
      setApiError(true);
    });
}

/**
 * @name updateReservationInfo
 * @description Utilizes HttpHelper to make a put request to an API so user
 * can update information in a selected reservation
 * @param {*} reservationInfo information pulled from reservation page input
 * @param {*} reservation unique reservation in database
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function updateReservationInfo(reservationInfo, reservation, setApiError) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservation.id}`, 'PUT', reservationInfo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(Object.assign(reservation, reservationInfo))
    .catch(() => {
      setApiError(true);
    });
}

export default { fetchReservationById, updateReservationInfo };
