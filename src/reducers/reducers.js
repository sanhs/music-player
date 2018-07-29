import { AUTH, FETCH_TRACK, FETCH_PLAYLIST } from '../actions/types';

export const initialState = {};

export const authenticate = (state=initialState, action) => {
    if (action.type === AUTH) return Object.assign({}, state);
    else return state;
}

export const getTrack = (state=initialState, action) => {
    switch(action.type){
        case FETCH_TRACK:
            return Object.assign({}, state);
        default:
            return state;
    }
}