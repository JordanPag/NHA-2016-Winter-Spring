CB.CloudApp.init('yegguroxoyua', '47345f24-5127-4318-abd3-b054fe11a2a2');

class order {
	constructor(){
		this.foods = [];
		this.price = 0;
		this.orderType = "";
	}

	addFood(food,price){
		this.foods.push(food);
		this.price += parseInt(price,10);
	}

	setOrderType(type){
		this.orderType = type;
	}

	getFoods(){
		var query = new CB.CloudQuery("order");
		query.find({
			success: (listorder) => {
				console.log(listorder);
				for(let x=0;x<listorder.length;x++){
					this.addFood(listorder[x].get("food"),listorder[x].get("price"));
					$("tbody#order").append(`<tr id="${x}"><td></td><td>${listorder[x].get("food")}</td><td>$${listorder[x].get("price")}</td><td><button class="btn btn-primary" onclick="del(${x});">X</button></td></tr>`);
				}
				$("tbody#order").append(`<tr><th scope='row'>Total</th><td></td><td>$${this.price}</td></tr>`)
			},
			error: (err) => {
				alert(err);
			}
		});
	}
}