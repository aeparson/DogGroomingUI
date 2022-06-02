import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchRoomById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPurchase sets state for data
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function fetchRoomById(roomid, setRoomInfo) {
  await HttpHelper(`${Constants.ROOM_TYPES_ENDPOINT}/${roomid}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(((info) => setRoomInfo(info)));
}

/**
 * @name updateRoomInfo
 * @description Utilizes HttpHelper to make a put request to an API so user
 * can update information in a selected room
 * @param {*} updatedRoom information pulled from room page input
 * @param {*} room unique room in database
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for data if 200 response, else sets state for apiError
 */
async function updateRoomInfo(updatedRoom, room) {
  await HttpHelper(`${Constants.ROOM_TYPES_ENDPOINT}/${room.id}`, 'PUT', updatedRoom)
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

export { fetchRoomById, updateRoomInfo };
