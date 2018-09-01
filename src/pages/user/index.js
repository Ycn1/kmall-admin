
import React,{ Component,applyMiddleware } from 'react';
import { getUserName } from '../../util/index.js';

import { connect } from 'react-redux';

import { Form, Icon,Table,Pagination,Breadcrumb } from 'antd';

import   MyLayout 	  from '../../common/layout/index.js'

import { actionCreator } from './store/index.js'

import moment from 'moment';
const FormItem = Form.Item;

const columns = [
		{
		  title: '用戶名',
		  dataIndex: 'username',
		  key: 'username',
		}, 
		{
		  title: '是否管理员',
		  dataIndex: 'isAdmin',
		  key: 'isAdmin',
		  render : isAdmin=>(isAdmin?'是':'否')
		},
		{
		  title: '邮箱',
		  dataIndex: 'email',
		  key: 'email',
		 
		},
		{
		  title: '手机',
		  dataIndex: 'phone',
		  key: 'phone',
		 
		},
		{
		  title: '注册时间',
		  dataIndex: 'createdAt',
		  key: 'createdAt',
		 
		}
	];

	
class User extends Component {
	componentDidMount(){
 		this.props.handlePage(1)
 	}

  render() {
 	const data = this.props.list.map((user)=>{
 		console.log("users!!!!",user)
 		return {
 			key:user.get('_id'),
 			username:user.get('username'),
 			isAdmin:user.get('isAdmin'),
 			phone:user.get('phone'),
 			email:user.get('email'),
 			createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH-mm-ss')

 		}
 	}).toJS();
    return (
    	<div>
	    	<MyLayout> 
	    		<Breadcrumb>
	    			<Breadcrumb.Item><a href="">用户管理</a></Breadcrumb.Item>
    				<Breadcrumb.Item>用户列表</Breadcrumb.Item>
    			</Breadcrumb>
	    		<Table 

	    			dataSource={data} 
	    			columns={columns}
	    			pagination={
	    				{ 	
	    					defaultCurrent:this.props.current,
	    					current:this.props.current,
	    					pageSize:this.props.pageSize,	    				
	    					total:this.props.total,
	    					
	    				}
	    			}
	    			onChange = {(pagination)=>{
	    					console.log(pagination.current)
							this.props.handlePage(pagination.current)
						}}

	    			loading={
	    				{
	    					spinning:this.props.isFetching,
	    					size:'large',
	    					tip:"数据正在加载中"
	    				}
	    			}
	    		 />
	    	</MyLayout>
	   </div>
    );
  }
}

const mapStateToProps = (state)=>{
	
	return {
				isFetching:state.get('user').get('isFetching'),
			 	current:state.get('user').get('current'),
	    		pageSize:state.get('user').get('pageSize'),	    				
	    		total:state.get('user').get('total'),
				list:state.get('user').get('list')
		}
}	
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{

			const action = actionCreator.getuserpage(page);

			dispatch(action)

		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User);