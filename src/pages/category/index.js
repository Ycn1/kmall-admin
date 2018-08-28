import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink } from 'react-router-dom';


import CategoryAdd from './add.js';

import CategoryList from './list.js';
class Category extends Component {

	render(){
		return(
	 		<Switch>
				
				<Route path ="/category/add" component ={ CategoryAdd } />

				<Route path ="/category/:pid?" component= { CategoryList }></Route>
					
				
			</Switch>
			
			)
	}
}

export default Category;