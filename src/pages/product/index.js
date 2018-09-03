import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink } from 'react-router-dom';


import ProductAdd from './add.js';

import ProductList from './list.js';

import ProductDetail from './detail.js';
class Product extends Component {
	render(){
		return(
	 		<Switch>
				

				<Route path ="/product/add/:productId?" component ={ ProductAdd  } />
				<Route path ="/product/detail/:productId?" component ={ ProductDetail  } />


				<Route path ="/product" component= { ProductList }></Route>
					
				
			</Switch>
			
			)
	}
}

export default Product;