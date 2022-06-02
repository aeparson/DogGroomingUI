/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './reservations.module.css';
import TableHeadings from './reservationTableHeadings';
import { deleteReservationById, fetchAllReservations, fetchAllRoomTypes } from './reservationsService';
import Constants from '../../utils/constants';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [roomType, setRoomType] = useState([]);

  const updateReservationList = () => fetchAllReservations(setReservations, setApiError);
  const fetchRoomTypes = () => fetchAllRoomTypes(setRoomType, setApiError);

  useEffect(() => {
    updateReservationList(setReservations);
  }, []);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const getRoomRate = (reservation) => {
    const roomRate = roomType.find((rt) => (rt.id === reservation.id));
    if (roomRate === undefined) {
      return undefined;
    }
    const totalRate = ((roomRate.rate) * (reservation.numberOfNights));
    return totalRate;
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

const TableData = ({ reservation, roomRate, updateReservations }) => {
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
   * @description displays a pencil icon. When clicked, you are redirected to a page to edit a reservation.
   * @returns a pencil icon.
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
      <td>{reservation.roomTypeId}</td>
      <td>{reservation.checkInDate}</td>
      <td>{reservation.numberOfNights}</td>
      <td>{roomRate}</td>
    </tr>
  );
};
export default Reservations;
