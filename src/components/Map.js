import React from "react"

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
        renderRestaurant(map,maps);
    }
    //console.log(restaurants)
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
            
          }
        </GoogleMapReact>
      </div>
      </>
    );
  }


export default Map; 
