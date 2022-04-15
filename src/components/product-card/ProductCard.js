import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import ProductModal from '../product-modal/ProductModal';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const classes = useStyles();

  const { dispatch } = useCart();

  const onFavorite = (event) => {
    event.stopPropagation();
    // this exists to intercept the click event
    // so that the modal doesn't open
    // add your code for Add-to-Favorites functionality here
  };

  const onShare = (event) => {
    event.stopPropagation();
    // this exists to intercept the click event
    // so that the modal doesn't open
    // add your code for Share functionality here
  };

  const onAdd = (event) => {
    event.stopPropagation();
    dispatch(
      {
        type: 'add',
        product: {
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          quantity: 1
        }
      }
    );
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <ProductModal
        open={modalIsOpen}
        product={product}
        handleClose={handleModalClose}
      />
      <Card className={classes.root} onClick={openModal}>
        <CardHeader
          avatar={(
            <Avatar aria-label="demographics" className={classes.avatar}>
              {product.demographic.charAt(0)}
            </Avatar>
        )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
        )}
          title={product.name}
          subheader={`${product.demographic} ${product.category} ${product.type}`}
        />
        <CardMedia
          className={classes.media}
          image={Constants.PLACEHOLDER_IMAGE}
          title="placeholder"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            Price: $
            {product.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onFavorite}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={onShare}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="add to shopping cart" onClick={onAdd}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
