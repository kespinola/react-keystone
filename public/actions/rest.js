var request = require('superagent');
var {API_BASE} = require('../constants.json');

class RestActions{
	constructor(config = {}){
		this.base_url = API_BASE;
		
		console.log(this,config);
		
	}
	
	list(){
			request
				.get(`${this.url}s`)
				.then((res)=>{
					this.dispatch(res);
				});
	}
	
	create(obj){
		request
			.post(`${this.url}/create`)
			.then((res)=>{
				this.dispatch(res);
			})
	}
	
	grab(id){
		request
			.get(`${this.url}/${id}`)
			.then((res)=>{
				this.dispatch(res)
			})
	}
	
	edit(obj){
		request
			.post(`${this.url}`)
			.send(obj)
			.then((res)=>{
				this.dispatch(res);
			})
	}
	
	remove(id){
		request
			.post(`${this.url}/delete/${id}`)
			.then((res)=>{
				this.dispatch(res);
			})
	}
	
}

module.exports = RestActions;
