
import { combineReducers } from 'redux-immutable';


import { reducer as loginReducer } from '../pages/login/store/index.js';


export default combineReducers ({
	

	login:loginReducer

})