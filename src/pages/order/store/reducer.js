const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({

	
	image:'',
	detail:'',

	current:0,
	pageSize:0,	    				
	total:0,
	list:[],
	order:'',
	status:"0",

	keyword:'',
	orderDetail:{},



	isSaveFetching:false,
	isListFetching:false,
	isPageFetching:false,
	addCategoryOneList:[],
	

})

export default (state=defaultState,action)=>{


 
if(action.type == types.SET_ORDER_LIST )	{
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,	    				
			total:action.payload.total,
			list:fromJS(action.payload.list),
			keyword:action.payload.keyword,
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


	if(action.type === types.SET_ORDER_DETAIL){
		return state.set('orderDetail',action.payload)
	}


	
	if(action.type ==  types.PRODUCT_EDIT_ACTION){
			return state.merge({
			parendCategoryId:action.payload.CategoryId.pid,
			CategoryId:action.payload.CategoryId._id,
			editName:action.payload.name,
			editDec:action.payload.dec,
			editPrice:action.payload.price,
			editStock:action.payload.stock,
			image:action.payload.image,
			detail:action.payload.detail,

		})
	}

	return state
}