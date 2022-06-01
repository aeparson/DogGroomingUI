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

async function postNewReservation(newReservationForm, history) {
  await HttpHelper(Constants.RESERVATIONS_ENDPOINT, 'POST', newReservationForm)
    .then((response) => {
      if (response.ok) {
        toast.success('Reservation created successfully.');
        history.push('/maintenance');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      ('Reservation not created.');
    });
}

export default {
  postNewReservation
};
