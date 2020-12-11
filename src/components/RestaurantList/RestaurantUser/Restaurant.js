import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import imgDefault from "../../../img/default.jpeg";
import Loader from 'react-loader-spinner'
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const RestaurantUser = ({nameRestaurant,address,rating,types,image,id,review}) =>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  /*  if(review === undefined){ 
    return(
      <div style={{display:"flex",width:"100%",height:"100%"}}>
      <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         style={{margin:"auto"}}
      />
      </div>
     );
  }  */

  const imgCard = (img) =>{ // if img is defined, create an dynamic url 
    if(img){
      return img
    }
    return imgDefault
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
             {nameRestaurant.charAt(0)}  
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={nameRestaurant}
        subheader={address} 
        style={{"height":"70px"}}
      />
      <CardMedia
        className={classes.media}
        image={imgCard(image)}
        title="Paella dish"
      />
      <CardContent>
        { // display type of restaurants
          types?
          Object.keys(types)
          .map(key=>(
            <Chip
                key={key}
                avatar={<Avatar>{types[key].charAt(0).toUpperCase()}</Avatar>}
                label={types[key]}
                clickable
                color="primary"
                variant="outlined"
              />
          ))
          :
          <span></span>
        }
      </CardContent>
      <CardContent>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          ref={null}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* <CardContent>
         { // display reviews of restaurants
          review.reviews?   
            Object.keys(review.reviews)
            .map(key=>(
              <CardHeader
                key={key}
                avatar={
                  <Avatar alt={review.reviews[key].author_name} src={review.reviews[key].profile_photo_url} />
                }
                title={review.reviews[key].author_name}
                subheader={review.reviews[key].text} 
              />
            ))
            :
            <Typography paragraph>
                Aucun avis
            </Typography>
          }  
        
        </CardContent> */}
      </Collapse>
    </Card>
  );
}

RestaurantUser.propTypes = {
  nameRestaurant : PropTypes.string.isRequired,
  address : PropTypes.string.isRequired,
  rating : PropTypes.number.isRequired,
  type: PropTypes.array,
  image: PropTypes.string,
  id: PropTypes.string,
  review: PropTypes.object
}

export default RestaurantUser