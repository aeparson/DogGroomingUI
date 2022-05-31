import React from 'react';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import styles from './CreateReservation';

/// summary - Builds the create reservation page form
const NewReservationForm = ({ onChange, reservationData, errors }) => (

  <div className={styles.reservationContainer}>
    <div className={styles.column1}>
      <div className={errors.guestEmail === undefined ? undefined : styles.invalid}>
        <FormItem
          type="email"
          id="emailAddress"
          label="Guest Email"
          value={reservationData.label}
          onChange={onChange}
        />
        <p className={styles.errorMessage}>
          {errors.guestEmail !== undefined && errors.guestEmail}
        </p>
      </div>
      <br />
      <br />
      <div className={errors.checkInDate === undefined ? undefined : styles.invalid}>
        <FormItem
          type="text"
          id="checkInDate"
          label="Check In Date"
          value={reservationData.checkInDate}
          onChange={onChange}
        />
        <p className={styles.errorMessage}>
          {errors.checkInDate !== undefined && errors.checkInDate}
        </p>
      </div>
      <br />
      <br />
      <div className={errors.roomType === undefined ? undefined : styles.invalid}>
        <FormItemDropdown
          id="roomType"
          label="Room Type"
          value={reservationData.roomType}
          onChange={onChange}
        />
        <p className={styles.errorMessage}>
          {errors.roomType !== undefined && errors.roomType}
        </p>
      </div>
      <br />
      <br />
      <div className={errors.nightsStayed === undefined ? undefined : styles.invalid}>
        <FormItem
          nightsStayed="number"
          id="nightsStayed"
          label="Nights Stayed"
          value={reservationData.nightsStayed}
          onChange={onChange}
        />
        <p className={styles.errorMessage}>
          {errors.nightsStayed !== undefined && errors.nightsStayed}
        </p>
      </div>
    </div>
  </div>
);

export default NewReservationForm;
