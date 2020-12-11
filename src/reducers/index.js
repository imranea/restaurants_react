import {combineReducers} from "redux"
import note from "./noteReducer"
import restaurants from "./restaurantReducer"
import reviews from "./reviewReducer"

export default combineReducers({
    note,
    restaurants,
    reviews,
})