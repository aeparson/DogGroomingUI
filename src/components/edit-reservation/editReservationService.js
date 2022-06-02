import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchReservationById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPurchase sets state for data
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function fetchReservationById(reservationid, setReservationInfo) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservationid}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(((info) => setReservationInfo(info)));
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
async function updateReservationInfo(updatedReservation, reservation) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservation.id}`, 'PUT', updatedReservation)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('A server error occurred. Your updates have not been saved');
      }
      throw new Error(Constants.API_ERROR);
    });
}

/**
 *
 * @name fetchAllRoomTypes
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setRoomTypes sets state for reservations
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for reservations if 200 response, else sets state for apiError
 */
async function fetchAllRoomTypes(setRoomType, setApiError) {
  await HttpHelper(Constants.ROOM_TYPES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setRoomType)
    .catch(() => {
      setApiError(true);
    });
}

export { fetchReservationById, updateReservationInfo, fetchAllRoomTypes };
