import {actionTypes} from "../actions"

export default (state=0,action) =>{ 
    
    switch(action.type){
        case actionTypes.NOTE: // type: Note 
                return action.note // update our state note
        default:
            return state;
    }
}