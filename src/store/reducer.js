<<<<<<< HEAD
import {NOTE,FETCH_RESTAURANT} from "./action"
=======
import {CLICK,FETCH_RESTAURANT} from "./action"
>>>>>>> 952d128b3071914d927953750810ae6a48197add

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