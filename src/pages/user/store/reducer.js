const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({
	current:1,
	pageSize:10,	    				
	total:100,
	
	isFetching:false,
	list:[]
})

export default (state=defaultState,action)=>{
	if(action.type ===  types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,	    				
			total:action.payload.total,
			list:fromJS(action.payload.list)
		})
	}
	if(action.type ===  types.PAGR_START){
		return state.set('isFetching',false)
	}
	if(action.type ===  types.PAGE_DONE){
		return state.set('isFetching',false)
	}
	return state;
}