
import React,{ Component,applyMiddleware } from 'react';

import { Form, Icon, Input, Button,message } from 'antd';

import { connect } from 'react-redux';

import axios from 'axios';

import { actionCreator } from './store/index.js'



import './index.css';


const FormItem = Form.Item;

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			isFetching:false
		}
	}
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props.handleSubmit(values)
       }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className = "Login">
	      <Form  className="login-form">
	        <FormItem>
	          {getFieldDecorator('username', {
	            rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3到6个字符'}],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: '请输入密码' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3到6个字符'}],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"  />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button 
	          	type="primary" 
	          	onClick={this.handleSubmit} 
	          	className="login-form-button"
	          	loading = {this.props.isFetching}
	          	 >
	            登录
	          </Button>
	      
	        </FormItem>
	      </Form>
	     </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

const mapStateToProps = (state)=>{
	
	return {
			isFetching:state.get('login').get('isFetching')
		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleSubmit:(values)=>{

			const action = actionCreator.getLoginAction(values);

			dispatch(action)

		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);