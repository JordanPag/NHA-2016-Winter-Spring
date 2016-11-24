CB.CloudApp.init('yegguroxoyua', '47345f24-5127-4318-abd3-b054fe11a2a2');

class customer{
	constructor(username,password){
		this.user = username;
		this.pass = password;
		console.log(this.pass);
		console.log(this.user);
	}

	signin() {
		var user = this.user;
		var pass = this.pass;
		var error = "no";
		var query = new CB.CloudQuery("customer");
		console.log(query);
		query.find({
			success: function(list){
				console.log(list);
				for(let x=0; x<list.length;x++){
					console.log(x);
					console.log(list[x].document.username);
					if(user==list[x].document.username){
						error="yes";
					}
				}
				if(error=="yes"){
					alert("Someone is already using that username!");
				} else {
					var object = new CB.CloudObject("customer");
					console.log(user);
					console.log(pass);
					object.set("username", user);
					object.set("password", pass);
					object.save({
						success: function(){
							console.log("saved");
							window.location.href = "Final_Project_in.html";
						},
						error: function(err) {
							alert(err+". Please try again.");
						}
					})
				}
			},
			error: function(err) {
				alert(err);
			}
		});
	}
}