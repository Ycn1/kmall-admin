import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { homeCount } from '../../../api/index.js';



const getHomeCount = (payload)=>{
	return {
		type :types.HOME_COUNT,
        payload
	}
}

 export const getCount = (values)=>{
 	return (dispatch)=>{
 		 Require({       	
        	url:homeCount,
        })
        .then((result)=>{

        	if(result.code == 0){
        		dispatch(getHomeCount(result.data))
        	}
        	else if(result.code == 1){
        		
        	}
        
        })
        .catch((err)=>{
        	message.error('网络错误，请稍后重试');
        	
        })
      }	
 	}
