import {NOTE,FETCH_RESTAURANT} from "./action"

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
        default:
            return state;
    }
}

export default reducer;