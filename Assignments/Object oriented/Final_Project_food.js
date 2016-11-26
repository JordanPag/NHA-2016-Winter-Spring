CB.CloudApp.init('yegguroxoyua', '47345f24-5127-4318-abd3-b054fe11a2a2');

class food {
	constructor(ingredients,day,name,price,sides,codeName){
		this.ingredients = ingredients;
		this.day = day;
		this.name = name;
		this.price = price;
		this.sides = sides;
		this.codeName = codeName;
	}
}

var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
console.log(n);

//Saturday meals
const steak = new food([Steak,Pepper,Salt],"Saturday","Steak",17,[Broccoli,Rice_Pilaf],"steak");
const honeyMustardChicken = new food([Chicken,Honey,Mustard,Olive_Oil,Pepper],"Saturday","Honey Mustard Chicken",16,[Broccoli,Farro],"honeyMustardChicken");
const broccoliPie = new food([Broccoli,Cheddar_Cheese,Milk,Eggs,Onion_Powder,Salt,Pepper,Chicken,Bisquick],"Saturday","Broccoli Pie",12,"None","broccoliPie");
const chilli = new food([Ground_Beef,Bell_Peppers,Jalapeno_Peppers,Kidney_Beans,Onion,Chili_Powder,Cumin,Coriander,Salt,Pepper,Crushed_Tomatoes],"Saturday","Chilli",14,"None","chilli");
const Saturday = [steak,honeyMustardChicken,broccoliPie,chilli];

//Sunday meals
const stuffedShells = new food([],"Sunday","Stuffed Shells",1,[],"stuffedShells");
const chickenArabiata = new food([],"Sunday","Chicken Arabiata",1,[],"chickenArabiata");
const chickenParmesean = new food([],"Sunday","Chicken Parmesean",1,[],"chickenParmesean");
const Sunday = [stuffedShells,chickenArabiata,chickenParmesean];

//Monday meals
const tunaCasserole = new food([],"Monday","Tuna Casserole",1,[],"tunaCasserole");
const tilapia = new food([],"Monday","Tilapia",1,[],"tilapia");
const shrimp = new food([],"Monday","Shrimp and Pasta",1,[],"shrimp");
const salmon = new food([],"Monday","Salmon",1,[],"salmon");
const Monday = [tunaCasserole,tilapia,shrimp,salmon];

//Tuesday meals
const mostaccioli = new food([],"Tuesday","Mostaccioli",1,[],"mostaccioli");
const chineseChicken = new food([],"Tuesday","Chinese Chicken",1,[],"chineseChicken");
const whiskeyMostaccioli = new food([],"Tuesday","Whiskey Mostaccioli",1,[],"whiskeyMostaccioli");
const grilledPork = new food([],"Tuesday","Grilled Pork",1,[],"grilledPork");
const Tuesday = [mostaccioli,chineseChicken,whiskeyMostaccioli,grilledPork];

//Wednesday meals
const cheeseburgers = new food([],"Wednesday","Cheeseburgers",1,[],"cheeseburgers");
const porkSweetPotatoes = new food([],"Wednesday","Pork with Sweet Potatoes",1,[],"porkSweetPotatoes");
const lemonChicken = new food([],"Wednesday","Lemon Chicken",1,[],"lemonChicken");
const carbonara = new food([],"Wednesday","Spaghetti Carbonara",1,[],"carbonara");
const Wednesday = [cheeseburgers,porkSweetPotatoes,lemonChicken,carbonara];

//Thursday meals
const chickenPiccata = new food([Chicken,Lemon,Flour,White_Wine,Capers,Butter,Olive_Oil,Salt,Pepper],"Thursday","Chicken Piccata",16,[Risotto,Wax_Beans],"chickenPiccata");
const tacos = new food([Ground_Beef,Tortillas,Cheddar_Cheese,Yogurt,Taco_Sauce,Tomatoes,Lettuce],"Thursday","Tacos",12,"None","tacos");
const meatLoaf = new food([Ground_Beef,Ketchup,Bread_Crumbs,Eggs,Mustard_Powder,Salt,Pepper,Sage,Worcestershire_Sauce],"Thursday","Meat Loaf",14,[Rice_Pilaf,Green_Beans],"meatLoaf");
const stuffedChicken = new food([Chicken,Feta_Cheese,Spinach,Salt,Pepper,Butter],"Thursday","Stuffed Chicken",13,[Green_Beans],"stuffedChicken");
const Thursday = [chickenPiccata,tacos,meatLoaf,stuffedChicken];

//Friday meals -- CLOSED