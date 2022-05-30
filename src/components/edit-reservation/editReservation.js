import React, { useState } from 'react';

const EditReservationPage = ({ reservation, setReservation }) => {
  const [apiError, setApiError] = useState(false);
  const [editText, setEditText] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    guestEmail: '', roomTypeId: '', checkInDate: '', numberOfNights: ''
  });
  const [fieldErrors, setFieldErrors] = useState([]);

  /**
   * @description Changes state of edit text, which then changes reservation information
   * to form input boxes and changes buttons to save and cancel.
   */
  const changeText = () => {
    setEditText(!editText);
  };
  /**
   * @description Allows form input boxes to be typed into
   */
  const onReservationChange = (e) => {
    setReservationInfo({ ...reservationInfo, [e.target.id]: e.target.value });
  };

  /**
   * @description Packet of information being sent to database for put request.
   * If information has been entered into a form box, it will be read and added
   * to the packet, otherwise what is sent is the user's existing information.
   */

  const reservationPacket = {
    id: reservation.id,
    guestEmail: (reservation.guestEmail === '' ? reservation.guestEmail : reservationInfo.guestEmail),
    roomTypeId: (reservation.roomTypeId === '' ? reservation.roomTypeId : reservationInfo.roomTypeId),
    checkInDate: (reservation.checkInDate === '' ? reservation.checkInDate : reservationInfo.checkInDate),
    numberOfNights: (reservation.numberOfNights === '' ? reservation.numberOfNights : reservationInfo.numberOfNights)
  };

  /**
   * @description Event handler that sends PUT request to database on clicking Save. Validation is
   * initially checked, and either field errors are set where necessary, or information packet is
   * sent to database and changes are persisted.
   */

  const attemptReservationChange = () => {
    const invalidInfo = validateReservation(reservationPacket);
    if (Object.keys(invalidInfo).length === 0) {
      updateUserInfo(reservationPacket, setApiError);
      cancelChanges();
      setFieldErrors([]);
      Object.assign(reservationPacket);
      setUser(reservationPacket);
    } else {
      setFieldErrors(invalidInfo);
    }
  };
};

export default EditReservationPage;
