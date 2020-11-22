import {NOTE,FETCH_RESTAURANT,FETCH_RESTAURANT_REVIEW} from "./action" // TYPE

const reducer = (state,action) =>{ 
    switch(action.type){
        case NOTE: // type: Note 
            return{
                ...state, // get all state
                note: action.note // update our state note
            }
        case FETCH_RESTAURANT: // type: FETCH_RESTAURANT
            return{
                ...state,
                restaurants: action.restaurants // update our state restaurant
            }
        case FETCH_RESTAURANT_REVIEW: // type: FETCH_RESTAURANT_REVIEW
            return{
                ...state,
                reviews:action.reviews // update our state review
            }
        default:
            return state;
    }
}

export default reducer;