import {CLICK} from "./action"

const reducer = (state,action) =>{
    switch(action.type){
        case CLICK:
            return{
                ...state,
                click:state.click+1
            }
        default:
            return state;
    }
}

export default reducer;