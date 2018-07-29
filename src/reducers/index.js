import {combineReducers} from 'redux';
import {authenticate, getTrack} from './reducers';

export default combineReducers({
    authenticate: authenticate,
    getTrack: getTrack
})