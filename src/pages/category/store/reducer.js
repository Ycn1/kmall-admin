const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({
	isAddFetching:false,
	isListFetching:false,
	isPageFetching:false,
	addCategoryOneList:[],
	current:0,
	pageSize:0,	    				
	total:0,
	list:[],
	updateModelVisible:false,
	updateName:'',
	updateId:''
})

export default (state=defaultState,action)=>{

	if(action.type ===  types.ADD_START){
		return state.set('isAddFetching',true)
	}

	if(action.type ===  types.ADD_DONE){
		return state.set('isAddFetching',false)
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
	if(action.type ==  types.SHOW_UPDATE_MODAL){
		return state.merge({
			updateModelVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName
		})
	}
	if(action.type === types.PAGR_START){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type === types.SHOW_UPDATE_CANCEL){
		return state.set('updateModelVisible',false)
	}
	if(action.type ==  types.UPDATE_MODEL_NAME){
			return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,	    				
			total:action.payload.total,
			list:fromJS(action.payload.list)
		})
	}
	if(action.type == types.SHOW_UPDATE_NEWNAME){
		return state.set('updateName',action.payload)
	}
	return state
}