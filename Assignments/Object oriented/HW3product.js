CB.CloudApp.init('ayyuhziequij', 'e592ce9a-b29b-444c-b5b2-138f4572644f');

function save(cbobj){
	cbobj.save({
		success: (obj) => {
			console.log(obj);
		},
		error: (err) => {
			console.log(err);
		}
	})
}

class product {
	constructor(params){
		let product = CB.CloudObject("Product");
		this._id = params.id;
		this._name = params.name;
		this._cost = params.cost;
		this.save();
	}
	save(){
		save(product);
	}
}