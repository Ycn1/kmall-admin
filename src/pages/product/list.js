import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link, Redirect,NavLink, } from 'react-router-dom';
import MyLayout from '../../common/layout/index.js';
import { connect } from 'react-redux';
import { actionCreator } from './store/index.js';
import { Switch,InputNumber,Divider,Select,Table, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete,Breadcrumb} from 'antd';

const Search = Input.Search;

class ProductList extends Component {
	constructor(props){
			super(props);
		
			this.state = {
				pid:this.props.match.params.pid || 0
			}
		}
	componentDidMount(){

 		this.props.handleProductListPage(1)
 	}
	componentDidUpdate(preProps,preState){
	
		let oldPath = preProps.location.pathname;
		let newPath = this.props.location.pathname;

		if(oldPath != newPath){
		
				let newPid = this.props.match.params.pid || 0;
				this.setState({
					pid:newPid
				},()=>{
					this.props.handleProductListPage(newPid,1);
				})
		}
	}

 	
	render(){

		 const {
		 		keyword
		 	} = this.props;
		 
		const columns = [

		{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		},
		{
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		  render:(name)=>{
		  	if(keyword){
		  				let reg = new RegExp("("+keyword +")",'ig');
		  				let html = name.replace(reg,"<b style='color:red'>$1</b>");
		  				return <span dangerouslySetInnerHTML={{__html: html}}></span>

		  							
		  	}else{
		  		return name

		  	}
		  
		  }
		}, 
		{
		  title: '商品状态',
		  dataIndex: 'status',
		  key: 'status',
		 render: (status, record) => {
		    return	<Switch 
		    			checkedChildren = "在售"
						unCheckedChildren = "下线"
						defaultChecked = {record.status == "0" ? true:false}

						onChange = {(defaultChecked)=>{
							this.props.handleStatus(record.id,defaultChecked ? 0:1)
						}}
		    		/>
				}
		}, 
		{
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render: (order, record) => {
		    return	<InputNumber 
		    		defaultValue={order}

		    		onBlur = {(e)=>{
		    			this.props.handleOrder(record.id,e.target.value)
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
		     
		      <Link to ={ "/product/add/"+record.id}
		      >
		      	编辑

		      </Link>
		      <Divider type="vertical" />
		  

	      	<span> 	

				  <Link to ={ "/product/detail/"+record.id}>查看</Link>
		     </span>
				    
			    
		    </span>
		  ),
		}
	];
		const pid = this.state.pid;
		const data = this.props.list.map((product)=>{
		 	
		 		return {
		 			key:product.get('_id'),

		 			id:product.get('_id'),
		 			name:product.get('name'),
		 			order:product.get('order'),
		 			status:product.get('status'),
		 		
		 		}
		 	}).toJS();
		
		return(
			<MyLayout>
				
				<Breadcrumb style={{ marginBottom: 20 }}>
	    					<Breadcrumb.Item>商品页面</Breadcrumb.Item>
	    					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
	    		</Breadcrumb>
	    		<Search
	    			  style={{ width: 300 }}
				      placeholder="请输入搜索关键字"
				      onSearch={value => {

				      	this.props.handleSearch(value)
				      }}
				      enterButton
				 />
				<div className="list" style={{ 'marginTop':"10px"}} className= "clearfix">
					<Link to = "/product/add">

						
						<Button type="primary" style={{ 'float':"right"}}>新增商品</Button>
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
	    					console.log(keyword)
	    					if(keyword){
	    						this.props.handleSearch(keyword,pagination.current)
	    					}else{
	    						this.props.handleProductListPage (pagination.current)
	    					}
	    					
	    				}}

	    			loading={
	    				{
	    					spinning:this.props.isPageFetching,
	    					size:'large',
	    					tip:"数据正在加载中"
	    				}
	    			}
	    		 />
	    		
			</MyLayout>
		)
	}
}
const mapStateToProps = (state)=>{
	
	return {
			isPageFetching:state.get('product').get('isPageFetching'),
			current:state.get('product').get('current'),
	    	pageSize:state.get('product').get('pageSize'),	    				
	    	total:state.get('product').get('total'),
			list:state.get('product').get('list'),
			keyword:state.get('product').get('keyword'),
		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
				handleProductListPage:(page)=>{

					const action = actionCreator.getProductListpage(page);

					dispatch(action)

				},
				handleStatus:(id,newStatus)=>{
					const action = actionCreator.getUpdateStatusAction(id,newStatus);

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

				handleOrder:(id,newOrder)=>{
					dispatch(actionCreator.handleOrderValue(id,newOrder))

				},
				handleSearch:(keyword,page)=>{
					dispatch(actionCreator.handleSearchName(keyword,page))
				}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);