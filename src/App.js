import React,{useEffect,useState} from "react"
import {connect} from "react-redux"
import './App.css';
import Map from "./components/Map/Map"
import GridList from "./components/RestaurantList/GridList"
import fetchRestaurant from "./store/fetchRestaurant"
import Loader from 'react-loader-spinner'
import Slider from "./components/Filter/Slider"

const App = ({fetchRestaurant,restaurants,note})=>{
  const [center,setCenter] = useState({
    lat: null,
    lng: null
  })
  const [zoom,setZoom]=useState(14)


  useEffect(()=>{ 
    navigator.geolocation.watchPosition( (position) =>{ // if geolocation is active, we recover lat and lng to send in the function
      setCenter({                                       // fetchRestaurant to start our HTTP resquest with module axios
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
     fetchRestaurant(position.coords.latitude,position.coords.longitude)
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) // else we send default value(location in Paris)
      setCenter({
        lat:48.8837815,
        lng:2.3601649
      })
     fetchRestaurant(48.8837815,2.3601649)
    });
  },[fetchRestaurant]);

  if(restaurants.length===0){
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

  const mapStateToProps = ({restaurants,note}) =>{ // get our state from store
    return{
      restaurants,
      note
    };
  }


const mapDispatchToProps = dispatch =>{ // function from store 
  return{
    fetchRestaurant : (bool,lat,lng) => dispatch(fetchRestaurant(bool,lat,lng))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App); 
