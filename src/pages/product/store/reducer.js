const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({

	CategoryId:'',
	parendCategoryId:'',
	image:'',
	detail:'',
	CategoryvalidateError:'',
	Categoryhelp:'',
	stock:'',
	current:0,
	pageSize:0,	    				
	total:0,
	list:[],
	order:'',
	status:"0",
	editName:'',
	editDec:'',
	editPrice:'',
	editStock:'',



	isSaveFetching:false,
	isListFetching:false,
	isPageFetching:false,
	addCategoryOneList:[],
	
	updateModelVisible:false,
	updateName:'',
	updateId:''
})

export default (state=defaultState,action)=>{


	if(action.type === types.GET_CATE){
		return state.merge({
			parendCategoryId:action.payload.parendCategoryId,
			CategoryId:action.payload.CategoryId,
			CategoryvalidateError:"",
			Categoryhelp:""
		})
	}

	if(action.type === types.ADD_IMAGE){
		return state.set('image',action.payload)
	}

	if(action.type === types.ADD_DETAIL){
		return state.set('detail',action.payload)
	}

	if(action.type ===  types.SAVE_START){
		return state.set('isSaveFetching',true)
	}

	if(action.type ===  types.SAVE_DONE){
		return state.set('isSaveFetching',false)
	}
 	if(action.type=== types.SET_CATEGORT_ERROR){
 		return state.merge({
			CategoryvalidateError:"error",
			Categoryhelp:"请选择所属分类"

		})

 	}
if(action.type == types.SET_Product_LIST )	{
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,	    				
			total:action.payload.total,
			list:fromJS(action.payload.list)
		})
	}


	if(action.type ===  types.CATEGORY_ONE_LIST){
		return state.set('addCategoryOneList',fromJS(action.payload))
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
	if(action.type ==  types.PRODUCT_EDIT_ACTION){
			return state.merge({
			parendCategoryId:action.payload.CategoryId.pid,
			CategoryId:action.payload.CategoryId._id,
			editName:action.payload.name,
			editDec:action.payload.dec,
			editPrice:action.payload.price,
			editStock:action.payload.stock,

		})
	}

	return state
}