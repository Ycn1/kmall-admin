import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink, } from 'react-router-dom';
import MyLayout from '../../common/layout/index.js';
import { connect } from 'react-redux';
import { actionCreator } from './store/index.js'


import {  Modal,InputNumber,Divider,Select,Table, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete,Breadcrumb} from 'antd';


class CategoryList extends Component {
	constructor(props){
			super(props);
		
			this.state = {
				pid:this.props.match.params.pid || 0
			}
		}
	componentDidMount(){

 		this.props.handleCateListPage(this.state.pid,1)
 	}
	componentDidUpdate(preProps,preState){
	
		let oldPath = preProps.location.pathname;
		let newPath = this.props.location.pathname;

		if(oldPath != newPath){
		
				let newPid = this.props.match.params.pid || 0;
				this.setState({
					pid:newPid
				},()=>{
					this.props.handleCateListPage(newPid,1);
				})
		}
	}

 	
	render(){
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
		    return	<InputNumber 
		    		defaultValue={order}

		    		onBlur = {(e)=>{
		    			this.props.handleOrder(pid,record.id,e.target.value)
		    		}}  

		    	/>
				}
		},
		{
		  title: '操作',
		  dataIndex: 'option',
		  key: 'option',
		  render: (text, record) => (
		    <span>
		     
		      <a href="javascript:;"
		      	onClick={()=>{
					  		this.props.showUpdateModal(record.id,record.name)
					  	}}
		      >
		      	更新名称

		      </a>
		      {		
		      			record.pid == 0 

				      	?	(<span>
							      	<Divider type="vertical" />

							        <Link to ={ "/category/"+record.id}>查看子分类</Link>
					        </span>)
				      	:null
			     }
		    </span>
		  ),
		}
	];
		const pid = this.state.pid;
		const data = this.props.list.map((category)=>{
		 	
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
	    				(pagination)=>{
	    					this.props.handleCateListPage (pid,pagination.current)
	    				}}

	    			loading={
	    				{
	    					spinning:this.props.isPageFetching,
	    					size:'large',
	    					tip:"数据正在加载中"
	    				}
	    			}
	    		 />
	    		 <Modal
			          title="修改分类名称"
			          visible={this.props.updateModelVisible}
			          onOk={()=>{this.props.handleUpdateName(this.state.pid)}}
			          onCancel={this.props.handleCancelName}
			        >
			          <p>

			          		<label>原分类名</label>
			          		<Input 
			          				value={this.props.updateName}

			          				onChange={(e)=>{
			          					this.props.handleModelChangeName(e.target.value)
			          				}}

			          		 />
			          		
			          </p>
			      </Modal>
			</MyLayout>
		)
	}
}
const mapStateToProps = (state)=>{
	
	return {
				isPageFetching:state.get('category').get('isPageFetching'),
			 	current:state.get('category').get('current'),
	    		pageSize:state.get('category').get('pageSize'),	    				
	    		total:state.get('category').get('total'),
				list:state.get('category').get('list'),
				updateModelVisible:state.get('category').get('updateModelVisible'),
				updateName:state.get('category').get('updateName'),
			

		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
				handleCateListPage:(pid,page)=>{

					const action = actionCreator.getCateListpage(pid,page);

					dispatch(action)

				},
				showUpdateModal:(updateId,updateName)=>{
					const action = actionCreator.getUpdateModelAction(updateId,updateName);

					dispatch(action)
				},
				handleCancelName:()=>{
					dispatch(actionCreator.updateCancel())
				},
				handleUpdateName:(pid)=>{
					dispatch(actionCreator.updateModelName(pid))
				},
				//改变的是input框里面的值
				handleModelChangeName:(newName)=>{
					dispatch(actionCreator.handleModelChangeName(newName))
				},

				//改变的是input框里面的order值

				handleOrder:(pid,id,newOrder)=>{
					dispatch(actionCreator.handleOrderValue(pid,id,newOrder))

				}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);