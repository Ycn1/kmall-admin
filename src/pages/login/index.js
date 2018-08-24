
import React,{ Component,applyMiddleware } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { connect } from 'react-redux';

import axios from 'axios';


import './index.css';


const FormItem = Form.Item;

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        axios({
        	methodL:'post',
        	url:'http//127.0.0.1:3000/admin/login',
        	data:values
        })
        .then(result=>{
        	console.log(result)
        })
        .catch(e=>{
        	console.log(e)
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className = "Login">
	      <Form  className="login-form">
	        <FormItem>
	          {getFieldDecorator('userName', {
	            rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3到6个字符'}],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: '请输入密码' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3到6个字符'}],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button type="primary" onClick={this.handleSubmit} className="login-form-button" loading = {false}>
	            登录
	          </Button>
	      
	        </FormItem>
	      </Form>
	     </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;