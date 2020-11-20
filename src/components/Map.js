import React from "react"
<<<<<<< HEAD
import {connect} from "react-redux"
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const Map = ({center,zoom,restaurants,note})=>{
 
=======

import GoogleMapReact from 'google-map-react';

 
const Map = ({center,zoom,restaurants})=>{


    const renderRestaurant = (map, maps) =>{
      restaurants.forEach(restaurant =>{
        let markerRestaurant = new maps.Marker({
          position: {lat:restaurant.lat,lng:restaurant.long},
          map,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
        let infowindowRestaurant = new maps.InfoWindow({
          content: `<div>
          <h3>Nom du restaurant : ${restaurant.restaurantName}</h3>
          <h3>Adress: ${restaurant.address} </h3>

          </div>`,
        });
        markerRestaurant.addListener("click", () => {
          infowindowRestaurant.open(map, markerRestaurant);
        });
      })
     
    } 

>>>>>>> 952d128b3071914d927953750810ae6a48197add
    const renderMarkers = (map, maps)=> {
      let infowindow = new maps.InfoWindow({
        content: "<h3>Votre localisation</h3>",
      });
      let marker = new maps.Marker({
        position: center,
        map
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
<<<<<<< HEAD
        //renderRestaurant(map,maps);
    }

=======
        renderRestaurant(map,maps);
    }
    //console.log(restaurants)
>>>>>>> 952d128b3071914d927953750810ae6a48197add
    return (
      // Important! Always set the container height explicitly
      <>
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          center={center}
          zoom={zoom}
          onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {
<<<<<<< HEAD
            Object.keys(restaurants)
            .map(key =>{
              if(note>Math.round(restaurants[key].rating||0)){
                return;
              }
              return(
                <Marker
                  key={key}
                  lat={restaurants[key].geometry.location.lat}
                  lng={restaurants[key].geometry.location.lng}
                  name={restaurants[key].name}
                  color="blue"
                />
              )
            })
          }

=======
            
          }
>>>>>>> 952d128b3071914d927953750810ae6a48197add
        </GoogleMapReact>
      </div>
      </>
    );
  }


export default Map; 
