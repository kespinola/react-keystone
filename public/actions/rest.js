import request from 'superagent';
var {API_BASE} = require('./constants');

class RestActions{
	constructor(config = {}){
		this.base_url = (config.base_url || "/api/");
		
		if(!config.model) throw Error("A model key must be specified");
		this.model = config.model.toLowerCase();
		
		this.url = `${this.base_url}/${this.model}/list`;
	}
	
	list(){
		const data = this.getState()[this.model];
			request
				.get(`${this.url}/list`)
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
	
	edit(obj){}
	
	remove(id){}
	
}
