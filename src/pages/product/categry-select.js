import React,{ Component,applyMiddleware } from 'react';


import { Select } from 'antd';

import { Require } from '../../util/index.js';

import { categoryOnelist,categoryCount } from '../../api/index.js';

const Option = Select.Option;


class CategorySelect extends Component {
  
  constructor (props){
    super(props)
    this.state={
      categoryOneSelectId:'',
      categoryOneSelect:[],

      categoryTowSelectId:'',
      categoryTowSelect:[],
      needLoadTowCategory:false,
      isChange:false
    }
  this.handleOneSelectChange = this.handleOneSelectChange.bind(this);
  this.handleTowSelectChange = this.handleTowSelectChange.bind(this);
  }


  static getDerivedStateFromProps(props,state){

      const levelOneCategoryIdChanged = props.parendCategoryId != state.categoryOneSelectId;

      const levelTowCategoryIdChanged = props.CategoryId != state.categoryTowSelectId;

      //  如果没有改变，则不更新stase上的值
      if(!levelOneCategoryIdChanged && !levelTowCategoryIdChanged){
        return null ;
      }

      if(state.isChange){
        return null;
      }
      if(props.parendCategoryId == 0){
         return {
            categoryOneSelectId:props.CategoryId,
            categoryTowSelectId:'',
            isChange:true
         }
      }else{
        return{
            categoryOneSelectId:props.parendCategoryId,
            categoryTowSelectId:props.CategoryId,
            needLoadTowCategory:true,
            isChange:true
        }
      }


    return null;   
  }

  componentDidUpdate(){
    if(this.state.needLoadTowCategory){
        this.loadTowCategory();
        this.setState({
           needLoadTowCategory:false
        })
      }

  }
  componentDidMount(){
    this.loadOneCategory();
      
  }
  loadOneCategory(){
     Require({
            method: 'get',
            url:categoryOnelist,
            data:{
                pid:0
             }
        })
      .then(result=>{
        if(result.code == 0 ){
       
          
          this.setState({
            categoryOneSelect:result.data,
          })
      
          
        }
      })
  }
  handleOneSelectChange(value){

    this.setState({
           categoryTowSelectId:'',
            categoryOneSelectId:value,
             categoryTowSelect:[]

          },()=>{
            console.log(this.state.categoryOneSelectId)
              this.loadTowCategory();
              this.onValueChange()
          })
  }
  handleTowSelectChange(value){
    this.setState({
      categoryTowSelectId:value
    },()=>{

      this.onValueChange()
    })
  }
   loadTowCategory(){
    console.log("1111")
       Require({
        method:'get',
        url:categoryOnelist,
        data:{
          pid:this.state.categoryOneSelectId
        }
        
      })
      .then(result=>{
       
        if(result.code == 0 ){

          this.setState({
            categoryTowSelect:result.data
          })          
        }
      })
  }

 
  
 onValueChange(){
   const {categoryOneSelectId, categoryTowSelectId, }= this.state;
   if(categoryTowSelectId){
      this.props.getCategoryId(categoryOneSelectId,categoryTowSelectId)
    }else{
      this.props.getCategoryId(0,categoryOneSelectId)
    }
 }

  render() {
    const {categoryOneSelectId, categoryOneSelect, categoryTowSelectId,categoryTowSelect }= this.state;
    const levelOneOptions = categoryOneSelect.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
    const levelTowOptions = categoryTowSelect.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
    return (
      <div>
        <Select 
            defaultValue={categoryOneSelectId}
            value={categoryOneSelectId}
            style={{ width: 300 }} 
            onChange={this.handleOneSelectChange}>
            {levelOneOptions}
        </Select>
        {

          levelTowOptions.length?
           (<Select 
            defaultValue={categoryTowSelectId}
            value={categoryTowSelectId}
            style={{ width: 300 }} 
            onChange={this.handleTowSelectChange}>
            {levelTowOptions}
        </Select>):''
        }
       
      </div>
    );
  }
}

export default CategorySelect;