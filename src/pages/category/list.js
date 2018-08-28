import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink, } from 'react-router-dom';
import MyLayout from '../../common/layout/index.js';
import { connect } from 'react-redux';
import { actionCreator } from './store/index.js'


import {  Modal,InputNumber,Divider,Select,Table, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete,Breadcrumb} from 'antd';
const columns = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		},
		{
		  title: '分类名称',
		  dataIndex: 'name',
		  key: 'name',
		}, 
		{
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render: (order, record) => {
		    return	<InputNumber defaultValue={order}  />
				}
		},
		{
		  title: '操作',
		  dataIndex: 'option',
		  key: 'option',
		  render: (text, record) => (
		    <span>
		      <Link to ={ "/category/"+record.id}>查看子分类</Link>
		      <Divider type="vertical" />
		      <a href="javascript:;"
		      	onClick = {this.props.handleUpdateModel(record.id,record.name)}
		      >
		      	更新名称

		      </a>
		    </span>
		  ),
		}
	];

class CategoryList extends Component {
	constructor(props){
			super(props);
		
			this.state = {
				pid:this.props.match.params.pid || 0
			}
		}

	componentDidUpdate(preProps,preState){
		console.log(preProps)
		let oldPath =  preProps.location.pathName;
		let newPath =  this.props.location.pathName;

		if(oldPath != newPath){

			this.setState = {
				pid:this.props.match.params.pid || 0
			}
		}
	}
	componentDidMount(){

 		this.props.handleCateListPage(this.state.pid,1)
 	}
	render(){
		const pid = this.state.pid;
		const data = this.props.list.map((category)=>{
		 		console.log("users!!!!",category)
		 		return {
		 			key:category.get('_id'),

		 			id:category.get('_id'),
		 			name:category.get('name'),
		 			order:category.get('order'),
		 			pid:category.get('pid'),
		 		
		 			

		 		}
		 	}).toJS();
		return(
			<MyLayout>
				<Breadcrumb>
	    					<Breadcrumb.Item>分类页面</Breadcrumb.Item>
	    					<Breadcrumb.Item>分类管理</Breadcrumb.Item>
	    			</Breadcrumb>
				<div className="list" style={{ 'marginTop':"10px"}} className= "clearfix">
					<Link to = "category/add">

						<h4 style={{ 'float':"left"}}>父类ID：{ pid }</h4>
						<Button type="primary" style={{ 'float':"right"}}>新增分类</Button>
					</Link>
				</div>

				<Table 

	    			dataSource={data} 
	    			columns={columns}
	    			pagination={
	    				{ 	
	    					current:this.props.current,
	    					pageSize:this.props.pageSize,	    				
	    					total:this.props.total,
	    					defaultCurrent:this.props.current
	    				}
	    			}
	    			onChange={
	    				pagination=>{
	    					this.props.handleCateListPage (this.state.pid,pagination.current)
	    				}}

	    			loading={
	    				{
	    					spinning:false,
	    					size:'large',
	    					tip:"数据正在加载中"
	    				}
	    			}
	    		 />
	    		 <Modal
			          title="Basic Modal"
			          visible={this.state.updateModelVisible}
			          onOk={this.handleUpdateName}
			          onCancel={this.handleCancelName}
			        >
			          <p>Some contents...</p>
			      </Modal>
			</MyLayout>
		)
	}
}
const mapStateToProps = (state)=>{
	
	return {
				isListFetching:state.get('category').get('isListFetching'),
			 	current:state.get('category').get('current'),
	    		pageSize:state.get('category').get('pageSize'),	    				
	    		total:state.get('category').get('total'),
				list:state.get('category').get('list')
		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleCateListPage:(pid,page)=>{

			const action = actionCreator.getCateListpage(pid,page);

			dispatch(action)

		},
		handleUpdateModel:(updateId,updateName)=>{
			const action = actionCreator.getShowModelAction(updateId,updateName);

			dispatch(action)
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);