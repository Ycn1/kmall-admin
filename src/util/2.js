
import axios from 'axios';

 axios({
		 	method:  'get',
        	url:'https://love.isdalao.com',
        	
        	
		 })
		 .then(result=>{
		 	let data = result.data;
		 	console.log(data);

		 
		 })
		 .catch(e=>{
		 	reject(e)
		 })