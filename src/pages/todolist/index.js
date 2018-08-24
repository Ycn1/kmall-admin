
import React,{ Component,applyMiddleware } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

import { connect } from 'react-redux';

import axios from 'axios';
const { fromJS } = require('immutable');


import './todolist.css';

import { actionCreator } from './store/index.js'

class Todolist extends Component{

	componentDidMount(){
		//this.props.get_set_init()
   }
	
	render(){

		
		return(
			<div className="App">
			    <Row>
			      <Col span={18} ><Input 
			      	value ={this.props.value}
			      	onChange = { this.props.handleChange }
			      	
			      	/> </Col>
			      <Col span={6} ><Button type="primary"  onClick = { this.props.handleAdd }>增加</Button></Col>
			    </Row>
			    <List
			      style={{ marginTop: 10 }}
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (<List.Item onClick = {()=>{this.props.handleDelete(index)}}>{item}</List.Item>)}
			    />			    			
			</div>				
		)
	}
}

const mapStateToProps = (state)=>{
	
	return {
			value : state.get('todolist').get('value'),
			list : state.get('todolist').get('list')
		}
		
}
const mapDispatchToProps = (dispatch)=>{

	return {

		handleChange (e){
			const action = actionCreator.change_value(e.target.value);

			dispatch(action);
		},
		handleAdd(){
			const action = actionCreator.add_item();
			dispatch(action)
		},
		handleDelete (index){
			const action =  actionCreator.delete_item(index);
			dispatch(action)
		},
		
		get_set_init (){
			const action = actionCreator.set_init ();

			dispatch(action)
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Todolist);