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
