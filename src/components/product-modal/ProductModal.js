import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent, DialogContentText, DialogTitle, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const ProductModal = ({
  open, product, handleClose, addToCart
}) => (
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
      <IconButton aria-label="add to shopping cart" onClick={addToCart}>
        <AddShoppingCartIcon />
      </IconButton>
    </DialogActions>
  </Dialog>
);

export default ProductModal;
