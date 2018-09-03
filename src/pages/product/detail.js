import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect, } from 'react-router-dom';

import {  InputNumber,Select,Form, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete,Breadcrumb} from 'antd';

import MyLayout from '../../common/layout/index.js';

import { connect } from 'react-redux';
import { actionCreator } from './store/index.js';

import CategorySelect from './categry-select.js';
import ImageUpload from '../../common/ImageUpload/index.js';

import { productImage,productRichEditor } from '../../api/index.js';

import RichEditor from '../../common/richeditor/index.js';

import './detail.css';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends Component {
		constructor(props){
				super(props);

				this.state = {
					
					productId:this.props.match.params.productId
				}
			};
		  handleSubmit (e) {
		    e.preventDefault();
		    this.props.form.validateFields((err, values) => {

		      
		      	 values.id = this.state.productId;
		  

		       
		    });
		  };
		  componentDidMount(){
		 		// this.props.handleOnecategory()

		 		if(this.state.productId){
		 			this.props.handleProductDetail(this.state.productId)
		 		}
		 	}

	render(){
		 const {
		 		name,
		 		dec,
		 		price,
		 		stock,
		 		parendCategoryId,
		 		CategoryId,
		 		image,
		 		detail,
		 	} = this.props;
	
		

		let  detailimage ="";

		if(image){
			detailimage = image.split(',').map((img,index)=>(
					<li key = {index}>
						<img src={img} />

					</li>
				    
			))

		}


		const { getFieldDecorator } = this.props.form;
   		 // const { autoCompleteResult } = this.state;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 4 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 20 },
	      },
	    };
	     const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };
	    const Option = Select.Option;

		function handleChange(value) {
		  console.log(value);
		};
			

		return(
			<MyLayout>
				<div className="list">
					<Breadcrumb>
	    					<Breadcrumb.Item>商品页面</Breadcrumb.Item>
	    					<Breadcrumb.Item>
	    							商品详情
	    					</Breadcrumb.Item>
	    			</Breadcrumb>
				</div>
				 <Form style= {{ marginTop:20}}>
			        <FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >

				            <Input
				            	disabled={true}
				            	value ={name}
				             />
				        
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >				          
				            <Input
				            	disabled={true}
				            	value ={dec}
				             />
				         
			        </FormItem>
			         <FormItem
				          {...formItemLayout}

				          required= {true}
				          label="商品分类"
				          validateStatus={ this.props.CategoryvalidateError}

				          help={this.props.Categoryhelp}
				        >

				           <CategorySelect 
				          
				           			disabled={true}
				           			parendCategoryId= {parendCategoryId}
				           			CategoryId = {CategoryId}
										    getCategoryId={(parendCategoryId,CategoryId)=>{
						        			this.props.getCate(parendCategoryId,CategoryId)
						        		}}
						     />

			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				             <InputNumber
									    
							      min={0}
							      max={100}
							      disabled={true}
				            	  value ={price}
									   
							 />
				
				        
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				         
				            <InputNumber
								disabled={true}
								value = {stock}									
									   
							  />

				         
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >

				        <ul className="detaimimage">

				        	{detailimage}


				        </ul>
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				            <div dangerouslySetInnerHTML={{__html: detail}} ></div>
				            
			        </FormItem>
		        </Form>
		        
		      </MyLayout>
		)
	}
}
const ProductDetail = Form.create()(RegistrationForm);

const mapStateToProps = (state)=>{

	return {
			CategoryvalidateError:state.get('product').get('CategoryvalidateError'),
			Categoryhelp:state.get('product').get('Categoryhelp'),
			name:state.get('product').get('editName'),
			dec:state.get('product').get('editDec'),
			price:state.get('product').get('editPrice'),
			stock:state.get('product').get('editStock'),
			parendCategoryId:state.get('product').get('parendCategoryId'),
			CategoryId:state.get('product').get('CategoryId'),
			image:state.get('product').get('image'),
			detail:state.get('product').get('detail'),

		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleSave:(err,values)=>{

			const action = actionCreator.getSaveAction(err,values);
		

			dispatch(action)

		},
		getCate:(parendCategoryId,CategoryId)=>{
				const action = actionCreator.getCateAction(parendCategoryId,CategoryId);

				dispatch(action)
		},
		handleImage:(fileList)=>{
				const action = actionCreator.getImageAction(fileList);

				dispatch(action)
		},
		handleDetail:(value)=>{

				const action = actionCreator.getDetailAction(value);

				dispatch(action)
		},
		handleOnecategory:()=>{
			dispatch(actionCreator.getCateOne())
		},
		handleProductDetail:(productId)=>{
			dispatch(actionCreator.handleDetailProduct(productId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);