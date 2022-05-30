import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import validateReservation from './reservationValidation';
import updateReservationInfo from './editReservationService';
import styles from './editReservation.module.css';
import Constants from '../../utils/constants';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';

const EditReservationPage = ({ reservation, setReservation }) => {
  const [apiError, setApiError] = useState(false);
  const [editText, setEditText] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    guestEmail: '', roomTypeId: '', checkInDate: '', numberOfNights: ''
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const roomTypes = ['King', 'King Double', 'Executive Suite', 'Honeymoon Suite', 'Queen', 'Queen Double', 'Extended Stay'];

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
      updateReservationInfo(reservationPacket, setApiError);
      setFieldErrors([]);
      Object.assign(reservationPacket);
      setReservation(reservationPacket);
    } else {
      setFieldErrors(invalidInfo);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <div className={styles.reservationInfoContainer}>
          <div className={styles.reservationContainer}>
            <p data-testid="createReservationPage">
              <h3 className={styles.title}>
                Reservation
                <hr />
              </h3>
              <h4>
                Guest Email:
                {' '}
                <div className={styles.inputContainer}>
                  <div className={fieldErrors.guestEmail === undefined ? undefined
                    : styles.invalid}
                  >
                    <span className={styles.input}>
                      {editText ? (
                        <FormItem
                          placeholder={reservation.guestEmail}
                          defaultValue={reservation.guestEmail}
                          type="email"
                          id="guestEmail"
                          onChange={onReservationChange}
                          value={reservationInfo.guestEmail}
                        />
                      ) : reservation.guestEmail}
                    </span>
                  </div>
                  <p className={styles.errorMessage}>
                    {fieldErrors.guestEmail !== undefined && fieldErrors.guestEmail}
                  </p>
                </div>
              </h4>
              <h4>
                Room Type:
                {' '}
                <div className={styles.inputContainer}>
                  <div className={fieldErrors.roomType === undefined ? undefined
                    : styles.invalid}
                  >
                    <span className={styles.input}>
                      {editText ? (
                        <FormItemDropdown
                          id="roomType"
                          onChange={onReservationChange}
                          value={reservationInfo.roomType}
                          options={roomTypes}
                          defaultValue={reservation.roomType}
                        />
                      ) : reservation.roomType}
                    </span>
                  </div>
                  <p className={styles.errorMessage}>
                    {fieldErrors.roomType !== undefined && fieldErrors.roomType}
                  </p>
                </div>
              </h4>
              <h4>
                Check In Date:
                {' '}
                <div className={styles.inputContainer}>
                  <div className={fieldErrors.checkInDate === undefined
                    ? undefined : styles.invalid}
                  >
                    <span className={styles.input}>
                      {editText ? (
                        <FormItem
                          placeholder={reservation.checkInDate}
                          defaultValue={reservation.checkInDate}
                          type="text"
                          id="checkInDate"
                          onChange={onReservationChange}
                          value={reservationInfo.checkInDate}
                        />
                      ) : reservation.checkInDate}
                    </span>
                  </div>
                  <p className={styles.errorMessage}>
                    {fieldErrors.checkInDate !== undefined && fieldErrors.checkInDate}
                  </p>
                </div>
              </h4>
              <h4>
                Number of Nights
                {' '}
                <div className={styles.inputContainer}>
                  <div className={fieldErrors.numberOfNights === undefined
                    ? undefined : styles.invalid}
                  >
                    <span className={styles.input}>
                      {editText ? (
                        <FormItem
                          placeholder={reservation.numberOfNights}
                          defaultValue={reservation.numberOfNights}
                          type="number"
                          id="numberOfNights"
                          onChange={onReservationChange}
                          value={reservationInfo.numberOfNights}
                        />
                      ) : reservation.numberOfNights}
                    </span>
                  </div>
                  <p className={styles.errorMessage}>
                    {fieldErrors.numberOfNights !== undefined && fieldErrors.numberOfNights}
                  </p>
                </div>
              </h4>
              <Box className={styles.button}>
                <Button
                  onClick={editText ? attemptReservationChange : changeText}
                  variant="contained"
                  disableElevation
                  size="small"
                  data-testid="edit-spot"
                >
                  Save
                </Button>
              </Box>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditReservationPage;
