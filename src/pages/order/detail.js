import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect, } from 'react-router-dom';

import { Select, Icon,  Checkbox, Button, Breadcrumb,Popconfirm} from 'antd';

import MyLayout from '../../common/layout/index.js';

import { connect } from 'react-redux';
import { actionCreator } from './store/index.js';

import moment from 'moment';
import './detail.css';


class OrderDetail extends Component {
		constructor(props){
				super(props);

				this.state = {
					
					orderNo:this.props.match.params.orderNo
				}
			};
		
		  componentDidMount(){
		 	

		 		if(this.state.orderNo){

		 			this.props.handleOrderDetail(this.state.orderNo)
		 		}
		 	}

	render(){

		 const {
		 		orderNo,
		 		payment,
		 		createdAt,
		 		statusDesc,
		 		status,
		 		productList,
		 		shipping,
		 		paymentTypeDesc
		 	} = this.props.orderDetail;
		 	let createdTime  ='';
		 	if(createdAt){
		 		console.log("121",createdTime)
		 		createdTime = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
		 	}
		 	
		 	
		return(
			<MyLayout>
				<div className="list">
					<Breadcrumb>
	    					<Breadcrumb.Item>商品页面</Breadcrumb.Item>
	    					<Breadcrumb.Item>
	    							商品详情
	    					</Breadcrumb.Item>
	    			</Breadcrumb>
	    					{
	    						orderNo
	    						?	<div><ul className="order-list clearfix">
										<li className="order-item">
											<span>订单号 : {orderNo}</span>
											
										</li>
										<li className="order-item">
											<span>创建时间 : {createdTime}</span>
											
										</li>
										<li className="order-item">
											<span>订单状态 : {statusDesc}</span>
											
										</li>
										<li className="order-item">
											<span>收件人 ：{shipping.name}({shipping.phone})</span>
											
										</li>
										
										<li className="order-item">
											<span>价格： ￥</span>
											<span className="payment">{payment}</span>
											
										</li>
										<li className="order-item">
											{
												status == '10'
												? <Popconfirm 
														placement="topLeft" 
														title={"确认发货吗"} 
														onConfirm={confirm} 
														okText="确认" 
														cancelText="取消">
											        <Button>发货</Button>
											      </Popconfirm>
												
												:null
											}
										</li>
										
									</ul>

									<ul className="product-header">	
										
										<li className="header-product">
											商品
										</li>
										<li className="header-price">
											单价
										</li>
										<li className="header-count">
											数量
										</li>
										<li className="header-count">
											小计
										</li>
									</ul>
								
									{
										productList.map((product,index)=>{
											return <ul className="product-item" key = {index}>
										
													<li className="product-info">
														<a href="./detail.html/productId = {product.product}" className="link">
															<img src={product.image} alt="" />
															<span>{product.name}</span>
														</a>
													</li>
													<li className="product-price">
														￥{product.Price}
													</li>
													
													<li className="product-price">
														￥{product.count}
													</li>
													
													<li className="product-totalprice">
														￥{product.payment}
													</li>

												</ul>
										})
									}</div>

									
	    						:null

	    					}
	    			
	    		
				
				</div>
			
		        
		      </MyLayout>
		)
	}
}


const mapStateToProps = (state)=>{

	return {
			orderDetail:state.get('order').get('orderDetail'),
		}
		
}
const mapDispatchToProps = (dispatch)=>{
	return {
		
		handleOrderDetail:(orderNo)=>{

			dispatch(actionCreator.handleDetailAction(orderNo))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);