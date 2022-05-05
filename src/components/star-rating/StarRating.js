import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './StarRating.module.css';

function Star({ highlight }) {
  return (
    <FontAwesomeIcon
      icon={faStar}
      className={highlight ? styles.highlight : styles.grey}
      size="1x"
    />
  );
}

function StarRating({ rating, onClick }) {
  const [highlightPercentage, setHighlightPercentage] = useState(null);

  useEffect(() => {
    function ratingToNearestQuarter(_rating) {
      return Math.round(_rating * 4) / 4;
    }

    function getPercentage(_rating) {
      const nearestQuarter = ratingToNearestQuarter(_rating);
      const percentOfFive = (nearestQuarter / 5) * 100;
      return percentOfFive.toFixed(2);
    }

    setHighlightPercentage(getPercentage(rating));
  }, [rating]);

  return (
    <div
      tabIndex={0}
      role="button" // required by eslint
      onClick={onClick}
      onKeyPress={onClick} // required by eslint
      className={styles.starContainer}
    >
      <div className={styles.greyContainer}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <div
        className={styles.highlightedContainer}
        style={{ width: `${highlightPercentage}%` }}
      >
        <Star highlight />
        <Star highlight />
        <Star highlight />
        <Star highlight />
        <Star highlight />
      </div>
    </div>
  );
}

export default StarRating;
