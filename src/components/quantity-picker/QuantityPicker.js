/* eslint-disable no-unused-vars */
import React from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const QuantityPicker = () => (
  <>
    <TextField
      label="Quantity"
      sx={{ m: 1, width: '25ch' }}
      InputProps={{
        startAdornment:
  <InputAdornment position="start">
    <IconButton><Add /></IconButton>
  </InputAdornment>,
        endAdornment:
  <InputAdornment position="end">
    <IconButton><Remove /></IconButton>
  </InputAdornment>
      }}
      variant="filled"
    />
  </>

);

export default QuantityPicker;
