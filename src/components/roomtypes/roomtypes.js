import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './roomtypes.module.css';
import { fetchAllRoomTypes } from '../../utils/service-pages/roomService';
import Constants from '../../utils/constants';
import RoomCardGrid from './roomCard/roomtypeGrid';

/**
 * This large function calls on helper functions to fetch and display all
 * relavent room type data.
 * @returns a table with all the current room types and their data.
 */
const RoomTypes = () => {
  const [apiError, setApiError] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);

  const updateRoomTypes = () => fetchAllRoomTypes(setRoomTypes, setApiError);

  useEffect(() => {
    updateRoomTypes(setRoomTypes);
  }, []);

  return (
    <>
      {apiError && (
      <p data-testid="errMsg">
        {Constants.API_ERROR}
      </p>
      )}
      <div className={styles.create}>
        <NavLink to="/room-types/create">
          <button className={styles.button} type="button">Create</button>
        </NavLink>
      </div>
      <RoomCardGrid roomTypes={roomTypes} />
    </>
  );
};

/**
 * @description a row of table data for a reservation
 * @param reservation will pull all of the roomType
* @returns component
 */

export default RoomTypes;
