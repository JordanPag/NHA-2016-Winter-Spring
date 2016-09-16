var deck = "14xawc3po7sh"; //you can change this if the program doesn't work
var playerresult = 0;
var compchange = 0;
var comptotal = 0;
var compcard1image;
var compcardnum = 3;
var compunder16 = 0;
var compresult;
var total;
var change = 0;
var cardnum = 3;
$.ajax({
	type: "GET",
	url: "http://deckofcardsapi.com/api/deck/"+deck+"/shuffle/",
	success: (response) => {
		console.log(response);
	}
})
function start() {
	$.ajax({
		type: "GET",
		url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=2",
		success: (response) => {
			console.log(response);
			document.getElementById("x").innerHTML = "You have some cards now. ";
			document.getElementById("blank").setAttribute("src", "http://www.cheatersolitaire.com/Classic/RedBack.png");
			document.getElementById("1").setAttribute("src", response.cards[0].image);
			document.getElementById("2").setAttribute("src", response.cards[1].image);
			var card1val = response.cards[0].value;
			var card2val = response.cards[1].value;
			if (card1val==0||card1val=="JACK"||card1val=="QUEEN"||card1val=="KING"){
				card1val = 10;
			}
			if (card1val=="ACE"){
				card1val = 1;
				change = change + 1;
			}
			if (card2val==0||card2val=="JACK"||card2val=="QUEEN"||card2val=="KING"){
				card2val = 10;
			}
			if (card2val=="ACE"){
				card2val = 1;
				change = change + 1;
			}
			total = Number(card1val) + Number(card2val);
			if (change==0){
				document.getElementById("card-total").innerHTML = "Your card total is "+total;
			} else if (change==1){
				document.getElementById("card-total").innerHTML = "Your card total is "+total+" or "+(total+10);
			} else if (change==2){
				document.getElementById("card-total").innerHTML = "Your card total is "+total+" or "+(total+10)+" or "+(total+20);
			}
			document.getElementById("get").remove();
			document.getElementById("hitorstay").innerHTML = "Hit or stay?";

			//The first button (hit)
			var btn = document.createElement("BUTTON");
			var t = document.createTextNode("Hit");
			btn.appendChild(t);
			btn.setAttribute("onclick", "hit();");
			btn.setAttribute("id","hit");
			btn.setAttribute("class", "button2");
			document.getElementById("buttonplace").appendChild(btn);

			//The second button (stay)
			var btn2 = document.createElement("BUTTON");
			var t2 = document.createTextNode("Stay");
			btn2.appendChild(t2);
			btn2.setAttribute("onclick", "stay();");
			btn2.setAttribute("id","stay");
			btn2.setAttribute("class","button2");
			document.getElementById("buttonplace").appendChild(btn2);
		}
	})
}
function stay(){
	console.log("Stay was clicked");
	document.getElementById("stay").remove();
	document.getElementById("hit").remove();
	document.getElementById("hitorstay").innerHTML = "Please wait...";
	if (change>0){
		if (change>1){
			if ((total+20)>21){
				if (total+10>21){
					playerresult = total;
				} else {
					playerresult = total+10;
				}
			} else {
				playerresult = total + 20;
			}
		} else {
			if (total+10>21){
				playerresult = total;
			} else {
				playerresult = total+10;
			}
		}
	} else {
		playerresult = total;
	}
	console.log("Playerresult is "+playerresult);
	$.ajax({
		type: "GET",
		url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=2",
		success: (response) => {
			console.log(response);
			document.getElementById("comp1").setAttribute("src","http://www.cheatersolitaire.com/Classic/RedBack.png");
			document.getElementById("comp2").setAttribute("src",response.cards[1].image);
			compcard1val = response.cards[0].value;
			compcard2val = response.cards[1].value;
			compcard1image = response.cards[0].image
			if (compcard1val==0||compcard1val=="JACK"||compcard1val=="QUEEN"||compcard1val=="KING"){
				compcard1val=10;
			}
			if (compcard1val=="ACE"){
				compcard1val=1;
				compchange= compchange + 1;
			}
			if (compcard2val==0||compcard2val=="JACK"||compcard2val=="QUEEN"||compcard2val=="KING"){
				compcard2val=10;
			}
			if (compcard2val=="ACE"){
				compcard2val=1;
				compchange= compchange + 1;
			}
			comptotal = Number(compcard1val) + Number(compcard2val);
			console.log(comptotal);
			sleep(1000);
			//this repeats 8 times
			//one...
			if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
				endish();
			} else {
				$.ajax({
					type: "GET",
					url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
					success: (response) => {
						console.log(response);
						var compcard = "comp" + compcardnum;
						document.getElementById(compcard).setAttribute("src",response.cards[0].image);
						compcardval = response.cards[0].value;
						if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
							compcardval = 10;
						}
						if (compcardval=="ACE"){
							compcardval = 1;
							compchange = compchange + 1;
						}
						comptotal = comptotal + Number(compcardval);
						compcardnum = compcardnum + 1;
						//two...
						if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
							endish();
						} else {
							$.ajax({
								type: "GET",
								url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
								success: (response) => {
									console.log(response);
									var compcard = "comp" + compcardnum;
									document.getElementById(compcard).setAttribute("src",response.cards[0].image);
									compcardval = response.cards[0].value;
									if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
										compcardval = 10;
									}
									if (compcardval=="ACE"){
										compcardval = 1;
										compchange = compchange + 1;
									}
									comptotal = comptotal + Number(compcardval);
									compcardnum = compcardnum + 1;
									//three...
									if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
										endish();
									} else {
										$.ajax({
											type: "GET",
											url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
											success: (response) => {
												console.log(response);
												var compcard = "comp" + compcardnum;
												document.getElementById(compcard).setAttribute("src",response.cards[0].image);
												compcardval = response.cards[0].value;
												if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
													compcardval = 10;
												}
												if (compcardval=="ACE"){
													compcardval = 1;
													compchange = compchange + 1;
												}
												comptotal = comptotal + Number(compcardval);
												compcardnum = compcardnum + 1;
												//four...
												if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
													endish();
												} else {
													$.ajax({
														type: "GET",
														url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
														success: (response) => {
															console.log(response);
															var compcard = "comp" + compcardnum;
															document.getElementById(compcard).setAttribute("src",response.cards[0].image);
															compcardval = response.cards[0].value;
															if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
																compcardval = 10;
															}
															if (compcardval=="ACE"){
																compcardval = 1;
																compchange = compchange + 1;
															}
															comptotal = comptotal + Number(compcardval);
															compcardnum = compcardnum + 1;
															//five...
															if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
																endish();
															} else {
																$.ajax({
																	type: "GET",
																	url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
																	success: (response) => {
																		console.log(response);
																		var compcard = "comp" + compcardnum;
																		document.getElementById(compcard).setAttribute("src",response.cards[0].image);
																		compcardval = response.cards[0].value;
																		if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
																			compcardval = 10;
																		}
																		if (compcardval=="ACE"){
																			compcardval = 1;
																			compchange = compchange + 1;
																		}
																		comptotal = comptotal + Number(compcardval);
																		compcardnum = compcardnum + 1;
																		//six...
																		if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
																			endish();
																		} else {
																			$.ajax({
																				type: "GET",
																				url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
																				success: (response) => {
																					console.log(response);
																					var compcard = "comp" + compcardnum;
																					document.getElementById(compcard).setAttribute("src",response.cards[0].image);
																					compcardval = response.cards[0].value;
																					if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
																						compcardval = 10;
																					}
																					if (compcardval=="ACE"){
																						compcardval = 1;
																						compchange = compchange + 1;
																					}
																					comptotal = comptotal + Number(compcardval);
																					compcardnum = compcardnum + 1;
																					//seven...
																					if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
																						endish();
																					} else {
																						$.ajax({
																							type: "GET",
																							url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
																							success: (response) => {
																								console.log(response);
																								var compcard = "comp" + compcardnum;
																								document.getElementById(compcard).setAttribute("src",response.cards[0].image);
																								compcardval = response.cards[0].value;
																								if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
																									compcardval = 10;
																								}
																								if (compcardval=="ACE"){
																									compcardval = 1;
																									compchange = compchange + 1;
																								}
																								comptotal = comptotal + Number(compcardval);
																								compcardnum = compcardnum + 1;
																								//eight!
																								if (comptotal>=16||((comptotal+10)>=16&&compchange>0)||((comptotal+20)>=16&&compchange>1)){
																									endish();
																								} else {
																									$.ajax({
																										type: "GET",
																										url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
																										success: (response) => {
																											console.log(response);
																											var compcard = "comp" + compcardnum;
																											document.getElementById(compcard).setAttribute("src",response.cards[0].image);
																											compcardval = response.cards[0].value;
																											if (compcardval==0||compcardval=="JACK"||compcardval=="QUEEN"||compcardval=="KING"){
																												compcardval = 10;
																											}
																											if (compcardval=="ACE"){
																												compcardval = 1;
																												compchange = compchange + 1;
																											}
																											comptotal = comptotal + Number(compcardval);
																											endish();
																										}
																									})
																								}
																							}
																						})
																					}
																				}
																			})
																		}
																	}
																})
															}
														}
													})
												}
											}
										})
									}
								}
							})
						}
					}
				})
			}
		}
	})
}
function hit(){
	console.log("Hit was clicked");
	$.ajax({
		type: "GET",
		url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
		success: (response) => {
			console.log(response);
			var image = response.cards[0].image;
			document.getElementById(cardnum).setAttribute("src",image);
			cardnum = cardnum+1;
			var value = response.cards[0].value;
			if (value==0||value=="KING"||value=="QUEEN"||value=="JACK"){
				value = 10;
			}
			if (value=="ACE"){
				value = 1;
				change = change + 1;
			}
			console.log(value);
			total = total + Number(value);
			console.log(total);
			var totalwithors="";
			var y = 0;
			while(y<(change+1)){
				if (y<(change+1)&&y>0){
					totalwithors = totalwithors+" or";
				}
				totalwithors = totalwithors+" "+String((total+(y*10)));
				y=y+1;
			}
			console.log(totalwithors);
			document.getElementById("card-total").innerHTML = "Your card total is"+totalwithors;
			if (total>21){
				setTimeout(function(){
					var thing2 = confirm("Busted! Play again?");
					if (thing2==true){
						location.reload();
					} else {
						throw new Error('This is not an error. This is just to abort javascript');
					}
				})
			}
		}
	})
}
function end(){
	console.log("compchange is "+compchange);
	if (compchange>0){
		if (compchange>1){
			if ((comptotal+20)>21){
				if (comptotal+10>21){
					compresult = comptotal;
				} else {
					compresult = comptotal+10;
				}
			} else {
				compresult = comptotal + 20;
			}
		} else {
			if (total+10>21){
				compresult = comptotal;
			} else {
				compresult = comptotal+10;
			}
		}
	} else {
		if (comptotal>21){
			compresult = 0;
		} else {
			compresult = comptotal;
		}
	}
	console.log("comptotal is "+comptotal);
	console.log("compresult is "+compresult);
	sleep(2000);
	document.getElementById("comp1").setAttribute("src",compcard1image);
	setTimeout(function(){
		if (compresult>playerresult){
			var thing4 = confirm("You lose! Play again?");
			if (thing4==true){
				location.reload();
			} else {
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		if (compresult<playerresult){
			var thing5 = confirm("You win! Play again?");
			if (thing5==true){
				location.reload();
			} else {
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		if (compresult==playerresult){
			var thing6 = confirm("You tied! Play again?");
			if (thing6==true){
				location.reload();
			} else {
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
	},1000)
}
function endish() {
	if ((comptotal+20)>=16&&compchange>1){
		if ((comptotal+20)>21){
			endishish();
		} else {
			end();
		}
	} else if ((comptotal+10)>=16&&compchange>0){
		if ((comptotal+10)>21){
			endish2();
		} else {
			end();
		}
	} else if (comptotal>=16){
		end();
	}
}
function endish2(){
	//this repeats 4 times
	//one...
	if (comptotal>=16){
		end();
	} else {
		$.ajax({
			type: "GET",
			url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
			success: (response) => {
				console.log(response);
				var compimage = response.cards[0].image;
				var compcard = "comp" + compcardnum;
				document.getElementById(compcard).setAttribute("src", compimage);
				var compcardval = response.cards[0].value;
				if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
					compcardval = 10;
				}
				if (compcardval=="ACE"){
					compcardval = 1;
					compchange = compchange + 1;
				}
				comptotal = comptotal + Number(compcardval);
				compcardnum = compcardnum + 1;
				//two...
				if (comptotal>=16){
					end();
				} else {
					$.ajax({
						type: "GET",
						url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
						success: (response) => {
							console.log(response);
							var compimage = response.cards[0].image;
							var compcard = "comp" + compcardnum;
							document.getElementById(compcard).setAttribute("src", compimage);
							var compcardval = response.cards[0].value;
							if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
								compcardval = 10;
							}
							if (compcardval=="ACE"){
								compcardval = 1;
								compchange = compchange + 1;
							}
							comptotal = comptotal + Number(compcardval);
							compcardnum = compcardnum + 1;
							//three...
							if (comptotal>=16){
								end();
							} else {
								$.ajax({
									type: "GET",
									url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
									success: (response) => {
										console.log(response);
										var compimage = response.cards[0].image;
										var compcard = "comp" + compcardnum;
										document.getElementById(compcard).setAttribute("src", compimage);
										var compcardval = response.cards[0].value;
										if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
											compcardval = 10;
										}
										if (compcardval=="ACE"){
											compcardval = 1;
											compchange = compchange + 1;
										}
										comptotal = comptotal + Number(compcardval);
										compcardnum = compcardnum + 1;
										//four!
										if (comptotal>=16){
											end();
										} else {
											$.ajax({
												type: "GET",
												url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
												success: (response) => {
													console.log(response);
													var compimage = response.cards[0].image;
													var compcard = "comp" + compcardnum;
													document.getElementById(compcard).setAttribute("src", compimage);
													var compcardval = response.cards[0].value;
													if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
														compcardval = 10;
													}
													if (compcardval=="ACE"){
														compcardval = 1;
														compchange = compchange + 1;
													}
													comptotal = comptotal + Number(compcardval);
													compcardnum = compcardnum + 1;
													end();
												}
											})
										}
									}
								})
							}
						}
					})
				}
			}
		})
	}
}
function endishish(){
	//This repeats 3 times
	//one...
	if ((comptotal+10)>=16){
		compchange = 1;
		endish();
	} else {
		$.ajax({
			type: "GET",
			url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
			success: (response) => {
				console.log(response);
				var compimage = response.cards[0].image;
				var compcard = "comp" + compcardnum;
				document.getElementById(compcard).setAttribute("src", compimage);
				var compcardval = response.cards[0].value;
				if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
					compcardval = 10;
				}
				if (compcardval=="ACE"){
					compcardval = 1;
					compchange = compchange + 1;
				}
				comptotal = comptotal + Number(compcardval);
				compcardnum = compcardnum + 1;
				//two...
				if ((comptotal+10)>=16){
					compchange = 1;
					endish();
				} else {
					$.ajax({
						type: "GET",
						url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
						success: (response) => {
							console.log(response);
							var compimage = response.cards[0].image;
							var compcard = "comp" + compcardnum;
							document.getElementById(compcard).setAttribute("src", compimage);
							var compcardval = response.cards[0].value;
							if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
								compcardval = 10;
							}
							if (compcardval=="ACE"){
								compcardval = 1;
								compchange = compchange + 1;
							}
							comptotal = comptotal + Number(compcardval);
							compcardnum = compcardnum + 1;
							//three!
							if ((comptotal+10)>=16){
								compchange = 1;
								endish();
							} else {
								$.ajax({
									type: "GET",
									url: "http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=1",
									success: (response) => {
										console.log(response);
										var compimage = response.cards[0].image;
										var compcard = "comp" + compcardnum;
										document.getElementById(compcard).setAttribute("src", compimage);
										var compcardval = response.cards[0].value;
										if (compcardval==0||compcardval=="KING"||compcardval=="QUEEN"||compcardval=="JACK"){
											compcardval = 10;
										}
										if (compcardval=="ACE"){
											compcardval = 1;
											compchange = compchange + 1;
										}
										comptotal = comptotal + Number(compcardval);
										compcardnum = compcardnum + 1;
										compchange = 1;
										endish();
									}
								})
							}
						}
					})
				}
			}
		})
	}
}
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
	console.log("Sleep")
}