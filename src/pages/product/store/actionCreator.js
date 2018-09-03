import  * as types from './actionTypes.js';

import { message } from 'antd';

import { Require,setUserName } from '../../../util/index.js';

import { 
    categoryCount,
    Product_List,
    categoryList,
    productUpdateOrder,
    productUpdateStatus,
    add_product,
    productEdit,
    SEARCH_PRODUCT 
} from '../../../api/index.js';


const getSaveDone = ()=>{
    return {
        type :types.SAVE_DONE
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

export const  getCateAction = (parendCategoryId,CategoryId) =>({
        type :types.GET_CATE,
        payload:{
            parendCategoryId:parendCategoryId,
            CategoryId:CategoryId
        }


})


export const getImageAction =(fileList)=>({

        type:types.ADD_IMAGE,
        payload:fileList
})


export const getDetailAction =(values)=>({
     type:types.ADD_DETAIL,
     payload:values


})

const setCategoryError = ()=>({
    type:types.SET_CATEGORT_ERROR,


})

const setProductPage = (payload)=>{
    return {
        type :types.SET_Product_LIST,
        payload
    }
}

const productEditAction = (payload)=>{

     return {
        type :types.PRODUCT_EDIT_ACTION,
        payload
    }


}


export const getSaveAction=(err,values)=>{

     return (dispatch,getState)=>{
                const state = getState().get('product');
                const CategoryId = state.get('CategoryId');
                if(!CategoryId){
                    dispatch(setCategoryError())
                    return;
                }
                if(err){
                    return;
                }

                let method = 'post';

                if(values.id){
                    method='put';

                }


                dispatch(getSaveStart())
               
                 Require({
                    method: method,
                    url:add_product,   
                    data:{ 
                        ...values, 
                        CategoryId:CategoryId,
                        image:state.get('image'),
                       
                        detail:state.get('detail'),
                        }
                    
                })
                 .then((result)=>{
                    window.location.href = '/product';
                    dispatch(getSaveDone())
                 })
                 .catch(e=>{
                    console.log(e)
                    dispatch(getSaveDone())

                    
                 })

           }

}
export const getProductListpage = (page)=>{
    return (dispatch)=>{
        console.log(page,Product_List)
        dispatch(getPageStart())
         Require({
            method:'get',           
            url:Product_List,
            data:{
                page:page
            }
        })
        .then((result)=>{
          

            if(result.code == 0){
                dispatch(setProductPage(result.data))
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

const getSaveStart = ()=>{
	return {
		type :types.SAVE_START
	}
}



export const  handleOrderValue = (id,newOrder)=>{

 return (dispatch,getState)=>{
                const state = getState().get('product');
                 Require({
                    method: 'put',
                    url:productUpdateOrder,
                    data:{
                        id:id,
                        order:newOrder,
                        page:state.get('current'),
                    }
                })
                 .then((result)=>{
                   

                    if(result.code == 0){

                        dispatch(setProductPage(result.data))
                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }


}
export const  getUpdateStatusAction = (id,newStatus)=>{

 return (dispatch,getState)=>{
                const state = getState().get('product');
                 Require({
                    method: 'put',
                    url:productUpdateStatus,
                    data:{
                        id:id,
                        status:newStatus,
                        page:state.get('current'),
                    }
                })
                 .then((result)=>{
                   

                    if(result.code == 0){
                        message.success(result.message)
                    }else{
                        message.error(result.message)
                        dispatch(setProductPage(result.data))

                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }


}

export const handleEditProduct=(productId)=>{

    return (dispatch,getState)=>{
                const state = getState().get('product');
                 Require({
                    method: 'get',
                    url:productEdit,
                    data:{
                        id:productId,
                      
                    }
                })
                 .then((result)=>{
                  

                    if(result.code == 0){
                       dispatch(productEditAction(result.data))
                    }else{
                        message.error(result.message)
                        dispatch(setProductPage(result.data))

                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }

}

export const handleDetailProduct=(productId)=>{

    return (dispatch,getState)=>{
                const state = getState().get('product');
                 Require({
                    method: 'get',
                    url:productEdit,
                    data:{
                        id:productId,
                      
                    }
                })
                 .then((result)=>{
                  

                    if(result.code == 0){
                       dispatch(productEditAction(result.data))
                    }else{
                        message.error(result.message)
                        dispatch(setProductPage(result.data))

                    }
                 })
                 .catch(e=>{
                    console.log(e)
                 })

           }

}
export const handleSearchName=(keyword,page=1)=>{

    return (dispatch,getState)=>{
              
                 Require({
                    method: 'get',
                    url:SEARCH_PRODUCT,
                    data:{
                        keyword,
                        page
                      
                    }
                })
                 .then((result)=>{

                    if(result.code == 0){
                        console.log("search")
                        dispatch(setProductPage(result.data))
                       
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

  



