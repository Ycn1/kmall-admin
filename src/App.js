
import React,{ Component,applyMiddleware } from 'react';

import { connect } from 'react-redux';

import './App.css';

import { Require,getUserName } from './util/index.js';

import Home from './pages/home/index.js';

import User from './pages/user/index.js';
import Category from  'pages/category/index.js';

import Errorpage from './common/error-page/index.js'
import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink } from 'react-router-dom';
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
					<Switch>
						<ProtectRouter exact path ="/" component = { Home } />
						<ProtectRouter exact path ="/user" component = { User } />
						<ProtectRouter  path ="/category" component = { Category } />

						<LoginRouter path = '/login' component= { Login } />
						<Route component = { Errorpage } />
					</Switch>
					
				</div>
				
			</Router>
		)
	}
}



export default App;