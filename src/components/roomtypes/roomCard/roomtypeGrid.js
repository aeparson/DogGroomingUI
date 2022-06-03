import React from 'react';
import RoomCard from './roomtypeCard';
import styles from './roomCardGrid.module.css';

/**
 * @name RoomCardGrid
 * @description A presentational component that contains
 *  a collection of product cards arranged in a grid.
 * @param {object} roomTypes An array of products to display cards for.
 * @returns component
 */
const RoomCardGrid = ({ roomTypes }) => (
  <div className={styles.innerContainer}>
    {roomTypes.map((roomType) => (
      <div key={roomType.id}>
        <RoomCard roomType={roomType} />
      </div>
    ))}
  </div>
);

export default RoomCardGrid;
