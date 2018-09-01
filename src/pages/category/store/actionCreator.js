import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { categoryCount,categoryOnelist,categoryList,categoryUpdate,categoryUpdateOrder } from '../../../api/index.js';

const getAddStart = ()=>{
	return {
		type :types.ADD_START
	}
}

const getAddDone = ()=>{
	return {
		type :types.ADD_DONE
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

const updateModelnewName = (payload)=>{
    return {
        type :types.UPDATE_MODEL_NAME,
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

        	   //如果是一級分类就显示到页面上
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
          
        })
        .catch((err)=>{
            console.log(err);
            alert(err);
            message.error('网络错误，请稍后重试');
        
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
            message.error('网络错误，请稍后重试');
               
            }
             dispatch(getPageDone())
        })
        .catch((err)=>{
            message.error('网络错误，请稍后重试');
            dispatch(getPageDone())
            
        })
      } 
    }
    export const getUpdateModelAction = (updateId,updateName)=>{
         console.log(updateName,updateId)
        return{

            type:types.SHOW_UPDATE_MODAL,
            payload:{
                updateId,
                updateName
             }
       
            } 
    }

    export const updateCancel = ()=>{
        return{

            type:types.SHOW_UPDATE_CANCEL,
           
       
            } 
    }

    export const updateModelName = (pid)=>{

       

           return (dispatch,getState)=>{
                const state = getState().get('category');
                 Require({
                    method: 'put',
                    url:categoryUpdate,
                    data:{
                        id:state.get('updateId'),
                        name:state.get('updateName'),
                        pid:pid,
                        page:state.get('current'),
                    }
                })
                 .then((result)=>{
                    
                    
                    if(result.code == 0){
                        
                        
                        dispatch(updateModelnewName(result.data))
                        dispatch(updateCancel())
                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }

    }

export const handleModelChangeName=(payload)=>{

      return{

                 type:types.SHOW_UPDATE_NEWNAME,
                 payload

            }   
}

export const  handleOrderValue = (pid,id,newOrder)=>{

 return (dispatch,getState)=>{
                const state = getState().get('category');
                 Require({
                    method: 'put',
                    url:categoryUpdateOrder,
                    data:{
                        id:id,
                        order:newOrder,
                        pid:pid,
                        page:state.get('current'),
                    }
                })
                 .then((result)=>{
                   

                    if(result.code == 0){

                        dispatch(setPage(result.data))
                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }


}