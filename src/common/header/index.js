
import React,{ Component,applyMiddleware } from 'react';

import { Layout, Menu, Breadcrumb, Icon,Dropdown } from 'antd';

import { getUserName,Require,removeUserName } from 'util/index.js' ;


const { SubMenu } = Menu;
const { Header } = Layout;
import { logoutUrl } from 'api/index.js'

import './index.css'

class MyHeader extends Component {
	constructor(props){
		super(props);
		this.handleMenuClick =  this.handleMenuClick.bind(this)
	}

	handleMenuClick(){
		Require({
			url:logoutUrl
		})
		.then(result=>{
			removeUserName()
			window.location.href = '/login'
		})
		.catch(e=>{
			console.log(e)
		})
	}
  render() {

  	const menu = (
			  <Menu onClick={this.handleMenuClick}>
			    <Menu.Item key="0">
			     <Icon type="logout" />退出
			    </Menu.Item>
			  </Menu>
			)
 
    return (
		  	<div>
		  	
		    <Header className="header">
			      <div className="logo">KMALL</div>	
			       <Dropdown overlay={menu} trigger={['click']}>
				    <a className="ant-dropdown-link" href="#">
				      { getUserName() }<Icon type="down" />
				    </a>
				  </Dropdown>
		    </Header>
	    </div>
    );
  }
}


export default MyHeader;