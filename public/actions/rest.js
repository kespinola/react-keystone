var request = require('superagent');
var {API_BASE} = require('../constants.json');

class RestActions{
	constructor(){}
	
	list(model, url){
			request
				.get(`${API_BASE}/${model.toLowerCase()}/${url}s`)
				.end((res)=>{
          console.log(this.url,res);
					this.dispatch(res);
				});
	}
	
	create(model, obj){
		request
			.post(`${API_BASE}/${model.toLowerCase()}/create`)
			.end((res)=>{
				this.dispatch(res);
			})
	}
	
	grab(model, id){
		request
			.get(`${API_BASE}/${model.toLowerCase()}/${id}`)
			.end((res)=>{
				this.dispatch(res)
			})
	}
	
	edit(model, obj){
    const{
      id
      } = obj;
		request
			.post(`${API_BASE}/${model.toLowerCase()}/${id}`)
			.send(obj)
			.end((res)=>{
				this.dispatch(res);
			})
	}
	
	remove(id){
		request
			.post(`${API_BASE}/${model.toLowerCase()}/delete/${id}`)
			.end((res)=>{
				this.dispatch(res);
			})
	}
	
}

module.exports = RestActions;
