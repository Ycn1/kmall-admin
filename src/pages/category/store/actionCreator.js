import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { categoryCount } from '../../../api/index.js';

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
        		/*console.log(result)

        		setUserName (result.data.username)

        		window.location.href = '/'*/
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
