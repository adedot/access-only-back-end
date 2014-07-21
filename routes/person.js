// Balanced API Key
var balanced = require('balanced-official');

var bodyParser = require('body-parser')

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

// Add credit charge
exports.chargePerson = function(request, response){

	// get json data for uri and amount

	// Get amount
	var amount = 1000;
	var token = ""; // card's href/token
	// Get token

	balanced.get(token).debit({
    "appears_on_statement_as": "Statement text", 
    "amount": amount, 
    "description": "Some descriptive text for the debit in the dashboard"
	});






}



// split payment function