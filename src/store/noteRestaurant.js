import {noteRestaurant} from "./action"

export default (note)=>{
        return dispatch=>{
            dispatch(noteRestaurant(note))
    }
}