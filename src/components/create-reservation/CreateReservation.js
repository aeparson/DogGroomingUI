import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CreateReservation.module.css';

const CreateReservation = () => (
  <>
    <div className={styles.create}>
      <NavLink to="/reservations/create">
        <button className={styles.button} type="button">Create</button>
      </NavLink>
    </div>
    <table>
      <thead>
        TableHeadings
      </thead>
      <tbody>
        TableBody
      </tbody>
    </table>
  </>

);

export default CreateReservation;
