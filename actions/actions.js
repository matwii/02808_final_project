import { AsyncStorage } from 'react-native'

import {
    GET_OBJECTS,
    GET_HYDRATION
} from './types';

export const getObjects = () => async (dispatch) => {
    await AsyncStorage.getItem('exercises', (error, result) => {
        if (!error){
            console.log(JSON.parse(result));
            dispatch({ type: GET_OBJECTS, payload: JSON.parse(result)})
        } else {
            dispatch({ type: GET_OBJECTS, payload: {}})
        }
    })
};

export const getHydration = () => async (dispatch) => {
    await AsyncStorage.getItem('hydration', (error, result) => {
        if (!error){
            console.log(result);
            dispatch({ type: GET_HYDRATION, payload: JSON.parse(result)})
        } else {
            console.log('error getting hydration')
            dispatch({ type: GET_HYDRATION, payload: {}})
        }
    })
};