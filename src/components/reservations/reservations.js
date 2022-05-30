import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './reservations.module.css';
import TableHeadings from './reservationTableHeadings';

const Reservations = () => (
  <>
    <div className={styles.create}>
      <NavLink to="/reservations/create">
        <button className={styles.button} type="button">Create</button>
      </NavLink>
    </div>
    <div className={styles.reservationTable}>
      <table>
        <TableHeadings />
      </table>
    </div>
  </>

);

export default Reservations;
