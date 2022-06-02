import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './roomtypes.module.css';
import fetchAllRoomTypes from './roomtypesService';
import TableHeadings from './roomtypesTableHeadings';
import Constants from '../../utils/constants';

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
      <div className={styles.roomTypeTable}>
        <table>
          <thead>
            <TableHeadings />
          </thead>
          <tbody>
            {roomTypes.sort((roomTypeA, roomTypeB) => roomTypeA.id - roomTypeB.id)
              .map((roomType) => (
                <TableData
                  key={roomType.id}
                  updateRoomTypes={updateRoomTypes}
                  roomType={roomType}
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
 * @param reservation will pull all of the roomType
* @returns component
 */

const TableData = ({ roomType }) => {
  /**
   * @description displays a pencil icon. When clicked, you are redirected to a page
   *  to edit a reservation.
   * @returns a pencil icon.
   */
  const EditButton = () => {
    const navigate = useNavigate();
    const routeChange = () => {
      const path = `/room-types/edit/${roomType.id}`;
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

  return (
    <tr>
      <td>
        <EditButton />
      </td>
      <td>{roomType.name}</td>
      <td>{roomType.description}</td>
      <td>{roomType.rate}</td>
      <td>
        {(roomType.active ? 'Active' : 'Inactive'
        )}

      </td>
    </tr>
  );
};
export default RoomTypes;
