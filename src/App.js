import React,{useEffect,useState} from "react"
import {connect} from "react-redux"
import './App.css';
import AppBar from "./components/AppBar/appBar"
import Map from "./components/Map/Map"
import GridList from "./components/RestaurantList/GridList"
import fetchRestaurant from "./store/fetchRestaurant"
import Loader from 'react-loader-spinner'
import Slider from "./components/Filter/Slider"
import {useMediaQuery} from "react-responsive"
import {Redirect} from "react-router-dom"
import {getProfile} from "./components/UserFunction"

const App = ({fetchRestaurant,restaurants,note})=>{

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-width: 321px)'
  })
  const [center,setCenter] = useState({
    lat: null,
    lng: null
  })
  const [redirect,setRedirect] = useState(false)
  let zoom =14
  
  

  useEffect(()=>{ 
    if(localStorage.getItem('token')){// execute only if token is present
      getProfile(localStorage.getItem('token')) // function from UserFunction.js
      .then(res=>{
        if(!res){
          setRedirect(true)
        }
        navigator.geolocation.watchPosition( (position) =>{ // if geolocation is active, we recover lat and lng to send in the function
          setCenter({                                       // fetchRestaurant to start our HTTP resquest with module axios
            lat:position.coords.latitude,
            lng:position.coords.longitude
          })
          fetchRestaurant(true,position.coords.latitude,position.coords.longitude)
        },
        error => {
          if (error.code === error.PERMISSION_DENIED) // else we send default value(location in Paris)
            setCenter({
              lat:48.8737815,
              lng:2.3601649
            })
            fetchRestaurant(false,48.8837815,2.3601649)
        })
      })
    }else{
      setRedirect(true)
    }
  },[fetchRestaurant]);

  if(redirect){ // if token is null, redirect to login page
    return (
      <Redirect to="/" />
    )
  }

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
  
  if(isTabletOrMobileDevice){
    zoom = 12
  }

    return (
      // Important! Always set the container height explicitly
      <>
      <AppBar/>
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
