import {fetchRestaurant} from "./action"
import data from "../restaurant.json"
<<<<<<< HEAD
import axios from "axios"

export default (place,lat,lng)=>{
    //if(place === true){
        return async dispatch=>{
        if(place === true){
        await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key={YourAPIKEY}`)
        .then(response => {
                dispatch(fetchRestaurant(response.data.results))
        })
        }
        else{
            dispatch(fetchRestaurant(data))
        }
}
=======

export default ()=>{
    return dispatch=>{
        dispatch(fetchRestaurant(data))
    }
>>>>>>> 952d128b3071914d927953750810ae6a48197add
}