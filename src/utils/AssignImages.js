import ProductImages from './ProductImages';
import constants from './constants';

const assignImage = (product) => {
  if (product.type === 'Pant') {
    return ProductImages.PANT_IMAGE;
  } if (product.type === 'Short') {
    return ProductImages.SHORT_IMAGE;
  } if (product.type === 'Shoe') {
    return ProductImages.SHOE_IMAGE;
  } if (product.type === 'Glove') {
    return ProductImages.GLOVE_IMAGE;
  } if (product.type === 'Jacket') {
    return ProductImages.JACKET_IMAGE;
  } if (product.type === 'Tank Top') {
    return ProductImages.TANK_TOP_IMAGE;
  } if (product.type === 'Sock') {
    return ProductImages.SOCK_IMAGE;
  } if (product.type === 'Sunglasses') {
    return ProductImages.SUNGLASSES_IMAGE;
  } if (product.type === 'Hat') {
    return ProductImages.HAT_IMAGE;
  } if (product.type === 'Helmet') {
    return ProductImages.HELMET_IMAGE;
  } if (product.type === 'Belt') {
    return ProductImages.BELT_IMAGE;
  } if (product.type === 'Visor') {
    return ProductImages.VISOR_IMAGE;
  } if (product.type === 'Shin Guard') {
    return ProductImages.SHIN_GUARD_IMAGE;
  } if (product.type === 'Elbow Pad') {
    return ProductImages.ELBOW_PAD_IMAGE;
  } if (product.type === 'Headband') {
    return ProductImages.HEADBAND_IMAGE;
  } if (product.type === 'Wristband') {
    return ProductImages.WRISTBAND_IMAGE;
  } if (product.type === 'Hoodie') {
    return ProductImages.HOODIE_IMAGE;
  } if (product.type === 'Flip Flop') {
    return ProductImages.FLIP_FLOP_IMAGE;
  } if (product.type === 'Pool Noodle') {
    return ProductImages.POOL_NOODLE_IMAGE;
  } return constants.PLACEHOLDER_IMAGE;
};

export default assignImage;
