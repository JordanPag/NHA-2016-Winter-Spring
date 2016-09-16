function add() {
	var name = $("input#name").val;
	var price = $("input#price").val;
	var tags = [""];
	var stores = [""];
	var input = $("input#food").val;
	if (input==true) {
		tags.push("food");
	}
	var input = $("input#drink").val;
	if (input==true) {
		tags.push("drink");
	}
	var input = $("input#non-edible").val;
	if (input==true) {
		tags.push("non-edible");
	}
	var input = $("input#target").val;
	if (input==true) {
		stores.push("Target");
	}
	var input = $("input#stopshop").val;
	if (input==true) {
		stores.push("Stop & Shop");
	}
	var input = $("input#shoprite").val;
	if (input==true) {
		stores.push("ShopRite");
	}
	var input = $("input#walmart").val;
	if (input==true) {
		stores.push("Walmart");
	}
	$.ajax ({
		type: "POST",
		url: "http://data.sparkfun.com/input/8d1g0Y9Eybf6y0QZ4rnw?private_key=pz64GjnE9aF0Rnk45jvb&name="+name+"&price="+price+"&stores="+stores+"&tags="+tags+"",
		success: (response) => {
			console.log (response);
		}
	})
}