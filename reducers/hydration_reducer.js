import {
    GET_HYDRATION,
} from '../actions/types'

export default function(state = [], action){
    switch (action.type) {
        case GET_HYDRATION:
            return action.payload;
        default:
            return state;
    }
};