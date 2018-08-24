
import React,{ Component,applyMiddleware } from 'react';

import { connect } from 'react-redux';

import './App.css';

import { Require,getUserName } from './util/index.js';



import Home from './pages/home/index.js'

import {  BrowserRouter as Router, Route, Link,Switch, Redirect } from 'react-router-dom';
import Login from './pages/login/index.js'


class App extends Component{
	
	render(){

		const ProtectRouter = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				)}
				/>
		)

		const LoginRouter =({component:Component,...rest})=>{
			if(getUserName()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}
		
		return(
			<Router>
				<div className= "App">
					<ProtectRouter path ="/" component = { Home } />
					<LoginRouter path = '/login' component= { Login } />
					
				</div>
				
			</Router>
		)
	}
}



export default App;