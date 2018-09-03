import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { loginUrl } from '../../../api/index.js';

const getLoginStart = ()=>{
	return {
		type :types.LOGIN_START
	}
}

const getLoginDone = ()=>{
	return {
		type :types.LOGIN_DONE
	}
}

 export const getLoginAction = (values)=>{
 	return (dispatch)=>{
 		dispatch(getLoginStart())

 		 Require({
        	method: 'post',
        	url:loginUrl,
        	data:values
        })
        .then((result)=>{

        	if(result.code == 0){
        		console.log(result)

        		setUserName (result.data.username)

        		window.location.href = '/'
        	}
        	else if(result.code == 10){
        		message.error(result.message)
        		
        	}
        	dispatch(getLoginDone())
        })
        .catch((err)=>{
            console.log(err);
            alert(err);
        	message.error('网络错误，请稍后重试');
        	dispatch(getLoginDone())
        })
      }	
 	}
