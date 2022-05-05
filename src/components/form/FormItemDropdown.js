import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @param {string} [defaultValue] Value for initial state of field. Disabled if not in options list.
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options, defaultValue
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <select
          className={styles.input}
          id={id}
          onBlur={onChange}
          onChange={onChange}
          value={(options.includes(value) || defaultValue === undefined) ? value : defaultValue}
        >
          {(defaultValue !== undefined && !options.includes(defaultValue))
          && <option value={defaultValue} disabled>{defaultValue}</option>}

          {options.map((optionText) => (
            <option
              value={optionText}
              key={optionText}
            >
              {optionText}
            </option>
          ))}
        </select>
      </div>
    </label>
  </div>
);

export default FormItemDropdown;
