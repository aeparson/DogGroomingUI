import roomImages from './roomImages';

/**
 * Assigns images for room cards based on room name
 * @param {room} room takes in a single room type object
 * @returns the corresponding image assigned by roomType name.
 */
const assignImage = (room) => {
  if (room.name === 'King') {
    return roomImages.KING_IMAGE;
  } if (room.name === 'King Double') {
    return roomImages.KING_DOUBLE_IMAGE;
  } if (room.name === 'Executive Suite') {
    return roomImages.EXECUTIVE_SUITE_IMAGE;
  } if (room.name === 'Honeymoon Suite') {
    return roomImages.HONEYMOON_SUITE_IMAGE;
  } if (room.name === 'Queen') {
    return roomImages.QUEEN_IMAGE;
  } if (room.name === 'Queen Double') {
    return roomImages.QUEEN_DOUBLE_IMAGE;
  } if (room.name === 'Extended Stay') {
    return roomImages.EXTENDED_STAY_IMAGE;
  } return roomImages.CUSTOM_ROOM_IMAGE;
};

export default assignImage;
