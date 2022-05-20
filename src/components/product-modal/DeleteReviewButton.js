import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Modal from './DeleteReviewModal';
import styles from './ProductModal.module.css';

/**
 * A clickable trash can icon that opens a modal
 * @prop productReview
 * @prop user
 * @prop product
 * @prop update
 * @returns Delete button component
 */
const DeleteReviewButton = (
  {
    productReview, user, product, update
  }
) => {
  const [clickable] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const onClick = () => {
    if (clickable) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <IconButton onClick={onClick} color="inherit" size="small" className={styles.deleteIcon}>
        <DeleteIcon user={user} />
      </IconButton>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          reviewId={productReview.id}
          open={openModal}
          productName={product.name}
          update={update}
        />
      )}
    </>
  );
};

export default DeleteReviewButton;
