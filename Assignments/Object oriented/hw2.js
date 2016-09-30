CB.CloudApp.init('ayyuhziequij', 'e592ce9a-b29b-444c-b5b2-138f4572644f');

class Product {
	constructor(name, price) {
		let product = new CB.CloudObject("Product");
		product.set("name",name);
		product.set("price",price);
	}
	save() {
		product.save ({
			success: (obj) =>{
				console.log(obj);
			},
			error: (err) =>{
				console.log(err);
			}
		})
	}
	delete() {
		product.delete({
			success: (obj) =>{
				console.log(obj);
			},
			error: (err) =>{
				console.log(error);
			}
		})
	}
}

class Store {
	listAllProducts() {
		let query = new CB.CloudQuery("Product");
		var items = query;
	}
}

const add = () => {
	var name = $("input#name").val();
	var price = $("input#price").val();
	console.log(name);
	console.log(price);
	var thing = new Product(name,price);
	thing.save();
}

/*let product = new CB.CloudObject("Product");
product.set("name","Huawei Smart Watch");
product.set("price","$400");
product.set("tags","smart, screen, phone");
product.set("stores","amazon");
console.log(product.get("name"));
console.log(product.get("price"));
console.log(product.get("tags"));
console.log(product.get("stores"));
product.save ({
	success: (obj) =>{
		console.log(obj);
	},
	error: (err) =>{
		console.log(err)
	}
})
let query = new CB.CloudQuery("Product");
query.find({
	success: (list) =>{
		console.log(list);
	},
	error: (err) =>{
	}
}) */