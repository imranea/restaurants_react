import React,{useEffect,useState} from "react"
import {connect} from "react-redux"
import './App.css';
import Map from "./components/Map"
import GridList from "./components/GridList"
import fetchRestaurant from "./store/fetchRestaurant"
<<<<<<< HEAD
import Loader from 'react-loader-spinner'
import Slider from "./components/Slider"

const App = ({fetchRestaurant,restaurants,note})=>{
=======

 
const App = ({fetchRestaurant,restaurants})=>{
>>>>>>> 952d128b3071914d927953750810ae6a48197add
  const [center,setCenter] = useState({
    lat: null,
    lng: null
  })
<<<<<<< HEAD
  const [zoom,setZoom]=useState(14)


  useEffect(()=>{
    navigator.geolocation.watchPosition( (position) =>{
      setCenter({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
      fetchRestaurant(true,position.coords.latitude,position.coords.longitude)
    },
    error => {
      if (error.code === error.PERMISSION_DENIED)
      setCenter({
        lat:48.8837815,
        lng:2.3601649
      })
      fetchRestaurant(false,null,null)
    });
  },[fetchRestaurant]);

  if(restaurants.length==0){
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
  }
    return (
      // Important! Always set the container height explicitly
      <>
     <Map center={center} zoom={zoom} restaurants={restaurants} note={note}/>
      <Slider/>
      <div>
        <GridList restaurants={restaurants} note={note}/>
      </div> 
      </>
    );
  }

  const mapStateToProps = ({restaurants,note}) =>{
    return{
      restaurants,
      note
    };
  }


const mapDispatchToProps = dispatch =>{
  return{
    fetchRestaurant : (bool,lat,lng) => dispatch(fetchRestaurant(bool,lat,lng))
=======
  const [zoom,setZoom]=useState(11)


  useEffect(()=>{
    fetchRestaurant()
    navigator.geolocation.watchPosition( position =>{
      setCenter({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
    },
    error => {
      if (error.code === error.PERMISSION_DENIED)
      setCenter({
        lat:48.8837815,
        lng:2.3601649
      })
    });
  },[fetchRestaurant]);

    return (
      // Important! Always set the container height explicitly
      <>
      <Map center={center} zoom={zoom} restaurants={restaurants}/>
      <div>
        <GridList restaurants={restaurants}/>
      </div>
      </>
    );
  }


  const mapStateToProps = ({restaurants}) =>{
    return{
      restaurants
    };
  }

const mapDispatchToProps = dispatch =>{
  return{
    fetchRestaurant : () => dispatch(fetchRestaurant())
>>>>>>> 952d128b3071914d927953750810ae6a48197add
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App); 
