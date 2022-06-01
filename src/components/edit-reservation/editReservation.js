import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import validateReservation from './reservationValidation';
import { fetchReservationById, updateReservationInfo } from './editReservationService';
import styles from './editReservation.module.css';
import Constants from '../../utils/constants';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';

/**
 * @name EditReservationPage
 * @description fetches reservation information based on reservation id & allows editing via a form.
 * @param {reservation, setReservation}
 * @returns component
 */
const EditReservationPage = () => {
  const [reservation, setReservation] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    user: '', guestEmail: '', roomTypeId: '', checkInDate: '', numberOfNights: ''
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const roomTypes = ['1: King', '2: King Double', '3: Executive Suite', '4: Honeymoon Suite', '5: Queen',
    '6: Queen Double', '7: Extended Stay'];
  const rereoute = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchReservationById(Number(id), setReservationInfo);
  }, [id]);

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
    user: 'user@mail.com',
    guestEmail: reservationInfo.guestEmail,
    roomTypeId: reservationInfo.roomTypeId,
    checkInDate: reservationInfo.checkInDate,
    numberOfNights: reservationInfo.numberOfNights
  };

  /**
   * @description Event handler that sends PUT request to database on clicking Save. Validation is
   * initially checked, and either field errors are set where necessary, or information packet is
   * sent to database and changes are persisted.
   */

  const AttemptReservationChange = () => {
    const invalidInfo = validateReservation(reservationPacket);
    if (Object.keys(invalidInfo).length === 0) {
      updateReservationInfo(reservationPacket, { id }, setApiError)
        .then(rereoute('/reservations'));
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
            <h3 className={styles.title}>
              Reservation
              <hr />
            </h3>
            <h4>
              Guest Email
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.guestEmail === undefined ? undefined
                  : styles.invalid}
                >
                  <span className={styles.input}>
                    <FormItem
                      type="email"
                      id="guestEmail"
                      placeholder={reservationInfo.guestEmail}
                      value={reservationPacket.guestEmail}
                      onChange={onReservationChange}
                    />
                  </span>
                </div>
                <p className={styles.errorMessage}>
                  {fieldErrors.guestEmail !== undefined && fieldErrors.guestEmail}
                </p>
              </div>
            </h4>
            <h4>
              Room Type
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.roomType === undefined ? undefined
                  : styles.invalid}
                >
                  <span className={styles.input}>
                    <FormItemDropdown
                      id="roomType"
                      onChange={onReservationChange}
                      value={reservationInfo.roomType}
                      options={roomTypes}
                      defaultValue={reservation.roomType}
                    />
                  </span>
                </div>
                <p className={styles.errorMessage}>
                  {fieldErrors.roomType !== undefined && fieldErrors.roomType}
                </p>
              </div>
            </h4>
            <h4>
              Check In Date
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.checkInDate === undefined
                  ? undefined : styles.invalid}
                >
                  <span className={styles.input}>

                    <FormItem
                      placeholder={reservation.checkInDate}
                      defaultValue={reservation.checkInDate}
                      type="text"
                      id="checkInDate"
                      onChange={onReservationChange}
                      value={reservationInfo.checkInDate}
                    />
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

                    <FormItem
                      placeholder={reservation.numberOfNights}
                      defaultValue={reservation.numberOfNights}
                      type="number"
                      id="numberOfNights"
                      onChange={onReservationChange}
                      value={reservationInfo.numberOfNights}
                    />

                  </span>
                </div>
                <p className={styles.errorMessage}>
                  {fieldErrors.numberOfNights !== undefined && fieldErrors.numberOfNights}
                </p>
              </div>
            </h4>
            <Box className={styles.button}>
              <Button
                onClick={AttemptReservationChange}
                variant="contained"
                disableElevation
                size="small"
                data-testid="edit-spot"
              >
                Save
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditReservationPage;
