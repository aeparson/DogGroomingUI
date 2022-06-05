import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import validateReservation from '../../utils/validation/reservationValidation';
import { getReservationById, updateReservationById } from '../../utils/service-pages/reservationService';
import { fetchAllRoomTypes } from '../../utils/service-pages/roomService';
import styles from './reservationForm.module.css';
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
  const [roomTypeName, setRoomTypeName] = useState('');
  const [fieldErrors, setFieldErrors] = useState([]);
  const rereoute = useNavigate();
  const { id } = useParams();

  const [roomType, setRoomType] = useState([{}]);

  useEffect(() => {
    getReservationById(Number(id), setReservationInfo);
  }, [id]);

  useEffect(() => {
    fetchAllRoomTypes(setRoomType);
  }, []);

  /**
   * Calculates the total cost of the reservation
   * @param {object} reservation
   * @returns total room cost after calculating nightly rate times nights stayed.
   */
  const getActiveRooms = () => {
    const roomObject = roomType.filter((object) => (object.active === true));
    if (roomObject === undefined) {
      return undefined;
    }
    const activeRooms = ([...roomObject].map((r) => (r.name)));
    return activeRooms;
  };

  /**
   * Allows room type id numbers to be matched to names for ease of reading reservation information.
   * @param {object} reservation
   * @returns room names assigned to room id numbers.
   */
  const getRoomTypeName = () => {
    const roomObject = roomType.find((object) => (object.id === reservationInfo.roomTypeId));
    if (roomObject === undefined) {
      return undefined;
    }
    return roomObject.name;
  };

  /**
   * Allows mapping of the chosen name back to the id to pass to the database.
   * @param {name} name
   * @returns a room type id number.
   */
  const getRoomTypeId = (name) => {
    const roomObject = roomType.find((object) => (object.name === name));
    if (roomObject === undefined) {
      return undefined;
    }
    return roomObject.id;
  };

  /**
   * @description Allows form input boxes to be typed into
   */
  const onReservationChange = (e) => {
    setReservationInfo({ ...reservationInfo, [e.target.id]: e.target.value });
  };

  /**
   * @description Allows form input boxes to be typed into
   */
  const onRoomTypeChange = (e) => {
    setRoomTypeName(e.target.value);
  };

  /**
   * @description Packet of information being sent to database for put request.
   * If information has been entered into a form box, it will be read and added
   * to the packet, otherwise what is sent is the reservations's existing information.
   */

  const reservationPacket = {
    id: reservation.id,
    user: 'user@mail.com',
    guestEmail: reservationInfo.guestEmail,
    roomTypeId: roomTypeName ? getRoomTypeId(roomTypeName) : reservationInfo.roomTypeId,
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
      updateReservationById(reservationPacket, { id }, setApiError)
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
              Edit Reservation
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
                      id="roomTypeName"
                      onChange={onRoomTypeChange}
                      value={roomTypeName}
                      options={getActiveRooms()}
                      defaultValue={getRoomTypeName(reservationInfo.roomTypeId)}
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
                      placeholder={reservationInfo.checkInDate}
                      defaultValue={reservationInfo.checkInDate}
                      type="text"
                      id="checkInDate"
                      onChange={onReservationChange}
                      value={reservationPacket.checkInDate}
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
                size="large"
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
