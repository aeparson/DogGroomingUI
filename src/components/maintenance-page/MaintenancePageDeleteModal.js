import { IconButton } from '@material-ui/core';
import React, { createRef, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import { toggleProductActiveStateById } from './MaintenancePageService';
import styles from './MaintenancePage.module.css';

/**
 * @description function for modal
 * @param closeModal toggles modal
 * @param open toggles modal
 * @param product will pull all of the products active and inactive
 * @param UpdateProducts will update products based on edits
 * @returns component
 */

function Modal({
  closeModal, product, open, updateProducts
}) {
  const toggleActive = async () => {
    await toggleProductActiveStateById(product.id);
    updateProducts();
    closeModal(false);
  };
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
        <IconButton aria-label="close modal" className={styles.modalCloseBtn} onClick={() => closeModal(false)}>
          <AiIcons.AiOutlineClose />
        </IconButton>
        <div className={styles.deleteModalTitle}>
          <h1>
            {product.name}
            {' '}
            has been purchased, and therefore cannot be deleted.
          </h1>

        </div>

        <div className={styles.deleteModalBody}>
          <p>Would you like to set it to inactive instead?</p>

        </div>
        <div className={styles.footer}>

          <button
            type="submit"
            className={styles.confirmBtn}
            onClick={toggleActive}

          >
            {' '}
            <p className={styles.confirmBtnText}>
              Confirm
            </p>
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
