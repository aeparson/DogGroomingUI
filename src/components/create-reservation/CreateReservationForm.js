/* eslint-disable max-len */
// import React from 'react';
// import FormItem from '../form/FormItem';
// import FormItemDropdown from '../form/FormItemDropdown';
// import styles from './CreateReservation.module.css';

// /// summary - Builds the create reservation page form
// const NewReservationForm = ({ onChange, reservationInfo, fieldErrors }) => {
//   const roomTypes = ['1: King', '2: King Double', '3: Executive Suite', '4: Honeymoon Suite', '5: Queen',
//     '6: Queen Double', '7: Extended Stay'];

//   return (
//     <>
//       <h4>
//         Guest Email
//         {' '}
//         <div className={styles.inputContainer}>
//           <div className={fieldErrors.guestEmail === undefined ? undefined
//             : styles.invalid}
//           >
//             <span className={styles.input}>
//               <FormItem
//                 type="email"
//                 id="guestEmail"
//                 reservationInfo={reservationInfo.guestEmail}
//                 onChange={onChange}
//               />
//             </span>
//           </div>
//           <p className={styles.errorMessage}>
//             {fieldErrors.guestEmail !== undefined && fieldErrors.guestEmail}
//           </p>
//         </div>
//       </h4>
//       <h4>
//         Room Type
//         {' '}
//         <div className={styles.inputContainer}>
//           <div className={fieldErrors.roomType === undefined ? undefined
//             : styles.invalid}
//           >
//             <span className={styles.input}>
//               <FormItemDropdown
//                 id="roomType"
//                 onChange={onChange}
//                 reservation={reservationInfo.roomType}
//                 options={roomTypes}
//               />
//             </span>
//           </div>
//           <p className={styles.errorMessage}>
//             {fieldErrors.roomType !== undefined && fieldErrors.roomType}
//           </p>
//         </div>
//       </h4>
//       <h4>
//         Check In Date
//         {' '}
//         <div className={styles.inputContainer}>
//           <div className={fieldErrors.checkInDate === undefined
//             ? undefined : styles.invalid}
//           >
//             <span className={styles.input}>

//               <FormItem
//                 type="text"
//                 id="checkInDate"
//                 onChange={onChange}
//                 reservationInfo={reservationInfo.checkInDate}
//               />
//             </span>
//           </div>
//           <p className={styles.errorMessage}>
//             {fieldErrors.checkInDate !== undefined && fieldErrors.checkInDate}
//           </p>
//         </div>
//       </h4>
//       <h4>
//         Number of Nights
//         {' '}
//         <div className={styles.inputContainer}>
//           <div className={fieldErrors.numberOfNights === undefined
//             ? undefined : styles.invalid}
//           >
//             <span className={styles.input}>

//               <FormItem
//                 type="number"
//                 id="numberOfNights"
//                 onChange={onChange}
//                 resrvationInfo={reservationInfo.numberOfNights}
//               />

//             </span>
//           </div>
//           <p className={styles.errorMessage}>
//             {fieldErrors.numberOfNights !== undefined && fieldErrors.numberOfNights}
//           </p>
//         </div>
//       </h4>
//     </>
//   );
// };

// export default NewReservationForm;
