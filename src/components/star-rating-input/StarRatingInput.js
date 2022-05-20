import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './StarRatingInput.module.css';

function getStarClassNames(highlight) {
  return `${styles.base} ${highlight ? styles.highlight : styles.grey}`;
}

function Star({
  highlight, onClick, onHover, onBlur
}) {
  return (
    <FontAwesomeIcon
      icon={faStar}
      className={getStarClassNames(highlight)}
      size="1x"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
    />
  );
}

function ratingToNearestQuarter(_rating) {
  return Math.round(_rating * 4) / 4;
}

function getPercentage(_rating) {
  const nearestQuarter = ratingToNearestQuarter(_rating);
  const percentOfFive = (nearestQuarter / 5) * 100;
  return percentOfFive.toFixed(2);
}

function StarRatingInput({ rating, onChange }) {
  const [highlightPercentage, setHighlightPercentage] = useState(null);
  const [numericRating, setNumericRating] = useState(Number(rating));

  const changeRef = useRef(onChange);

  useEffect(() => {
    changeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    changeRef.current(numericRating);
  }, [numericRating]);

  useEffect(() => {
    if (Number.isNaN(numericRating)) {
      throw new Error(`Error parsing rating prop with value ${rating} into numeric value.`);
    }
  }, [rating, numericRating]);

  useEffect(() => {
    setHighlightPercentage(getPercentage(numericRating));
  }, [numericRating]);

  function onHover(position) {
    setHighlightPercentage(getPercentage(position));
  }

  function onBlur() {
    setHighlightPercentage(getPercentage(numericRating));
  }

  return (
    <div className={styles.root}>
      <div
        tabIndex={0}
        role="button" // required by eslint
        className={styles.starContainer}
      >
        <div className={styles.greyContainer} data-testId="greyContainer">
          {[1, 2, 3, 4, 5]
            .map((position) => (
              <Star
                key={position}
                onClick={() => setNumericRating(position)}
                onHover={() => onHover(position)}
                onBlur={() => onBlur()}
              />
            ))}
        </div>
        <div
          className={styles.highlightedContainer}
          style={{ width: `${highlightPercentage}%` }}
          data-testId="highlightedContainer"
        >
          {[1, 2, 3, 4, 5]
            .map((position) => (
              <Star
                highlight
                key={position}
                onClick={() => setNumericRating(position)}
                onHover={() => onHover(position)}
                onBlur={() => onBlur()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default StarRatingInput;

export const testExports = {};

try {
  if (jest !== undefined) {
    testExports.ratingToNearestQuarter = ratingToNearestQuarter;
    testExports.getPercentage = getPercentage;
  }
} catch (e) {
  if (!(e instanceof ReferenceError)) throw e;
}
