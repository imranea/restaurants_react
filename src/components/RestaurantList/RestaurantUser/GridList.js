import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import{connect} from "react-redux"
import CardRestaurant from "./Restaurant"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    justifyContent:"center"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const GridListRestaurantUser = ({restaurants}) =>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
            { // map each object to create a component Card with props represents the informations of restaurants
              Object.keys(restaurants)
              .map(key => {
                return(
                <CardRestaurant
                  key={key}
                  id={restaurants[key]._id}
                  nameRestaurant={restaurants[key].name}
                  address={restaurants[key].vicinity}
                  lat={restaurants[key].geometry.latitude}
                  lon={restaurants[key].geometry.longitude}
                  rating={Math.round(restaurants[key].ratings)}
                  types={restaurants[key].types}
                  image={`${process.env.REACT_APP_API_NODE}/api/restaurants/userRestaurants/photo/${restaurants[key]._id}`}
                  //review={reviews[key] || restaurants[key]}
                />
                )
              })
            }
      </GridList>
    </div>
  );
}

export default GridListRestaurantUser
