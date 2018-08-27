import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink } from 'react-router-dom';

class CategoryList extends Component {

	render(){
		return(
			<div className="list">
				<Link to = "category/add">add!!!!!</Link>
			</div>
		)
	}
}

export default CategoryList;