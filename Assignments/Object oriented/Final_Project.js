CB.CloudApp.init('yegguroxoyua', '47345f24-5127-4318-abd3-b054fe11a2a2');

function signup() {
	let user = $("input#username").val();
	let pass = $("input#password").val();
	console.log(user);

	const cust = new customer(user,pass);
	cust.signin();
}