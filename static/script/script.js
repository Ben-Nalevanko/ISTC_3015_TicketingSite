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