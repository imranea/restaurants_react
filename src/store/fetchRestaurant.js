import {fetchRestaurant,fetchRestaurantReview} from "./action"
import data from "../restaurant.json"
import axios from "axios"

let request=[]

export default (place,lat,lng)=>{
    //if(place === true){
        return async dispatch=>{
        if(place === true){
            await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.REACT_APP_NOT_SECRET_CODE}`)
            .then((response) => {
                   request = response.data.results.map(element => {
                       return `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${element.place_id}&key=${process.env.REACT_APP_NOT_SECRET_CODE}`
                    });
                    let requests = request.map(url =>axios.get(url))
                    Promise.all(requests) // Does not move on until all requests have been completed
                    .then(reviews => reviews.map(review =>{
                        return review.data.result
                    }))
                    .then(final => dispatch(fetchRestaurantReview(final)))
                    dispatch(fetchRestaurant(response.data.results))
            })
        }
        else{
            dispatch(fetchRestaurant(data))
        }
}
}