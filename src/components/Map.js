import React from "react"
import {connect} from "react-redux"
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const Map = ({center,zoom,restaurants,note})=>{
 
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
        //renderRestaurant(map,maps);
    }

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

        </GoogleMapReact>
      </div>
      </>
    );
  }


export default Map; 
