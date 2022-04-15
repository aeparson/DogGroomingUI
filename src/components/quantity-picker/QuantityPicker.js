import React from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const QuantityPicker = ({ quantity, onChange, updateQuantity }) => {
  const incrementQuantity = () => {
    updateQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity < 1) return;
    updateQuantity(quantity - 1);
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

  const inputElementProps = {
    style: {
      width: '4ch'
    }
  };

  return (
    <TextField
      label="Quantity"
      sx={{ m: 1, width: '25ch' }}
      value={quantity}
      onChange={onChange}
      InputProps={inputProps}
      // not duplicate props, similar names
      // required by component
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={inputElementProps}
      variant="outlined"
    />
  );
};

export default QuantityPicker;
