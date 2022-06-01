/* eslint-disable max-len */
// import React from 'react';
// import FormItem from '../form/FormItem';
// import FormItemDropdown from '../form/FormItemDropdown';
// import styles from './CreateReservation.module.css';

// /// summary - Builds the create reservation page form
// const NewReservationForm = ({ onChange, reservationData, errors }) => {
//   const roomTypes = ['1: King', '2: King Double', '3: Executive Suite', '4: Honeymoon Suite', '5: Queen',
//     '6: Queen Double', '7: Extended Stay'];

//   return (
//     <>
//       <div className={styles.inputContainer}>
//         <div className={errors.guestEmail === undefined ? undefined : styles.invalid}>
//           <FormItem
//             type="email"
//             id="emailAddress"
//             label="Guest Email"
//             value={reservationData.label}
//             onChange={onChange}
//           />
//           <p className={styles.errorMessage}>
//             {errors.guestEmail !== undefined && errors.guestEmail}
//           </p>
//         </div>
//       </div>
//       <div className={styles.inputContainer}>
//         <div className={errors.checkInDate === undefined ? undefined : styles.invalid}>
//           <FormItem
//             type="text"
//             id="checkInDate"
//             label="Check In Date"
//             value={reservationData.checkInDate}
//             onChange={onChange}
//           />
//           <p className={styles.errorMessage}>
//             {errors.checkInDate !== undefined && errors.checkInDate}
//           </p>
//         </div>
//       </div>
//       <div className={styles.inputContainer}>
//         <div className={errors.roomType === undefined ? undefined : styles.invalid}>
//           <FormItemDropdown
//             id="roomType"
//             label="Room Type"
//             value={reservationData.roomType}
//             options={roomTypes}
//             onChange={onChange}
//           />
//           <p className={styles.errorMessage}>
//             {errors.roomType !== undefined && errors.roomType}
//           </p>
//         </div>
//       </div>
//       <div className={styles.inputContainer}>
//         <div className={errors.nightsStayed === undefined ? undefined : styles.invalid}>
//           <FormItem
//             nightsStayed="number"
//             id="nightsStayed"
//             label="Nights Stayed"
//             value={reservationData.nightsStayed}
//             onChange={onChange}
//           />
//           <p className={styles.errorMessage}>
//             {errors.nightsStayed !== undefined && errors.nightsStayed}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewReservationForm;
