
import React,{ Component,applyMiddleware } from 'react';
import { getUserName } from '../../util/index.js';


import { Form, Icon, Input, Button,message,Table } from 'antd';

import   MyLayout 	  from '../../common/layout/index.js'


const FormItem = Form.Item;

const columns = [{
		  title: '用戶名',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '是否管理员',
		  dataIndex: 'isAdmin',
		  key: 'isAdmin',
		  render : isAdmin=>(isAdmin?'是':'否')
	}];

	const dataSource = [{
		  key: '1',
		  name: 'admin',
		  isAdmin: '是',
		 
		}, {
		  key: '2',
		  name: 'test1',
		  isAdmin: '否',
		 
		}];
class User extends Component {
  render() {
 	
    return (
    	<div>
	    	<MyLayout> 
	    		<Table dataSource={dataSource} columns={columns} />
	    	</MyLayout>
	   </div>
    );
  }
}


export default User;