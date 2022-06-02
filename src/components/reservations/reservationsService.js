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
/**
 *
 * @name getReservationById
 * @description Utilizes HttpHelper to make a GET request to an API
 * @param {int} reservationId id of reservation to be retrieved
 * @returns a getd reservation or throws an error
 */
async function getReservationById(reservationId) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservationId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    });
}

/**
 *
 * @name deleteReservationById
 * @description Utilizes HttpHelper to make a DELETE request to an API
 * @param {int} reservationId id of reservation to be deleted
 * @returns a deleted reservation or throws an error
 */
async function deleteReservationById(reservationId) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservationId}`, 'DELETE')
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
 * @name updateReservationById
 * @description Utilizes HttpHelper to make a PUT request to an API
 * @param {int} reservationId
 * @param {object} updatedReservation object passed from front end form elements.
 */
async function updateReservationById(reservation, updatedReservation) {
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

export {
  fetchAllReservations, deleteReservationById, updateReservationById,
  getReservationById, fetchAllRoomTypes
};
