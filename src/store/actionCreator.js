

import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM,SET_DATA_INIT } from './actionTypes.js';
import axios from 'axios';


export const change_value = (payload)=>{

	return {
			type:CHANGE_VALUE,
			payload
		}
};


 export const add_item = ()=>{
 	return ({type:ADD_ITEM})
 };

 export const delete_item  = (payload)=>{
 	return ({
 		type:DELETE_ITEM,
 	 	payload
 	 })
 };

 export const set_data_init =(payload)=>{
 	return {

 		type:SET_DATA_INIT,
 		payload
 	}
 };
 export const set_init = ()=>{
 	return (dispatch)=>{
 		axios
		.get('http://127.0.0.1:3000/api/getData')
		.then((data)=>{
			const action =  set_data_init(data.data);
			dispatch(action);
			
		})
		.catch((e)=>{
			console.log(e);
		})
 	}
 }