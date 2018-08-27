
import React,{ Component,applyMiddleware } from 'react';
import { getUserName } from '../../util/index.js';
import { Link,NavLink } from 'react-router-dom';


import { Alert } from 'antd';
import './index.css';



class Errorpage extends Component {
	

  render() {
 
    return (
    	<div className= "errorpage">
	    	 <Alert message="Error Text" type="error" />
	    	 <Link to = "/">返回首頁</Link>
	   </div>
    );
  }
}


export default Errorpage;