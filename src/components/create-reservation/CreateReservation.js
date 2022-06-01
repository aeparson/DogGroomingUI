import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
// import NewReservationForm from './CreateReservationForm';
import styles from './CreateReservation.module.css';
import postNewReservation from './CreateReservationService';
import validateReservation from '../edit-reservation/reservationValidation';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';

/**
 * @name CreateReservationPage
 * @description handles the changes when creating a new reservation, maps new reservation data
 *
 */
const CreateReservation = () => {
  const rereoute = useNavigate();
  const [fieldErrors, setFieldErrors] = useState([]);
  const roomTypes = ['1: King', '2: King Double', '3: Executive Suite', '4: Honeymoon Suite', '5: Queen',
    '6: Queen Double', '7: Extended Stay'];
  const [reservationInfo, setReservationInfo] = useState({
    guestEmail: '',
    checkInDate: '',
    roomType: '',
    numberOfNights: ''
  });

  /**
   * @description Packet of information being sent to database for put request.
   * If information has been entered into a form box, it will be read and added
   * to the packet, otherwise what is sent is the user's existing information.
   */

  const reservationPacket = {
    user: 'user@mail.com',
    guestEmail: reservationInfo.guestEmail,
    roomTypeId: reservationInfo.roomTypeId,
    checkInDate: reservationInfo.checkInDate,
    numberOfNights: reservationInfo.numberOfNights
  };

  /**
   * @description Allows form input boxes to be typed into
   */
  const onReservationChange = (e) => {
    setReservationInfo({ ...reservationInfo, [e.target.id]: e.target.value });
  };

  const attemptReservationCreation = (newReservationForm) => {
    console.log(reservationInfo);
    const invalidInfo = validateReservation(newReservationForm);
    if (Object.keys(invalidInfo).length === 0) {
      postNewReservation(newReservationForm)
        .then(rereoute('/reservations'));
      setFieldErrors([]);
      Object.assign(newReservationForm);
      setReservationInfo(newReservationForm);
    } else {
      setFieldErrors(invalidInfo);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.reservationInfoContainer}>
        <div className={styles.reservationContainer}>
          <h3 className={styles.title}>
            Create Reservation
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
              onClick={attemptReservationCreation}
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
  );
};

export default CreateReservation;
