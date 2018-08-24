
import React,{ Component,applyMiddleware } from 'react';
import { getUserName } from '../../util/index.js';


import { Form, Icon, Input, Button,message } from 'antd';



const FormItem = Form.Item;

class Home extends Component {
	

  render() {
 
    return (
    	<div>
	    	{ getUserName() }
	    </div>
    );
  }
}


export default Home;