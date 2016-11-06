var num = 2;
var num2 = 101;

function add() {
	$("form#one").append("<input type='text' placeholder='home' id='"+num+"'/><br>");
	num += 1;
}

function addstore() {
	$("form#two").append("<input type='text' placeholder='walmart' id='"+num2+"'/><br>");
	num2 += 1;
}

class Product {
	constructor(tags,stores,name,price) {
		for (x=0;x<tags.length;x++) {
			if (x==0) {
				this.tags = tags[x];
			} else {
				this.tags = this.tags + ", " + tags[x];
			}
		}
		for (y=0;y<stores.length;y++) {
			if (y==0) {
				this.stores = stores[y];
			} else {
				this.stores = this.stores + ", " + stores[y];
			}
		}
		this.name = name;
		this.price = price;
	}

	save () {
		$.ajax({
			url: 'http://data.sparkfun.com/input/q5nngNQvJ0uJWYMLL03V',
			headers: {
				'Phant-Private-Key':'BVRRjJXlBWIPqJ6zzWng'
			},
			method: 'POST',
			dataType: 'json',
			data: {name: this.name, tags: this.tags, stores: this.stores, price: this.price},
			success: function(data) {
				console.log('success: ' + data);
				alert("Saved!");
			}
		})
	}
}

function save() {
	var name = $("input#name").val();
	var price = $("input#price").val();
	var tags = [];
	var stores = [];
	for (x=1;x<num;x++) {
		var a = $("input#"+x).val();
		tags.push(a);
	}
	for (y=100;y<num2;y++) {
		var b = $("input#"+y).val();
		stores.push(b);
	}
	num = 1;
	num2 = 100;
	$("form#one").html("<b>Choose Your Tags</b><br><input type='text' placeholder='home' id='"+num+"'/><br>");
	$("form#two").html("<b>Choose Your Stores</b><br><input type='text' placeholder='walmart' id='"+num2+"'/><br>")
	num += 1;
	num2 += 1;
	const product = new Product(tags,stores,name,price);
	console.log(product.tags);
	console.log(product.stores);
	console.log(product.name);
	console.log(product.price);
	product.save();
}

function show() {
	const something = new Product("as","asdf","asfd","df");
	$.ajax({
		type: "GET",
		url: "https://data.sparkfun.com/output/q5nngNQvJ0uJWYMLL03V.json",
		success: (response) => {
			console.log(response);
			$("div").html("<table style='width:500px'><tr><th>Name</th><th>Price</th><th>Tags</th><th>Stores</th></tr></table>");
			for(z=0;z<response.length;z++) {
				$("table").append("<tr><td>"+response[z].name+"</td><td>$"+response[z].price+"</td><td>"+response[z].tags+"</td><td>"+response[z].stores+"</td></tr>");
			}
		},
		error: function(request,error) {
			alert("Please try again.");
		}
	})
}