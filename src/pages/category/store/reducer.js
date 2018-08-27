const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({
	isAddFetching:false
})

export default (state=defaultState,action)=>{

	if(action.type ===  types.ADD_DONE){
		return state.set('isFetching',false)
	}
	if(action.type ===  types.ADD_START){
		return state.set('isFetching',true)
	}
	return state
}