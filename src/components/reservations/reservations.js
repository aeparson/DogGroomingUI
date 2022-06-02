/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './reservations.module.css';
import TableHeadings from './reservationTableHeadings';
import { deleteReservationById, getAllReservations } from '../../utils/service-pages/reservationService';
import { fetchAllRoomTypes } from '../../utils/service-pages/roomService';
import Constants from '../../utils/constants';

/**
 * This large function calls on helper functions to fetch and display all
 * relavent reservation data.
 * @returns a table with all the current reservations and their data.
 */
const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [roomType, setRoomType] = useState([]);

  const updateReservationList = () => getAllReservations(setReservations, setApiError);
  const fetchRoomTypes = () => fetchAllRoomTypes(setRoomType, setApiError);

  useEffect(() => {
    updateReservationList(setReservations);
  }, []);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  /**
   * Calculates the total cost of the reservation
   * @param {object} reservation
   * @returns total room cost after calculating nightly rate times nights stayed.
   */
  const getRoomRate = (reservation) => {
    const roomObject = roomType.find((object) => (object.id === reservation.roomTypeId));
    if (roomObject === undefined) {
      return undefined;
    }
    const totalRate = ((roomObject.rate) * (reservation.numberOfNights)).toFixed(2);
    return totalRate;
  };

  /**
   * Allows room type id numbers to be matched to names for ease of reading reservation information.
   * @param {object} reservation
   * @returns room names assigned to room id numbers.
   */
  const getRoomTypeName = (reservation) => {
    const roomObject = roomType.find((object) => (object.id === reservation.roomTypeId));
    if (roomObject === undefined) {
      return undefined;
    }
    const roomName = (roomObject.name);
    return roomName;
  };

  return (
    <>
      {apiError && (
      <p data-testid="errMsg">
        {Constants.API_ERROR}
      </p>
      )}
      <div className={styles.create}>
        <NavLink to="/reservations/create">
          <button className={styles.button} type="button">Create</button>
        </NavLink>
      </div>
      <div className={styles.reservationTable}>
        <table>
          <thead>
            <TableHeadings />
          </thead>
          <tbody>
            {reservations.sort((reservationA, reservationB) => reservationA.id - reservationB.id)
              .map((reservation) => (
                <TableData
                  key={reservation.id}
                  updateReservations={updateReservationList}
                  reservation={reservation}
                  roomRate={getRoomRate(reservation)}
                  roomName={getRoomTypeName(reservation)}
                />
              ))}

          </tbody>
        </table>
      </div>
    </>
  );
};

/**
 * @description a row of table data for a reservation
 * @param reservation will pull all of the reservations
* @returns component
 */

const TableData = ({
  reservation, roomRate, updateReservations, roomName
}) => {
  /**
   * @description displays a pencil icon. When clicked, you are redirected to a page to edit a reservation.
   * @returns a pencil icon.
   */
  const EditButton = () => {
    const navigate = useNavigate();
    const routeChange = () => {
      const path = `/reservations/edit/${reservation.id}`;
      navigate(path);
    };

    return (
      <FontAwesomeIcon
        onClick={routeChange}
        icon={faPencil}
        size="2x"
        className={styles.leftButton}
      />
    );
  };

  /**
   * @description displays a trash can button. When clicked, you delete a reservation.
   * @returns a trashcan button.
   */
  const DeleteButton = () => {
    const onClick = () => {
      deleteReservationById(reservation.id)
        .then(() => {
          updateReservations();
        })
        .catch(() => {
          updateReservations();
        });
    };
    return (
      <FontAwesomeIcon
        onClick={onClick}
        icon={faTrash}
        size="2x"
        className={styles.rightButton}
      />
    );
  };

  return (
    <tr>
      <td>
        <EditButton />
        <DeleteButton
          reservation={reservation}
          updateReservations={updateReservations}
        />

      </td>
      <td>{reservation.guestEmail}</td>
      <td>{roomName}</td>
      <td>{reservation.checkInDate}</td>
      <td>{reservation.numberOfNights}</td>
      <td>{`$${roomRate}`}</td>
    </tr>
  );
};
export default Reservations;
