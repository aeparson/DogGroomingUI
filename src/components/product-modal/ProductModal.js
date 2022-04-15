import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
  Chip
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Image from 'mui-image';
import QuantityPicker from '../quantity-picker/QuantityPicker';
import { useCart } from '../checkout-page/CartContext';

const useStyles = makeStyles({
  dialogContent: {
    overflow: 'hidden', // fixes flash of scrollbar on first render
    padding: '24px',
    '&:first-child': {
      paddingTop: '24px'
    }
  },
  image: {
    borderRadius: '4px'
  },
  titleRow: {
    marginBottom: '1rem',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: -12,
    top: -12
  },
  title: {
    padding: 0
  },
  productDescription: {
    marginBottom: '2rem',
    '& p': {
      maxWidth: '45ch'
    }
  },
  productTags: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  productColors: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  lightText: {
    color: 'white'
  },
  darkText: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  bottom: {
    display: 'flex',
    marginTop: 'auto'
  },
  price: {
    fontSize: '1.5rem',
    alignSelf: 'center',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
});

const getTextColorClass = (backgroundColorCode) => {
  // Thanks to https://stackoverflow.com/a/3943023
  const colorCode = backgroundColorCode.slice(1);
  const [r, g, b] = [
    colorCode.slice(0, 2),
    colorCode.slice(2, 4),
    colorCode.slice(4)]
    .map((hex) => parseInt(hex, 16));
  const sum = [r * 0.299, g * 0.587, b * 0.114].reduce((prev, cur) => prev + cur);
  const threshold = 186; // adjust to taste
  return sum > threshold ? 'darkText' : 'lightText';
};

const ProductModal = ({ open, product, handleClose }) => {
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useCart();

  const classes = useStyles();

  const onAdd = () => {
    if (quantity === 0) return;
    dispatch(
      {
        type: 'add',
        product: {
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          quantity
        }
      }
    );
  };

  const updateQuantity = (newQuantity) => {
    setQuantity(Number(newQuantity));
  };

  const handleChange = (event) => {
    updateQuantity(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={3} className={classes.containerGrid}>
          <Grid item xs={6} className={classes.imageWrap}>
            <Image
              height="calc(100vh - 64px - 48px)" // hacky
              fit="cover"
              src={product.imageSrc}
              duration={2000}
              className={classes.image}
            />
          </Grid>
          <Grid container direction="column" item xs={6} className={classes.productDetails}>
            <Grid container item direction="row" className={classes.titleRow}>
              <DialogTitle className={classes.title}>
                {product.name}
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <DialogContentText className={classes.productDescription}>
              <Typography>{product.description}</Typography>
            </DialogContentText>
            <Box className={classes.productTags}>
              <Chip label={product.category} variant="outlined" />
              <Chip label={product.type} variant="outlined" />
            </Box>
            <Box className={classes.productColors}>
              <Chip
                className={classes[getTextColorClass(product.primaryColorCode)]}
                label={product.primaryColorCode.toUpperCase()}
                style={{ backgroundColor: product.primaryColorCode }}
              />
              <Chip
                className={classes[getTextColorClass(product.secondaryColorCode)]}
                label={product.secondaryColorCode.toUpperCase()}
                style={{ backgroundColor: product.secondaryColorCode }}
              />
            </Box>
            <Box className={classes.bottom}>
              <Typography className={classes.price}>
                $
                {product.price}
              </Typography>
              <DialogActions>
                <QuantityPicker
                  quantity={quantity}
                  onChange={handleChange}
                  updateQuantity={updateQuantity}
                />
                <IconButton aria-label="add to shopping cart" onClick={onAdd}>
                  <AddShoppingCartIcon />
                </IconButton>
              </DialogActions>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
