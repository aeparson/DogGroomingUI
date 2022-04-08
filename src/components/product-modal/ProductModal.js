import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogContent, DialogContentText, DialogTitle, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ProductModal = ({ open, product, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
      {product?.name}
      <IconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {product?.description}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

export default ProductModal;
