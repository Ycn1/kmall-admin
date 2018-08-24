const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({
	isFetching:false
})

export default (state=defaultState,action)=>{

	if(action.type ===  types.LOGIN_DONE){
		return state.set('isFetching',false)
	}
	if(action.type ===  types.LOGIN_START){
		return state.set('isFetching',true)
	}
	return state
}