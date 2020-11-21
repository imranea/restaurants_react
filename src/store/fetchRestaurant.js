import {fetchRestaurant} from "./action"
import data from "../restaurant.json"
import axios from "axios"

export default (place,lat,lng)=>{
    //if(place === true){
        return async dispatch=>{
        if(place === true){
        await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.REACT_APP_NOT_SECRET_CODE}`)
        .then(response => {
                dispatch(fetchRestaurant(response.data.results))
        })
        }
        else{
            dispatch(fetchRestaurant(data))
        }
}
}