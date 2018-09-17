import React,{ Component,applyMiddleware } from 'react';

import {  BrowserRouter as Router, Route, Link,Switch, Redirect,NavLink } from 'react-router-dom';



import OrderList from './list.js';

import OrderDetail from './detail.js';
class Order extends Component {
	render(){
		return(
	 		<Switch>
				

			<Route path ="/order/detail/:orderNo?" component ={ OrderDetail  } /> 


				<Route path ="/order" component= { OrderList }></Route>
					
				
			</Switch>
			
			)
	}
}

export default Order;