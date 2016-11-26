CB.CloudApp.init('yegguroxoyua', '47345f24-5127-4318-abd3-b054fe11a2a2');

var length;

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

function signup() {
	let user = $("input#username").val();
	let pass = $("input#password").val();
	console.log(user);

	const cust = new customer(user,pass);
	cust.signup();
}

function login() {
	let user = $("input#username").val();
	let pass = $("input#password").val();
	console.log(user);

	const cust = new customer(user,pass);
	cust.signin();
}

window.onload = function(){
	//Menu.html
	var query = new CB.CloudQuery("order");
	query.find({
		success: function(list){
			console.log(list);
			length = list.length;
			if(length>0){
				$("span#foods").html(length);
			} else {
				$("span#foods").html("");
			}
		},
		error: function(err){
			alert(err);
		}
	})
	if(n=="Friday"){
		$("h1#header").html("Sorry! We're closed on Fridays.")
	} else {
		$("span#day").html(n);
	}
	if(n=="Sunday"){
		var y = 3;
	} else {
		var y = 4;
	}
	if(n=="Friday"){
		//CLOSED
	} else {
		for(let x=0;x<y;x++){
			var width = 0;
			var over = "no";
			var day = eval(n);
			var item = day[x].name;
			console.log(item);
			$("center#menu").append(`<br><br><br><br><h3>${item}</h3><button type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal${x}'>Details</button><button type='button' class='btn btn-primary btn-lg' onclick='buy("${day[x].codeName}");'>I want this &nbsp;$${day[x].price}</button>`);
			$("h2[duck="+x+"]").append(item);
			for(let z=0;z<day[x].ingredients.length;z++){
				$("table#ingredients"+x).append(`<td style="padding: 5px;"><img src='${day[x].ingredients[z].image}' data-toggle="tooltip" data-placement="top" title="${day[x].ingredients[z].name}" style='height: 55px;'></img></td>`);
			}
		}
	}
	//Cart.html
	var query = new CB.CloudQuery("order");
	query.find({
		success: function(listorder){
			console.log(listorder);
			var price = 0;
			for(let x=0;x<listorder.length;x++){
				price += parseInt(listorder[x].get("price"),10);
				$("tbody#order").append(`<tr id="${x}"><td></td><td>${listorder[x].get("food")}</td><td>$${listorder[x].get("price")}</td><td><button class="btn btn-primary" onclick="del(${x});">X</button></td></tr>`);
			}
			$("tbody#order").append(`<tr><th scope='row'>Total</th><td></td><td>$${price}</td></tr>`)
		},
		error: function(err){
			alert(err);
		}
	})
}

function buy(food){
	var food = eval(food);
	const item = new CB.CloudObject("order");
	let price = ""+food.price;
	item.set("food",food.name);
	item.set("price",price);
	item.save({
		success: function(obj){
			console.log("saved");
			length += 1;
			$("span#foods").html(length);
		},
		error: function(err){
			alert(err);
		}
	})
}

function del(item){
	var query = new CB.CloudQuery("order");
	query.find({
		success: function(list){
			var obj = list[item];
			console.log(obj);
			obj.delete({
				success: function(obj){
					console.log("deleted");
					$("tr#"+item).remove();
					location.reload();
				},
				error: function(err){
					alert(err);
				}
			})
		},
		error: function(err){
			alert(err);
		}
	})
}

$(function(){
  $('input#pickup').click(function(){
    if ($(this).is(':checked'))
    {
      console.log("pickup");
      $("p#input").html("");
      $("p#maparea").html("<div id='map'></div>");
      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGFucGFnIiwiYSI6ImNpdnlnaWwyeDAyNjUzMHBkNTV4eW54eWEifQ.-WXowLd6fVd8kF3O9pAPcw';
			var map = new mapboxgl.Map({
				container: 'map', // container id
				style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
				center: [-73.984874,40.744683], // starting position
				zoom: 14 // starting zoom
			});
			
			map.on('load', function () {
		    map.addSource("points", {
		        "type": "geojson",
		        "data": {
	            "type": "FeatureCollection",
	            "features": [{
	                "type": "Feature",
	                "geometry": {
	                    "type": "Point",
	                    "coordinates": [-73.984874,40.744683]
	                },
	                "properties": {
	                    "title": "Our Location",
	                    "icon": "monument"
	                }
	            }]
		        }
		    });

		    map.addLayer({
		        "id": "points",
		        "type": "symbol",
		        "source": "points",
		        "layout": {
		            "icon-image": "{icon}-15",
		            "text-field": "{title}",
		            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
		            "text-offset": [0, 0.6],
		            "text-anchor": "top"
		        }
		    });
		  });
  		$("p#maparea").append("<center><button class='btn btn-primary' onclick='finish();'>Finish order</button></center>");
    }
  });
});

$(function(){
  $('input#delivery').click(function(){
    if ($(this).is(':checked'))
    {
      console.log("delivery");
      $("p#maparea").html("");
      $("p#input").html("Your coordinates: (<input type='number' class='form-control' id='lat' placeholder='Latitude' style='width:200px; display: inline-block'></input>,<input type='number' class='form-control' id='long' placeholder='Longitude' style='width:200px; display: inline-block'></input>)&nbsp;&nbsp;<button class='btn btn-primary' onclick='deliverTo();'>Find</button><br><h6>Don't know your coordinates? Go <a href='http://www.latlong.net/convert-address-to-lat-long.html' target='_blank'>here</a> for an easy way to get your coordinates.</h6>");
    }
  });
});

function deliverTo() {
	var lat = $("input#lat").val();
	var long = $("input#long").val();
	$("p#maparea").html("<div id='map'></div>");
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGFucGFnIiwiYSI6ImNpdnlnaWwyeDAyNjUzMHBkNTV4eW54eWEifQ.-WXowLd6fVd8kF3O9pAPcw';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
		center: [long,lat], // starting position
		zoom: 14 // starting zoom
	});
	
	map.on('load', function () {
    map.addSource("points", {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [long,lat]
              },
              "properties": {
                  "title": "Your Location",
                  "icon": "monument"
              }
          }]
        }
    });

    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": "points",
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
  });
  $("p#maparea").append("<center><button class='btn btn-primary' onclick='finish();'>Finish order</button></center>");
}

function finish(){
	var query = new CB.CloudQuery("order");
	query.find({
		success: function(list){
			for(let x=0;x<list.length;x++){
				var item = list[x];
				item.delete({
					success: function(obj){
						console.log("deleted");
					},
					error: function(err){
						alert(err);
					}
				})
			}
			window.location.href = "Final_Project_in.html";
		},
		error: function(err){
			alert(err);
		}
	})
}