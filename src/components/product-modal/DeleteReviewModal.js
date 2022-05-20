import React, { createRef, useEffect } from 'react';
import styles from './ProductModal.module.css';
import { deleteReview } from './ProductReviewPageService';

/**
 * Modal that opens after delete review trashcan icon is clicked
 * @prop closeModal
 * @prop open
 * @prop productName
 * @prop reviewId
 * @prop update
 * @returns Delete Review modal component
 */
function Modal({
  closeModal, open, productName, reviewId, update
}) {
  const dialog = createRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open, dialog]);
  return (
    <dialog ref={dialog} className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button type="submit" onClick={() => closeModal(false)}> X </button>
        </div>
        <div className={styles.title}>
          <h2>
            Are you sure you want to delete your review for
            {' '}
            {productName}
            ?
          </h2>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={async () => {
              await deleteReview(reviewId, productName);
              closeModal(false);
              update();
            }}
          >
            {' '}
            Confirm
            {' '}

          </button>
          <button
            type="submit"
            className={styles.cancelBtn}
            onClick={() => closeModal(false)}
          >
            {' '}
            Cancel
            {' '}

          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
