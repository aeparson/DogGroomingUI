import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name postNewReservation
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {object} NewReservationForm takes in input from form elements.
 * @returns sets state for reservations if 200 response, else sets state for apiError
 */
/// summary- creates a HTTP helper function to post the new product to the API

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

export { createNewReservation, fetchAllRoomTypes };
