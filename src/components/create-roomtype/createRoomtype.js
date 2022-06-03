import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import validateRoom from '../../utils/validation/roomValidation';
import { createNewRoom } from '../../utils/service-pages/roomService';
import styles from '../edit-roomtype/roomForm.module.css';
import FormItem from '../form/FormItem';

/**
 * @name CreateRoomPage
 * @description allows you to create a new instance of a room type.
 * @param {room, setRoom}
 * @returns component
 */
const CreateRoomPage = () => {
  const [roomInfo, setRoomInfo] = useState({
    roomType: '', description: '', rate: '', active: ''
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const rereoute = useNavigate();

  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  /**
   * @description Allows form input boxes to be typed into
   */
  const OnRoomCreate = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.id]: e.target.value });
  };

  /**
   * @description Packet of information being sent to database for put request.
   * Information entered into a form box will be read and added
   * to the packet.
   */
  const activeStatus = checked;
  const roomPacket = {
    name: roomInfo.name,
    description: roomInfo.description,
    rate: roomInfo.rate,
    active: activeStatus
  };

  /**
   * @description Event handler that sends POST request to database on clicking Save. Validation is
   * initially checked, and either field errors are set where necessary, or information packet is
   * sent to database and changes are persisted.
   */

  const AttemptRoomCreate = () => {
    const invalidInfo = validateRoom(roomPacket);
    if (Object.keys(invalidInfo).length === 0) {
      createNewRoom(roomPacket, setRoomInfo)
        .then(() => {
          rereoute('/room-types');
        });
    } else {
      setFieldErrors(invalidInfo);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.roomInfoContainer}>
          <div className={styles.roomContainer}>
            <h3 className={styles.title}>
              Create Room
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
                      value={roomPacket.name}
                      type="text"
                      id="name"
                      onChange={OnRoomCreate}
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
                    value={roomPacket.description}
                    type="textarea"
                    id="description"
                    onChange={OnRoomCreate}
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
                      value={roomPacket.rate}
                      type="number"
                      id="rate"
                      onChange={OnRoomCreate}
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
                onClick={AttemptRoomCreate}
                variant="contained"
                disableElevation
                size="small"
                data-testid="edit-spot"
              >
                Create
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoomPage;
