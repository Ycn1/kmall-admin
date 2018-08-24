
import React,{ Component,applyMiddleware } from 'react';

import { connect } from 'react-redux';

import './App.css';

import {  BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import Login from './pages/login/index.js'


class App extends Component{

	
	
	render(){
		return(

			<Login />
		)
	}
}



export default App;