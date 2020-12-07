import {fetchRestaurant,fetchRestaurantReview} from "./action"
import data from "../restaurant.json"
import axios from "axios"


const proxyurl = "https://cors-anywhere.herokuapp.com/"; // resolve the problem of cors
  


export default (place,lat,lng)=>{
        return dispatch=>{
            if(place === true){
                axios.get(proxyurl+`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.REACT_APP_NOT_SECRET_CODE}`)
                .then((response) => {
                        let requests = response.data.results.map(element => {
                        return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${element.place_id}&key=${process.env.REACT_APP_NOT_SECRET_CODE}`
                        });
                        requests = requests.map(url =>axios.get(proxyurl+url)) // map the array to have only request axios
                        Promise.all(requests) // Does not move on until all requests have been completed
                        .then(res => res.map(review =>{
                            return review.data.result   // return the review of restaurants
                        }))
                        .then(reviews => dispatch(fetchRestaurantReview(reviews))) // dispatch to action.js the result
                        dispatch(fetchRestaurant(response.data.results)) // dispatch to action.js the result
                })
            }else{ // if geolocate is unavailable
                dispatch(fetchRestaurant(data))
            }
    }
}