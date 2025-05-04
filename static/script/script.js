const host = "http://127.0.0.1:5000";
const registerEvent = document.getElementById("new-event-register");
const loginButton = document.getElementById("login-button");

function loadPurchasePage(event_name){
	//save deep copy, no reference
	const formData =  new FormData();
	formData.append("event_name", event_name);
	fetch(host+"/buy_ticket", {
		method: "POST",
		body: formData,
	})
	.then(response => response.text())
	.then(data => {
		document.body.innerHTML = data;
	})
	.catch(error => {
		console.error("Error:", error);
	})
}

function loadLoginPage(){
	console.log("Loading Log in Page...");
	fetch(host+"/login", {
		method: "GET",
	})
}

function registerNewAccount(){
	const respondOutput = document.getElementById("register-response");
	const formData = new FormData();
	formData.append("username", document.getElementById("username").value);
	formData.append("password", document.getElementById("password").value);

	fetch(host+"/register", {
		method: "POST",
		body: formData,
	})
	.then(response => response.text())
	.then( data => {
		document.body.innerHTML = data;
	}
	)
	.catch(error => {
		console.error("Error: ", error);
	})
}

function logout(){
	console.log("Log out function");
	fetch(host+"/logout")
	.then(() => {
		window.location.href = "/login"; // manually redirect
	})
	.catch(error => {
		console.error("Error:", error);
	});
}

function login(){
	var formData = new FormData();
	formData.append("username", document.getElementById("username").value);
	formData.append("password", document.getElementById("password").value);
	fetch(host+"/login", {
		method: "POST",
		body: formData,
	})
	.then( response => response.text())
	.catch(error => {
		console.error("Error:", error);
	})

}

function addTicketDiv(){
	const ticketDiv = document.getElementById("ticketDiv");

	const newTicket = document.createElement("div");
	const ticketTbl = document.createElement("table");
	const tbody = document.createElement("tbody");
	const row = document.createElement("tr");

	const selectList = document.createElement("select");

	//var options = ["Select Ticket Type...", "Child		(Value)", "Adult		(Value)", "Veteran		(Value)"];
	//Dummy values
	var options = {
		"Child": 7,
		"Adult": 10,
		"Veteran": 7,
	}
	for (var key in options) {
		var option = document.createElement("option");
		option.value = key;
		option.text = key;
		selectList.appendChild(option);
	}
	ticketTbl.appendChild(selectList);
	newTicket.appendChild(selectList);
	ticketDiv.appendChild(newTicket);

}

function removeTicket(){
	const ticketDiv = document.getElementById("ticketDiv");
	ticketDiv.removeChild(ticketDiv.lastElementChild);
}
