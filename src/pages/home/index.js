
import React,{ Component,applyMiddleware } from 'react';
import { getUserName } from '../../util/index.js';

import { Form, Icon, Input, Button,message,Card, Col, Row } from 'antd';

import   MyLayout 	  from '../../common/layout/index.js';

import { connect } from 'react-redux';

import { actionCreator } from './store/index.js'

import './index.css';
const FormItem = Form.Item;

class Home extends Component {
	componentDidMount(){
 		this.props.handleMount()
 	}

  render() {
 	
 	
    return (
    	<div>
	    	<MyLayout> 

	    		 <Row gutter={16}>
	    		 <Card title="用户数" bordered={false} style={{ width: 300 }} className = "card">
			      	<p>{this.props.usernumber}</p>		
			   	 </Card>
			   	 <Card title="订单数" bordered={false} style={{ width: 300 }} className = "card">
			      	<p>{this.props.ordernumber}</p>		
			   	 </Card>
			   	  <Card title="商品数" bordered={false} style={{ width: 300 }} className = "card">
			      	<p>{this.props.productnumber}</p>		
			   	 </Card>
			    </Row>
	    	</MyLayout>
	   </div>
    );
  }
}

const mapStateToProps = (state)=>{
	
	return {
			usernumber:state.get('home').get('usernumber'),
			ordernumber:state.get('home').get('ordernumber'),
			productnumber:state.get('home').get('productnumber')
		
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleMount:(values)=>{

			const action = actionCreator.getCount(values);

			dispatch(action)

		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);