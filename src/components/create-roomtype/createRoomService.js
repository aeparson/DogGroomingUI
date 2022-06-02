import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name postNewRoom
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {object} NewRoomForm takes in input from form elements.
 * @returns sets state for reservations if 200 response, else sets state for apiError
 */
/// summary- creates a HTTP helper function to post the new product to the API

async function createNewRoom(roomPacket) {
  await HttpHelper(Constants.ROOM_TYPES_ENDPOINT, 'POST', roomPacket)
    .then((response) => {
      if (response.ok) {
        toast.success('Room created successfully.');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(Object.assign(roomPacket))
    .catch(() => {
      toast.error('A server error occured');
    });
}

export default createNewRoom;
