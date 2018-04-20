import { AsyncStorage } from 'react-native'

import {
    GET_OBJECTS
} from './types';

export const getObjects = () => async (dispatch) => {
    await AsyncStorage.getItem('exercises', (error, result) => {
        if (!error){
            dispatch({ type: GET_OBJECTS, payload: JSON.parse(result)})
        } else {
            dispatch({ type: GET_OBJECTS, payload: {}})
        }
    })
};