const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({
	isAddFetching:false,
	isListFetching:false,
	addCategoryOneList:[],
	current:0,
	pageSize:0,	    				
	total:0,
	list:[]
})

export default (state=defaultState,action)=>{

	if(action.type ===  types.ADD_DONE){
		return state.s6et('isFetching',false)
	}
	if(action.type ===  types.ADD_START){
		return state.set('isFetching',true)
	}

	if(action.type ===  types.CATEGORY_ONE_LIST){
		return state.set('addCategoryOneList',fromJS(action.payload))
	}

	if(action.type == types.CATEGORY_LIST )	{
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,	    				
			total:action.payload.total,
			list:fromJS(action.payload.list)
		})
	}
	return state
}