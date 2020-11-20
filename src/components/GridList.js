import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import CardRestaurant from "./Restaurant"
<<<<<<< HEAD
=======
import {connect} from "react-redux"
>>>>>>> 952d128b3071914d927953750810ae6a48197add

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


<<<<<<< HEAD
const GridListRestaurant = ({restaurants,note}) =>{
  const classes = useStyles();
  
=======
const GridListRestaurant = ({restaurants}) =>{
  const classes = useStyles();
  console.log("gridlist",restaurants)
>>>>>>> 952d128b3071914d927953750810ae6a48197add
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
            {
              Object.keys(restaurants)
<<<<<<< HEAD
              .map(key => {

                if(note>Math.round(restaurants[key].rating||0)){
                  return;
                }
                return(
                <CardRestaurant
                  key={key}
                  id={key}
                  nameRestaurant={restaurants[key].name}
                  address={restaurants[key].vicinity}
                  lat={restaurants[key].geometry.location.lat}
                  lon={restaurants[key].geometry.location.lng}
                  rating={Math.round(restaurants[key].rating)}
                  types={restaurants[key].types}
                  image={restaurants[key].photos}
                />
                )
              })
=======
              .map(key =>(
                <CardRestaurant
                key={key}
                nameRestaurant={restaurants[key].restaurantName}
                address={restaurants[key].address}
                lat={restaurants[key].lat}
                lon={restaurants[key].long}
                />
              ))
>>>>>>> 952d128b3071914d927953750810ae6a48197add
            }
      </GridList>
    </div>
  );
}

<<<<<<< HEAD
export default GridListRestaurant
=======
const mapStateToProps = ({restaurants}) =>{
  return{
    restaurants,
  }
}



export default connect(mapStateToProps)(GridListRestaurant)
>>>>>>> 952d128b3071914d927953750810ae6a48197add
