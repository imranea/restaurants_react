import {CLICK,FETCH_RESTAURANT} from "./action"

const reducer = (state,action) =>{
    switch(action.type){
        case CLICK:
            return{
                ...state,
                click:state.click+1
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