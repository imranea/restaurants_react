import {fetchRestaurant} from "./action"
import data from "../restaurant.json"

export default ()=>{
    return dispatch=>{
        dispatch(fetchRestaurant(data))
    }
}