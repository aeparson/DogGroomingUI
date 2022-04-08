/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent, DialogContentText, DialogTitle, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import QuantityPicker from '../quantity-picker/QuantityPicker';

const ProductModal = ({
  open, product, handleClose, addToCart
}) => {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (value) => setQuantity(value);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {product.name}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {product.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <QuantityPicker onChange={updateQuantity} />
        <IconButton aria-label="add to shopping cart" onClick={addToCart}>
          <AddShoppingCartIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
