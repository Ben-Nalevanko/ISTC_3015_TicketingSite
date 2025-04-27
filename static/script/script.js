const host = "http://127.0.0.1:5000";
const registerEvent = document.getElementById("new-event-register");
const loginButton = document.getElementById("login-button")

function loadRegisterPage() {
	//update the page
	console.log("Registering new event");
	window.location.href="/serve-create-event.html";
}

function loadPurchasePage(){
	console.log("Buying new tickets");
	window.location.href="/purchase-page";
}
