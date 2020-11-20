import React from 'react';
import {connect} from "react-redux"
import noteRestaurant from "../store/noteRestaurant"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin:"auto"
  },
  margin: {
    height: theme.spacing(3),
  },
}));



const DiscreteSlider=({noteRestaurant}) =>{
  const classes = useStyles();

const valuetext = (value) =>{
    noteRestaurant(value)
   //console.log("value",value)
 }


  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Filter Rating
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          0
        </Grid>
        <Grid item xs>
            <Slider
            defaultValue={0}
            min={0}
            max={5}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={1}
            valueLabelDisplay="auto"
        />
        </Grid>
        <Grid item>
          5
        </Grid>
      </Grid>
    </div>
  );
}

const mapDispatchToProps = dispatch =>{
  return{
    noteRestaurant : (nb) => dispatch(noteRestaurant(nb))
  }
} 

export default connect(null,mapDispatchToProps)(DiscreteSlider);