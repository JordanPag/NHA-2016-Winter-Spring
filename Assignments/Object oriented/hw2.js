CB.CloudApp.init('ayyuhziequij', 'e592ce9a-b29b-444c-b5b2-138f4572644f');

class Product {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}

	api() {
		const product = new CB.CloudObject("Product");
		product.set("name",this.name);
		product.set("price",this.price);
		return product;
	}

	save(pro) {
		let product = eval(pro);
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
		query.find({
			success: function(list){
				console.log(list);
			},
			error: function(err) {
				console.log(err);
			}
		})
	}
}

const add = () => {
	var name = $("input#name").val();
	var price = $("input#price").val();
	var save = confirm(`Are you sure you want to save a product with ${name} as the name and $${price} as the price?`);
	const thing = new Product(name,price);
	const product = thing.api();
	console.log(product.get("name"));
	console.log(product.get("price"));
	thing.save(product);
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