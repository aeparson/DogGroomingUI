import { toast } from 'react-toastify';
import HttpHelper from '../HttpHelper';
import Constants from '../constants';

/**
 *
 * @name getAllReservations
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setReservations sets state for reservations
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for reservations if 200 response, else sets state for apiError
 */
async function getAllReservations(setReservations, setApiError) {
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
 * @name getReservationById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} reservationid indicates which reservation to fetch.
 * @param {*} setReservationInfo sets state for reservation information.
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function getReservationById(reservationid, setReservationInfo) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservationid}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(((info) => setReservationInfo(info)));
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
        toast.success('Reservation successfully deleted.');
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
 * @description Utilizes HttpHelper to make a put request to an API so user
 * can update information in a selected reservation
 * @param {*} updatedReservation information pulled from reservation page input
 * @param {*} reservation unique reservation in database
 * @returns sets state for data if 200 response, else throws an error.
 */
async function updateReservationById(updatedReservation, reservation) {
  await HttpHelper(`${Constants.RESERVATIONS_ENDPOINT}/${reservation.id}`, 'PUT', updatedReservation)
    .then((response) => {
      if (response.ok) {
        toast.success('Reservation successfully updated.');
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
 * @name postNewReservation
 * @description creates a HTTP helper function to post the new reservation to the API
 * @param {object} reservationPacket takes in input from form elements.
 * @returns sets state for reservations if 200 response, else sets state for apiError
 */

async function createNewReservation(reservationPacket) {
  await HttpHelper(Constants.RESERVATIONS_ENDPOINT, 'POST', reservationPacket)
    .then((response) => {
      if (response.ok) {
        toast.success('Reservation created successfully.');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(Object.assign(reservationPacket))
    .catch(() => {
      toast.error('A server error occured');
    });
}

export {
  getAllReservations, deleteReservationById, updateReservationById,
  getReservationById, createNewReservation
};
