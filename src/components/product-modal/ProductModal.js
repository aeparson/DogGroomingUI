import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
  Chip,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as Down, faChevronUp as Up } from '@fortawesome/free-solid-svg-icons';
import Image from 'mui-image';
import { Tooltip } from '@mui/material';
import QuantityPicker from '../quantity-picker/QuantityPicker';
import { useCart } from '../checkout-page/CartContext';
import AddReview from './AddReview';
import constants from '../../utils/constants';
import { fetchUserPurchase } from '../profile-page/ProfilePageService';
import reviewStyles from './ProductModal.module.css';
import ProductReviewList from '../product-review/ProductReviewList';
import assignImage from '../../utils/AssignImages';

const useStyles = makeStyles({
  dialogContent: {
    padding: '24px',
    '&:first-child': {
      paddingTop: '24px'
    }
  },
  image: {
    borderRadius: '4px'
  },
  productDetails: {
    overflowX: 'hidden'
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
    padding: 0,
    flexShrink: 1,
    maxWidth: '32ch'
  },
  productDescription: {
    marginBottom: '2rem',
    '& p': {
      maxWidth: '40ch'
    },
    maxWidth: '90%'
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
  },
  reviewActions: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.5em'
  },
  sortOrderIcon: {
    marginLeft: '5px',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  downIcon: {
    transform: 'translateY(-1px)'
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

const ProductModal = ({
  user,
  open,
  product,
  handleClose,
  showReviewsOnOpen
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(showReviewsOnOpen);
  const [sortOrder, setSortOrder] = useState('descending');

  const reviewContainerRef = useRef(null);

  useEffect(() => {
    // opens modal with reviews hidden if product has no reviews
    if (product.reviewCount > 0) { setShowReviews(showReviewsOnOpen); }
  }, [showReviewsOnOpen, product.reviewCount]);

  useEffect(() => {
    if (showReviews) reviewContainerRef.current.scrollIntoView();
  }, [showReviews]);

  const { dispatch } = useCart();

  const [apiError, setApiError] = useState(false);
  const [purchases, setPurchase] = useState([]);

  useEffect(() => {
    fetchUserPurchase(setPurchase, setApiError, user);
  }, [user]);

  const styles = useStyles();

  const onAdd = () => {
    if (quantity === 0) return;
    dispatch(
      {
        type: 'add',
        product: {
          productId: product.id,
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

  const [show, setShow] = useState(false);

  const addReviewForm = () => {
    setShow(!show);
  };

  const loggedIn = (_product) => {
    let hasPurchased = false;
    purchases.forEach((purchase) => purchase.lineItems.forEach((lineItem) => {
      if (lineItem.productId === _product.id) { hasPurchased = true; }
    }));
    if (user === '') {
      return (
        <div>
          <Tooltip title="You must be logged in to write a review.">
            <Button
              type="button"
              className={reviewStyles.addReview}
              variant="outlined"
              size="small"
            >
              Review
            </Button>
          </Tooltip>
        </div>
      );
    }
    if (!hasPurchased) {
      return (
        <div>
          <Tooltip title="You must purchase this product to write a review.">
            <Button
              type="button"
              className={reviewStyles.addReview}
              variant="outlined"
              size="small"
            >
              Review
            </Button>
          </Tooltip>
        </div>
      );
    }
    if (hasPurchased) {
      return (
        <Button
          type="button"
          className={reviewStyles.addReview}
          variant="outlined"
          size="small"
          onClick={() => {
            addReviewForm(); setShowReviews(showReviews);
          }}
        >
          Review
        </Button>
      );
    } return (<span />);
  };

  const toggleSortOrder = () => {
    if (sortOrder === 'descending') {
      setSortOrder('ascending');
    } else {
      setSortOrder('descending');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="paper">
      <DialogContent className={styles.dialogContent}>
        <Grid container spacing={3} className={styles.containerGrid}>
          <Grid item xs={8} className={styles.imageWrap}>
            <Image
              height="calc(100vh - 64px - 48px)" // hacky
              fit="cover"
              src={assignImage(product)}
              duration={2000}
              className={styles.image}
            />
          </Grid>
          <Grid container direction="column" item xs={4} className={styles.productDetails}>
            <Grid container item direction="row" className={styles.titleRow}>
              <DialogTitle className={styles.title}>
                {product.name}
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className={styles.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item className={styles.productDescription}>
              <Typography>{product.description}</Typography>
            </Grid>
            <Box className={styles.productTags}>
              <Chip label={product.category} variant="outlined" />
              <Chip label={product.type} variant="outlined" />
            </Box>
            <Box className={styles.productColors}>
              <Chip
                className={styles[getTextColorClass(product.primaryColorCode)]}
                label={product.primaryColorCode.toUpperCase()}
                style={{ backgroundColor: product.primaryColorCode }}
              />
              <Chip
                className={styles[getTextColorClass(product.secondaryColorCode)]}
                label={product.secondaryColorCode.toUpperCase()}
                style={{ backgroundColor: product.secondaryColorCode }}
              />
            </Box>
            <Box className={styles.viewReviewsButtonContainer}>
              <Button
                variant="outlined"
                size="small"
                className={styles.viewReviewsButton}
                onClick={() => setShowReviews(!showReviews)}
              >
                {showReviews ? 'Hide Reviews' : 'View Reviews'}
              </Button>
            </Box>
            <Box className={styles.bottom}>
              <Typography className={styles.price}>
                $
                {product.price.toFixed(2)}
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
          {showReviews && (
            <Grid item xs={8}>
              <div ref={reviewContainerRef}>
                <Box className={styles.reviewActions}>
                  <Button
                    variant="outlined"
                    size="small"
                    className={styles.viewReviewsButton}
                    onClick={() => setShowReviews(!showReviews)}
                  >
                    {showReviews ? 'Hide Reviews' : 'View Reviews'}
                  </Button>
                  {showReviews
                && (
                <>
                  <Button
                    size="small"
                    onClick={toggleSortOrder}
                    className={styles.sortOrderButton}
                  >
                    {sortOrder === 'descending' ? 'Newest first' : 'Oldest first'}
                    <FontAwesomeIcon
                      className={sortOrder === 'descending' ? `${styles.sortOrderIcon} ${styles.downIcon}` : styles.sortOrderIcon}
                      icon={sortOrder === 'descending' ? Down : Up}
                      size="1x"
                    />
                  </Button>
                </>
                )}
                </Box>
                <Box className={styles.reviewsContainer}>
                  <>
                    {loggedIn(product)}
                    {show && (
                    <AddReview
                      user={user}
                      product={product}
                      setShowReviews={setShowReviews}
                      setShow={setShow}
                    />
                    )}
                    {apiError && (
                    <p data-testid="errMsg">
                      {constants.API_ERROR}
                    </p>
                    )}
                  </>
                  <ProductReviewList productId={product.id} sortOrder={sortOrder} />
                </Box>
              </div>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
