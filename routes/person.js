// Balanced API Key
var balanced = require('balanced-official');

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

// Add credit charge
exports.charge = function(request, response){

	// get json data for uri and amount

	var data = JSON.stringify(request.body);

	// Get amount
	var amount = request.body['amount'];
	var token = request.body['uri']; 
	console.log(token);

	console.log(amount);

	response.send(balanced.get(token).debit({
    "appears_on_statement_as": "Statement text", 
    "amount": amount, 
    "description": "Some descriptive text for the debit in the dashboard"
	}));
}

