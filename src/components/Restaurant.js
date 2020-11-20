import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
<<<<<<< HEAD
import CardMedia from '@material-ui/core/CardMedia';
=======
>>>>>>> 952d128b3071914d927953750810ae6a48197add
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
<<<<<<< HEAD
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import imgDefault from "../img/default.jpeg"
=======
import ReactStreetview from 'react-streetview';
>>>>>>> 952d128b3071914d927953750810ae6a48197add

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
<<<<<<< HEAD
  },
  media: {
    height: 0,
=======
    height:400
  },
  media: {
>>>>>>> 952d128b3071914d927953750810ae6a48197add
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

<<<<<<< HEAD

const Restaurant = ({nameRestaurant,address,lat,lon,rating,types,id,image}) =>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const imgCard = (img) =>{
    if(img){
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${img[0].photo_reference}&key={YourAPIKEY}`
    }
    return imgDefault
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //console.log(image)
=======
const Restaurant = ({nameRestaurant,address,lat,lon}) =>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const streetViewPanoramaOptions = {
    position: {lat: lat, lng: lon},
    pov: {heading: 100, pitch: 0},
    zoom: 1
  };

>>>>>>> 952d128b3071914d927953750810ae6a48197add
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
<<<<<<< HEAD
             {nameRestaurant.charAt(0)}  
=======
            {nameRestaurant.charAt(0)} 
>>>>>>> 952d128b3071914d927953750810ae6a48197add
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={nameRestaurant}
        subheader={address} 
      />
<<<<<<< HEAD
      <CardMedia
        className={classes.media}
        image={imgCard(image)}
        title="Paella dish"
      />
      <CardContent>
        {
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
=======
      <CardContent style={{
                width: '100%',
                height: '50%',
                backgroundColor: '#eeeeee'
            }}>
      <ReactStreetview
					streetViewPanoramaOptions={streetViewPanoramaOptions}
			/>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
>>>>>>> 952d128b3071914d927953750810ae6a48197add
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

<<<<<<< HEAD


=======
>>>>>>> 952d128b3071914d927953750810ae6a48197add
export default Restaurant