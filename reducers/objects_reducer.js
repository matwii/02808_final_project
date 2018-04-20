import {
    GET_OBJECTS
} from '../actions/types'

export default function(state = [], action){
    switch (action.type) {
        case GET_OBJECTS:
            return action.payload;
        default:
            return state;
    }
};