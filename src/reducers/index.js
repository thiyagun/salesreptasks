import {combineReducers} from 'redux';
//import UserReducer from './reducer-users';
import { reducer as formReducer } from 'redux-form';
//import ActiveUserReducer from './reducer-active-user';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    form: formReducer,
    // users: UserReducer,
    // activeUser: ActiveUserReducer
});

export default allReducers