import React,{useEffect,useState} from "react"
import {connect} from "react-redux"
import './App.css';
import Map from "./components/Map"
import GridList from "./components/GridList"
import fetchRestaurant from "./store/fetchRestaurant"

 
const App = ({fetchRestaurant,restaurants})=>{
  const [center,setCenter] = useState({
    lat: null,
    lng: null
  })
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
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App); 
