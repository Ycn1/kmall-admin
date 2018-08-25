const { fromJS } = require('immutable');

import  * as types  from './actionTypes.js';

const defaultState = fromJS({
	usernumber:666,
	ordernumber:888,
	productnumber:999
})

export default (state=defaultState,action)=>{

	if(action.type == types.HOME_COUNT){
		return state.merge( {
			usernumber:action.payload.usernumber,
			ordernumber:action.payload.ordernumber,
			productnumber:action.payload.productnumber
		})
	}
	return state;
}