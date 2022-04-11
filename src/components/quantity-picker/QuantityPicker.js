/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const QuantityPicker = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = (event) => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity < 1) return;
    setQuantity(quantity - 1);
  };

  const inputProps = {
    startAdornment:
  <InputAdornment position="start">
    <IconButton onClick={decrementQuantity}><Remove /></IconButton>
  </InputAdornment>,
    endAdornment:
  <InputAdornment position="end">
    <IconButton onClick={incrementQuantity}><Add /></IconButton>
  </InputAdornment>
  };

  return (
    <TextField
      label="Quantity"
      sx={{ m: 1, width: '25ch' }}
      value={quantity}
      onChange={onChange}
      InputProps={inputProps}
      variant="outlined"
    />
  );
};

export default QuantityPicker;
