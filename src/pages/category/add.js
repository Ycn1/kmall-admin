import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect, } from 'react-router-dom';

import {  Select,Form, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete,Breadcrumb} from 'antd';

import MyLayout from '../../common/layout/index.js';

import { connect } from 'react-redux';
import { actionCreator } from './store/index.js';



const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends Component {
		constructor(props){
				super(props);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.state = {
					isAddFetching:false
				}
			};
		  handleSubmit (e) {
		    e.preventDefault();
		    this.props.form.validateFields((err, values) => {
		      if (!err) {
		      	this.props.handleSubmit(values)
		       }
		    });
		  }
	render(){
		 const { getFieldDecorator } = this.props.form;
   		 // const { autoCompleteResult } = this.state;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
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
	    					<Breadcrumb.Item>分类页面</Breadcrumb.Item>
	    					<Breadcrumb.Item>分类管理</Breadcrumb.Item>
	    			</Breadcrumb>
				</div>
				 <Form >
			        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input />
				          )}
			        </FormItem>
			         <FormItem
				          {...formItemLayout}
				          label="分类级别"
				        >
				      		  {getFieldDecorator('pid', {
					            rules: [ {
					              required: true, message: '请选择分类名称',
					            }],
					          })(
				           
						            <Select initialValue="0" style={{ width: 120 }} onChange={handleChange}>
										      <Option value="0">根分类</Option>
										      <Option value="1">一级分类</Option>
										      
										    </Select>
										    
						 					)}
				         
			        </FormItem>
			         <FormItem {...tailFormItemLayout}>
			          <Button type="primary"
				          onClick = {this.handleSubmit}
	          			loading = {this.props.isAddFetching}

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
			isAddFetching:state.get('category').get('isAddFetching')
		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleSubmit:(values)=>{

			const action = actionCreator.getCateAction(values);

			dispatch(action)

		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);