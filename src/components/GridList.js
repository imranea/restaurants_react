import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import{connect} from "react-redux"
import CardRestaurant from "./Restaurant"

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


const GridListRestaurant = ({restaurants,note}) =>{
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
            {
              Object.keys(restaurants)
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
