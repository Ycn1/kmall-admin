import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { 
    categoryCount,
    ORDERALL,
    Set_order_detail,
    productUpdateOrder,
    productUpdateStatus,
    add_product,
   DELIVER_GOODS,
    SEARCH_ORDER 
} from '../../../api/index.js';


const getSaveDone = ()=>{
    return {
        type :types.SAVE_DONE
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


const setOrderPage = (payload)=>{
    return {
        type :types.SET_ORDER_LIST,
        payload
    }
}



export const setOrderDetail =(values)=>({
     type:types.SET_ORDER_DETAIL,
     payload:values


})


//获取全部订单
export const getProductListpage = (page)=>{
    return (dispatch)=>{
        dispatch(getPageStart())
         Require({
            method:'get',           
            url:ORDERALL,
            data:{
                page:page
            }
        })
        .then((result)=>{
          

            if(result.code == 0){
                dispatch(setOrderPage(result.data))
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



//获取管理员详情页
export const handleDetailAction=(orderNo)=>{

    return (dispatch)=>{
            
                 Require({
                    method: 'get',
                    url:Set_order_detail,
                    data:{
                        orderNo:orderNo,
                      
                    }
                })
                 .then((result)=>{
                  console.log("00111",result)
                   
                       dispatch(setOrderDetail(result.data))
                  
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }

}
export const handleSearchOrderNo=(keyword,page=1)=>{

    return (dispatch,getState)=>{
              
                 Require({
                    method: 'get',
                    url:SEARCH_ORDER,
                    data:{
                        keyword,
                        page
                      
                    }
                })
                 .then((result)=>{

                    if(result.code == 0){
                        console.log("search")
                        dispatch(setOrderPage(result.data))
                       
                    }
                    else if(result.code == 1){
                    message.error('网络错误，请稍后重试');
                       
                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }

}
//发货按钮处理

export const handleDeliverAction=(orderNo)=>{

    return (dispatch,getState)=>{
              
                 Require({
                    method: 'put',
                    url:DELIVER_GOODS,
                    data:orderNo                 
                    
                })
                 .then((result)=>{

                    if(result.code == 0){
                        dispatch(setOrderPage(result.data))
                       
                    }
                    else if(result.code == 1){
                    message.error('网络错误，请稍后重试');
                       
                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }

}

/* export const getCateAction = (values)=>{
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
 	}*/
export const getCateOne=()=>{
    return (dispatch)=>{
    

         Require({
            method: 'get',
            url:Product_List,
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

 export const getCateListpage = (parendCategoryId,CategoryId)=>{
    return (dispatch)=>{
        dispatch(getPageStart())
         Require({
            method:'get',           
            url:CategoryId,
            data:{
                pid:id,
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

  



