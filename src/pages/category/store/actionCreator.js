import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { categoryCount,categoryOnelist,categoryList } from '../../../api/index.js';

const getAddStart = ()=>{
	return {
		type :types.Add_START
	}
}

const getAddDone = ()=>{
	return {
		type :types.Add_DONE
	}
}
const getCategoryList = (payload)=>{
    return {
        type :types.CATEGORY_ONE_LIST,
        payload
    }
}
const getPageStart = ()=>{
    return {
        type :types.PAGR_START,
        
    }
}


const getPageDone = ()=>{
    return {
        type :types.PAGE_DONE,
        
    }
}

const setPage = (payload)=>{
    return {
        type :types.CATEGORY_LIST,
        payload
    }
}
 export const getCateAction = (values)=>{
 	return (dispatch)=>{
 		dispatch(getAddStart())

 		 Require({
        	method: 'post',
        	url:categoryCount,
        	data:values
        })
        .then((result)=>{

        	if(result.code == 0){

        		console.log(".....",result)
                if(result.data){
                    dispatch(getCategoryList(result.data))
                }

                message.success(result.message)
        		
        	}
        	else if(result.code == 1){
        		message.error(result.message)
        		
        	}
        	dispatch(getAddDone())
        })
        .catch((err)=>{
            console.log(err);
            alert(err);
        	message.error('网络错误，请稍后重试');
        	dispatch(getAddDone())
        })
      }	
 	}
export const getCateOne=()=>{
    return (dispatch)=>{
        dispatch(getAddStart())

         Require({
            method: 'get',
            url:categoryOnelist,
            data:{
                pid:0
            }
        })
        .then((result)=>{

            if(result.code == 0){
                console.log(result)
                dispatch(getCategoryList(result.data))
               
            }
            else if(result.code == 10){
                message.error(result.message)
                
            }
            dispatch(getAddDone())
        })
        .catch((err)=>{
            console.log(err);
            alert(err);
            message.error('网络错误，请稍后重试');
            dispatch(getAddDone())
        })
      } 
}

 export const getCateListpage = (pid,page)=>{
    return (dispatch)=>{
        dispatch(getPageStart())
         Require({
            method:'get',           
            url:categoryOnelist,
            data:{
                pid:pid,
                page:page
            }
        })
        .then((result)=>{

            if(result.code == 0){
                dispatch(setPage(result.data))
            }
            else if(result.code == 1){
                dispatch(getPageDone())
            }
        
        })
        .catch((err)=>{
            message.error('网络错误，请稍后重试');
            dispatch(getPageDone())
            
        })
      } 
    }
    export const getShowModelAction=()=>{
        return (dispatch)=>{
        dispatch(getPageStart())
         Require({
            method:'get',           
            url:categoryOnelist,
            data:{
                pid:pid,
                page:page
            }
        })
        .then((result)=>{

            if(result.code == 0){
                dispatch(setPage(result.data))
            }
            else if(result.code == 1){
                dispatch(getPageDone())
            }
        
        })
        .catch((err)=>{
            message.error('网络错误，请稍后重试');
            dispatch(getPageDone())
            
        })
      } 
    }