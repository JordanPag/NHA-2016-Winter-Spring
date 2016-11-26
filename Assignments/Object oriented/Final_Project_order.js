CB.CloudApp.init('yegguroxoyua', '47345f24-5127-4318-abd3-b054fe11a2a2');

class order {
	constructor(){
		this.foods = [];
		this.price = 0;
		this.orderType = "";
	}

	addFood(food){
		this.foods.push(food);
		this.price = this.price + food.price;
	}

	setOrderType(type){
		this.orderType = type;
	}
}