//2 - 749
//response.sprites.default

$("table").append("<th></th><th>Item Name</th><th>Quantity</th><th>Cost</th>");
var itemcount = 0;
var money = 3000;

function buy() {
   var e = window.event,
       btn = e.target || e.srcElement;
   console.log(btn.id);
   var id = btn.id;
   var num = id.split("y");
   console.log(num[1]);
   var realnum = num[1];
   if (realnum==1){
      var amount = $("#quant1").val();
      console.log(amount);
      $("#quant1").html(Number(amount)-1);
      money = money - $("#amount1").val();
      console.log(money);
      $("#money").html(money);
   }
}

function sell(){
   var e = window.event,
       btn = e.target || e.srcElement;
   console.log(btn.id);
   var id = btn.id;
   var num = id.split("l");
   console.log(num[2]);
   var realnum = num[2];
   var areatochange = "quant" + realnum;
   console.log(areatochange);
}

function getItem() {
	var rand = Math.floor((Math.random() * 749) + 2);
	var url = "http://pokeapi.co/api/v2/item/"+rand+"/"
	$.ajax({
		type: "GET",
		url: url,
		success (response) {
			console.log(response);
			if (response.cost==0){
				getItem();
				throw new Error('This is not an error. This is just to abort javascript');
			}
			itemcount = itemcount + 1;
			var itemamount = Math.floor((Math.random() * 10) + 10);
			$("table").append("<tr><td><img src='"+response.sprites.default+"'></td><td>"+response.names[0].name+"</td><td><span id='quant"+String(itemcount)+"'>"+String(itemamount)+"</span></td><td id='cost"+String(itemcount)+"'>"+response.cost+"</td><td><button onclick='buy();' id='buy"+String(itemcount)+"' class='button1'>Purchase</button><button onclick='sell();' id='sell"+String(itemcount)+"' class='button1'>Sell</button>");
			if (itemcount<10) {
				getItem();
			}
		}
	})
}
getItem();