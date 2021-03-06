import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import assignImage from '../../../utils/AssignImages';

/**
 * @name useStyles
 * @description Material-ui styling for RoomTypeCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: 'var(--card-width)'
  },
  title: {
    fontSize: 20
  },
  cardContent: {
    paddingBottom: 'auto'
  },
  rate: {
    marginBottom: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // percentage of *width* of containing block
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
  }

}));

/**
 * @name RoomCard
 * @description displays single room card component
 * @param {object} roomType roomType object
 * @return component
 */
const RoomCard = ({ roomType }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const Reroute = () => {
    const path = `/room-types/edit/${roomType.id}`;
    navigate(path);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={(
            <Avatar aria-label="name" className={classes.avatar} src="https://i.imgur.com/fxrnL0W.png">
              {roomType.name.charAt(0)}
            </Avatar>
          )}
          action={(
            <IconButton aria-label="edit">
              <EditIcon onClick={Reroute} />
            </IconButton>
          )}
          title={roomType.name}
          classes={{ title: classes.title }}
        />
        <CardMedia
          className={classes.media}
          image={assignImage(roomType)}
          title="product image"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" color="textSecondary" component="p">
            {roomType.description}
          </Typography>
          <br />
          <Typography className={classes.rate} variant="body2" color="textSecondary">
            Nightly Rate: $
            {roomType.rate.toFixed(2)}
          </Typography>
          <Typography className={classes.rate} variant="body2" color="textSecondary">
            {(roomType.active ? 'Active' : 'Inactive'
        )}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default RoomCard;
