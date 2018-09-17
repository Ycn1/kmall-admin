import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link, Redirect,NavLink, } from 'react-router-dom';
import MyLayout from '../../common/layout/index.js';
import { connect } from 'react-redux';
import { actionCreator } from './store/index.js';
import { Switch,InputNumber,Divider,Select,Table, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete,Breadcrumb} from 'antd';

const Search = Input.Search;

class Orderist extends Component {
	constructor(props){
			super(props);
		
			this.state = {
				pid:this.props.match.params.pid || 0
			}
		}
	componentDidMount(){

 		this.props.handleProductListPage(1)
 	}


 	
	render(){

		 const {
		 		keyword
		 	} = this.props;
		 
		const columns = [

		{
		  title: '订单号',
		  dataIndex: 'orderNo',
		  key: 'orderNo',
		  width:250,
		  render:(orderNo)=>{
		  	if(keyword){
		  				let reg = new RegExp("("+keyword +")",'ig');
		  				let html = orderNo.replace(reg,"<b style='color:red'>$1</b>");
		  				return <span dangerouslySetInnerHTML={{__html: html}}></span>

		  							
		  	}else{
		  		return orderNo

		  	}
		  
		  }
		},
		{
		  title: '收件人',
		  dataIndex: 'name',
		  key: 'name',
		  width:350
		  
		}, 
		{
		  title: '订单状态',
		  dataIndex: 'statusDesc',
		  key: 'statusDesc',
		
		},
		{
		  title: '订单金额',
		  dataIndex: 'payment',
		  key: 'payment',
		
		}, 
		{
		  title: '创建时间',
		  dataIndex: 'createdAt',
		  key: 'createdAt',
		
		},
		{
		  title: '操作',
		  dataIndex: 'option',
		  key: 'option',
		  render: (text, record) => (
		    <span>
		     
		      <Divider type="vertical" />
		  

	      	<span> 	

				  <Link to ={ "/order/detail/"+record.orderNo}>查看</Link>
		     </span>
				    
			    
		    </span>
		  ),
		}
	];
		const pid = this.state.pid;
		const data = this.props.list.map((order)=>{
		 	
		 		return {
		 			key:order.get('orderNo'),

		 			orderNo:order.get('orderNo'),
		 			name:order.get('shipping').get('name'),
		 			statusDesc:order.get('statusDesc'),
		 			payment:order.get('payment'),
		 			createdAt:order.get('createdAt'),
		 		
		 		}
		 	}).toJS();
		
		return(
			<MyLayout>
				
				<Breadcrumb style={{ marginBottom: 20 }}>
	    					<Breadcrumb.Item>订单页面</Breadcrumb.Item>
	    					<Breadcrumb.Item>订单管理</Breadcrumb.Item>
	    		</Breadcrumb>
	    		<Search
	    			  style={{ width: 300 }}
				      placeholder="请输入订单号"
				      onSearch={value => {

				      	this.props.handleSearch(value)
				      }}
				      enterButton
				 />

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
			isPageFetching:state.get('order').get('isPageFetching'),
			current:state.get('order').get('current'),
	    	pageSize:state.get('order').get('pageSize'),	    				
	    	total:state.get('order').get('total'),
			list:state.get('order').get('list'),
			keyword:state.get('order').get('keyword'),
		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
				handleProductListPage:(page)=>{

					const action = actionCreator.getProductListpage(page);

					dispatch(action)

				},
			
				handleSearch:(keyword,page)=>{
					dispatch(actionCreator.handleSearchOrderNo(keyword,page))
				}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Orderist);