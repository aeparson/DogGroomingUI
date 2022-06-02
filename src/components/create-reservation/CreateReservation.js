import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import validateReservation from '../../utils/validation/reservationValidation';
import { createNewReservation } from '../../utils/service-pages/reservationService';
import styles from '../edit-reservation/reservationForm.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';

/**
 * @name CreateReservationPage
 * @description allows you to submit a new instance of a reservation to the database
 * @param {reservation, setReservation}
 * @returns component
 */
const CreateReservationPage = () => {
  const [reservationInfo, setReservationInfo] = useState({
    user: '', guestEmail: '', roomTypeId: '', checkInDate: '', numberOfNights: ''
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const roomTypes = [1, 2, 3, 4, 5, 6, 7];
  const rereoute = useNavigate();

  /**
   * @description Allows form input boxes to be typed into
   */
  const onReservationCreate = (e) => {
    setReservationInfo({ ...reservationInfo, [e.target.id]: e.target.value });
  };

  /**
   * @description Packet of information being sent to database for put request.
   * Information entered into a form box will be read and added
   * to the packet.
   */

  const reservationPacket = {
    user: 'user@mail.com',
    guestEmail: reservationInfo.guestEmail,
    roomTypeId: reservationInfo.roomTypeId,
    checkInDate: reservationInfo.checkInDate,
    numberOfNights: reservationInfo.numberOfNights
  };

  /**
   * @description Event handler that sends POST request to database on clicking Save. Validation is
   * initially checked, and either field errors are set where necessary, or information packet is
   * sent to database and changes are persisted.
   */

  const AttemptReservationCreate = () => {
    const invalidInfo = validateReservation(reservationPacket);
    if (Object.keys(invalidInfo).length === 0) {
      createNewReservation(reservationPacket, setReservationInfo)
        .then(() => {
          rereoute('/reservations');
        });
    } else {
      setFieldErrors(invalidInfo);
    }
  };

  return (
    <>
      <div className={styles.container}>
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
                      onChange={onReservationCreate}
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
                      id="roomTypeId"
                      onChange={onReservationCreate}
                      value={reservationInfo.roomTypeId}
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
              Check In Date:
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.checkInDate === undefined
                  ? undefined : styles.invalid}
                >
                  <span className={styles.input}>

                    <FormItem
                      type="text"
                      id="checkInDate"
                      onChange={onReservationCreate}
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
              Number of Nights:
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.numberOfNights === undefined
                  ? undefined : styles.invalid}
                >
                  <span className={styles.input}>

                    <FormItem
                      type="number"
                      id="numberOfNights"
                      onChange={onReservationCreate}
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
                onClick={AttemptReservationCreate}
                variant="contained"
                disableElevation
                size="small"
                data-testid="save-spot"
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

export default CreateReservationPage;
