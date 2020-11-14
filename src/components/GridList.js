import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import CardRestaurant from "./Restaurant"
import {connect} from "react-redux"

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


const GridListRestaurant = ({restaurants}) =>{
  const classes = useStyles();
  console.log("gridlist",restaurants)
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
            {
              Object.keys(restaurants)
              .map(key =>(
                <CardRestaurant
                key={key}
                nameRestaurant={restaurants[key].restaurantName}
                address={restaurants[key].address}
                lat={restaurants[key].lat}
                lon={restaurants[key].long}
                />
              ))
            }
      </GridList>
    </div>
  );
}

const mapStateToProps = ({restaurants}) =>{
  return{
    restaurants,
  }
}



export default connect(mapStateToProps)(GridListRestaurant)