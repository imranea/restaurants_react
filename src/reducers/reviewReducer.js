import {actionTypes} from "../actions"

export default (state=[],action) =>{ 
    switch(action.type){
        case actionTypes.FETCH_RESTAURANT_REVIEW: // type: Note 
                return action.reviews // update our state note
        default:
            return state;
    }
}