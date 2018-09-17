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
// import ImageUpload from '../../common/ImageUpload/inedx.js';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends Component {
		constructor(props){
				super(props);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.state = {
					
					productId:this.props.match.params.productId
				}
			};
		  handleSubmit (e) {
		    e.preventDefault();
		    this.props.form.validateFields((err, values) => {

		      
		      	 values.id = this.state.productId;
		  
		      	
		      	this.props.handleSave(err,values);
		       
		    });
		  };


		  componentDidMount(){
		 		// this.props.handleOnecategory()

		 		if(this.state.productId){
		 			this.props.handleEdit(this.state.productId)
		 		}
		 	}

	render(){
		 const {
		 		editName,
		 		editDec,
		 		editPrice,
		 		editStock,
		 		parendCategoryId,
		 		CategoryId,
		 		image,
		 		detail,
		 	} = this.props;
	
		

		let  fileList = [];

		if(image){
			fileList = image.split(',').map((img,index)=>({
					 uid: index,
				     status: 'done',
				     url: img,
				     response:img
				    
			}))

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
	    							{
	    								this.state.productId ?

	    								"商品管理"
	    								:"商品添加"

	    							}
	    					</Breadcrumb.Item>
	    			</Breadcrumb>
				</div>
				 <Form style= {{ marginTop:20}}>
			        <FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入商品名称',
				            }],
				            	initialValue:editName
				          })(
				            <Input
				            	placeholder = "商品名称"
				             />
				          )}
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				           {getFieldDecorator('dec', {
					            rules: [ {
					              required: true, message: '请输入商品描述',
					            }],
					            initialValue:editDec
					          })(
				           
					            <Input
					            	placeholder = "商品描述"
					             />
				             )}
				         
			        </FormItem>
			         <FormItem
				          {...formItemLayout}

				          required= {true}
				          label="商品分类"
				          validateStatus={ this.props.CategoryvalidateError}

				          help={this.props.Categoryhelp}
				        >
				      		 
				           
						           <CategorySelect 

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
				       		 {getFieldDecorator('price', {
					            rules: [ {
					              required: true, message: '请输入商品价格',
					            }],
					            initialValue:editPrice
					          })(
				           
				         
				             <InputNumber
									    
									      min={0}
									      max={100}
									      formatter={value => `${value}元`}
									      parser={value => value.replace('元', '')}
									   
									    />
				        )}
				        
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('stock', {
					            rules: [ {
					              required: true, message: '请输入商品库存',
					            }],

					            initialValue:editStock
					          })(
				            <InputNumber
									     
									     
									      formatter={value => `${value}件`}
									      parser={value => value.replace('件', '')}
									   
									    />

									    )}
				         
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          
				          required= {true}
				          label="商品图片"
				          validateStatus={ this.props.imagesvalidateError}

 				          help={this.props.imageshelp}
				        >
				          <ImageUpload
				          		fileList={fileList}
				          		action = { productImage }
				          		maxImage = {3}
				          		getFileList = {
				          			(fileList)=>{
				          				this.props.handleImage(fileList)
				          			}
				          		}

				           />
				           
				         
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				           {getFieldDecorator('dec', {
					            rules: [ {
					              required: true, message: '请输入商品描述',
					            }],
					          })(
				           
					            <RichEditor
					            	detail = {detail}
					            	url = {productRichEditor}

					            	getRichValue= {
					            		(value)=>{
					            			 this.props.handleDetail(value)
					            		}


					            	}

					             />
				             )}
				         
			        </FormItem>
			         
			         <FormItem {...tailFormItemLayout}>
			          <Button type="primary"
				          onClick = {this.handleSubmit}
	          			  loading = {this.props.isSaveFetching}
				          >
				          	提交
			          </Button>
			        </FormItem>
		        </Form>
		        
		      </MyLayout>
		)
	}
}
const CategoryAdd = Form.create()(RegistrationForm);

const mapStateToProps = (state)=>{

	return {
			CategoryvalidateError:state.get('product').get('CategoryvalidateError'),
			Categoryhelp:state.get('product').get('Categoryhelp'),
			editName:state.get('product').get('editName'),
			imagesvalidateError:state.get('product').get('imagesvalidateError'),
			imageshelp:state.get('product').get('imageshelp'),
			editName:state.get('product').get('editName'),
			editDec:state.get('product').get('editDec'),
			editPrice:state.get('product').get('editPrice'),
			editStock:state.get('product').get('editStock'),
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
		handleEdit:(productId)=>{
			dispatch(actionCreator.handleEditProduct(productId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);