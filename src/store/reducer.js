import {NOTE,FETCH_RESTAURANT,FETCH_RESTAURANT_REVIEW} from "./action"

const reducer = (state,action) =>{
    switch(action.type){
        case NOTE:
            return{
                ...state,
                note: action.note
            }
        case FETCH_RESTAURANT:
            return{
                ...state,
                restaurants: action.restaurants
            }
        case FETCH_RESTAURANT_REVIEW:
            return{
                ...state,
                reviews:action.reviews
            }
        default:
            return state;
    }
}

export default reducer;