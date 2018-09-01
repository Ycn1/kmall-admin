
import React,{ Component,applyMiddleware } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { Link,NavLink } from 'react-router-dom';

import './index.css'
const { SubMenu } = Menu;
const {  Sider } = Layout;

class MySider extends Component {
	

  render() {
 
    return (
    	<div className = "Sider">
			      <Sider width={200} style={{ background: '#fff' }}>
			        <Menu
			          mode="inline"
			          defaultOpenKeys={['sub1']}
			          style={{ minHeight: 680, borderRight: 0 }}
			        > 
			            <Menu.Item key="1">
			            	<NavLink exact to = "/"> 
			            		<Icon type="home" />首页			            	
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="2">
			            	<NavLink to = "/user"> 
			            		<Icon type="user-add" />用户信息
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="3">
			            	<NavLink to = "/category">
			            		<Icon type="bars" />分类管理
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="4">
			            	<NavLink to = "/product">
			            		<Icon type="book" />商品
			            	</NavLink>
			            </Menu.Item>			          
			        </Menu>
			      </Sider>
		    
	    </div>
    );
  }
}


export default MySider;