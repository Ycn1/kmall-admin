const { fromJS } = require('immutable');

import * as types from './actionTypes.js';

const resource = fromJS({
	list:['aaa','bbb'],
	value:'hello'
})

export default (state=resource,action)=>{

	if(action.type  == types.CHANGE_VALUE ){
			/*const newState =  JSON.parse(JSON.stringify(state));

			newState.value = action.payload;

			return newState;*/
			return state.set('value',action.payload)
	}

	if(action.type == types.ADD_ITEM ){

		/*const newState = JSON.parse(JSON.stringify(state));

		newState.list.push(state.value);
		newState.value = '';

		return newState;*/

		const newList = [...state.get('list'),state.get('value')];

		return state.merge ({
			value :'',
			list:newList
		})

	}
	if(action.type == types.SET_DATA_INIT ){

		/*const newState =  JSON.parse(JSON.stringify(state));

			newState.list = action.payload;

			return newState;*/
			/*const newList = [...state.get('list'),state.get('value')];

					return state.merge ({
						value :'',
						list:newList
					})*/
					return state.set('list',action.payload)
	}

	if(action.type == types.DELETE_ITEM){
		/*const newState = JSON.parse(JSON.stringify(state));

		newState.list.splice(action.payload,1);

		return newState;*/

		const newList = [...state.get('list'),state.get('value')];
		newList.splice(action.payload,1)

		return state.merge ({
			value :'',
			list:newList
		})
	}
	return  state;
}