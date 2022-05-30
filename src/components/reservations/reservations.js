/* eslint-disable max-len */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';
// import { toast } from 'react-toastify';
import styles from './reservations.module.css';
import TableHeadings from './reservationTableHeadings';
// import { fetchAllReservations, deleteReservationById } from './reservationsService';

const Reservations = () => (
  <>
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
          {/* {reservations.sort((reservationA, reservationB) => reservationA.id - reservationB.id)
              .map((res) => ( */}
          <TableData />
          {/* ))} */}
        </tbody>
      </table>
    </div>
  </>
);

/**
 * @description a row of table data for a reservation
 * @param reservation will pull all of the reservations
* @returns component
 */

const TableData = () => {
  /**
   * @description displays a pencil icon. When clicked, you are redirected to a page to edit a reservation.
   * @returns a pencil icon.
   */
  const EditButton = () => {
    const navigate = useNavigate();
    const routeChange = () => {
      const path = '/reservations/edit';
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
  const DeleteButton = () => (
    <FontAwesomeIcon
      icon={faTrash}
      size="2x"
      className={styles.rightButton}
    />
  );

  return (
    <tr>
      <td>
        <EditButton />
        <DeleteButton />
      </td>
    </tr>
  );
};
export default Reservations;

// const DeleteButton = () => {
//   const [clickable] = useState(true);

//   const deleteReservation = () => {
//     if (clickable) {
//       deleteReservationById(reservation.id)
//         .then(() => {
//           updateReservations();
//           toast.success(`Reservation for ${reservation.guestEmail} has been successfully deleted.`);
//         })
//         .catch(() => {
//           updateReservations(); // Account for errors caused by backend changes since page render
//           toast.error('A server error occurred. The reservation has not been deleted.');
//         });
//     }
//   };

//   return (
//     <IconButton color="inherit" size="small" className={styles.rightButton} data-testid={`delete ${reservation.id}`}>
//       <DeleteIcon />
//     </IconButton>
//   );
// };

//  <TableData
//             // key={res.id}
//             // updateReservations={updateReservationList}
//             // reservation={res}
//           />

// const [reservations, setReservations] = useState([]);
// const [apiError, setApiError] = useState(false);

// const updateReservationList = () => fetchAllReservations(setReservations, setApiError);

// useEffect(() => {
//   updateReservationList();
// }, []);
