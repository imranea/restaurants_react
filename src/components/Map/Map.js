import React from "react"
import GoogleMapReact from 'google-map-react'; // API GOOGLE MAP
import Marker from './Marker';

const Map = ({center,zoom,restaurants,note})=>{
 
    const renderMarkers = (map, maps)=> { // function to display the marker represents the geolocation
      let infowindow = new maps.InfoWindow({
        content: "<h3>Votre localisation</h3>",
      });
      let marker = new maps.Marker({
        position: center,
        map
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker); // create a popup
      });
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
          { // display all markers represents Restaurants
            Object.keys(restaurants) 
            .map(key =>{
              if(note>Math.round(restaurants[key].rating||0)){
                return;
              }
              return(
                <Marker // component Marker
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
