import {actionTypes} from "../actions"

export default (state=[],action) =>{ 

    switch(action.type){
        case actionTypes.FETCH_RESTAURANT: // type: Note 
                return action.restaurants // update our state note
        default:
            return state;
    }
}