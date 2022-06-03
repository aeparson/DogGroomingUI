import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import { fetchRoomById, updateRoomInfo } from '../../utils/service-pages/roomService';
import validateRoom from '../../utils/validation/roomValidation';
import styles from './roomForm.module.css';
import Constants from '../../utils/constants';
import FormItem from '../form/FormItem';

/**
 * @name EditRoomPage
 * @description fetches room information based on room id & allows editing via a form.
 * @param {room, setRoom}
 * @returns component
 */
const EditRoomTypePage = () => {
  const [room, setRoom] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    roomType: '', description: '', rate: '', active: ''
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const rereoute = useNavigate();
  const { id } = useParams();

  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };
  useEffect(() => {
    fetchRoomById(Number(id), setRoomInfo);
  }, [id]);

  /**
   * @description Allows form input boxes to be typed into
   */
  const onRoomChange = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.id]: e.target.value });
  };

  /**
   * @description Packet of information being sent to database for put request.
   * If information has been entered into a form box, it will be read and added
   * to the packet, otherwise what is sent is the room's existing information.
   */
  const activeStatus = checked;
  const roomPacket = {
    id: room.id,
    name: roomInfo.name,
    description: roomInfo.description,
    rate: roomInfo.rate,
    active: activeStatus
  };

  /**
   * @description Event handler that sends PUT request to database on clicking Save. Validation is
   * initially checked, and either field errors are set where necessary, or information packet is
   * sent to database and changes are persisted.
   */

  const AttemptRoomChange = () => {
    const invalidInfo = validateRoom(roomPacket);
    if (Object.keys(invalidInfo).length === 0) {
      updateRoomInfo(roomPacket, { id }, setApiError)
        .then(rereoute('/room-types'));
      setFieldErrors([]);
      Object.assign(roomPacket);
      setRoom(roomPacket);
    } else {
      setFieldErrors(invalidInfo);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <div className={styles.roomInfoContainer}>
          <div className={styles.roomContainer}>
            <h3 className={styles.title}>
              Edit Room
              <hr />
            </h3>
            <h4>
              Room Name
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.name === undefined ? undefined
                  : styles.invalid}
                >
                  <span className={styles.input}>
                    <FormItem
                      placeholder={roomInfo.name}
                      value={roomPacket.name}
                      type="text"
                      id="name"
                      onChange={onRoomChange}
                    />
                  </span>
                </div>
                <p className={styles.errorMessage}>
                  {fieldErrors.name !== undefined && fieldErrors.name}
                </p>
              </div>
            </h4>
            <h4>
              Description
              {' '}
              <div className={styles.inputContainer}>
                <span className={styles.input}>
                  <FormItem
                    placeholder={roomInfo.description}
                    value={roomPacket.description}
                    type="textarea"
                    id="description"
                    onChange={onRoomChange}
                  />
                </span>
              </div>
            </h4>
            <h4>
              Rate
              {' '}
              <div className={styles.inputContainer}>
                <div className={fieldErrors.rate === undefined
                  ? undefined : styles.invalid}
                >
                  <span className={styles.input}>

                    <FormItem
                      defaultValue={roomInfo.rate}
                      value={roomPacket.rate}
                      type="number"
                      id="rate"
                      onChange={onRoomChange}
                    />
                  </span>
                </div>
                <p className={styles.errorMessage}>
                  {fieldErrors.rate !== undefined && fieldErrors.rate}
                </p>
              </div>
            </h4>
            <h4>
              <div className={styles.inputContainer}>
                <span className={styles.input}>
                  <input
                    type="checkbox"
                    id="active"
                    onChange={handleCheck}
                    value={checked}
                  />
                  Active
                  {' '}
                </span>
              </div>
            </h4>
            <Box className={styles.button}>
              <Button
                onClick={AttemptRoomChange}
                variant="contained"
                disableElevation
                size="large"
                data-testid="edit-spot"
              >
                Save
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRoomTypePage;
