import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { userCount } from '../../../api/index.js';


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
        type :types.SET_PAGE,
        payload
    }
}
 export const getuserpage = (page)=>{
 	return (dispatch)=>{
        dispatch(getPageStart())
 		 Require({
            method:'get',       	
        	url:userCount,
            data:{
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
