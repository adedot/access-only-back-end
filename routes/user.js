// Balanced API Key
var balanced = require('balanced-official');
// Get the project models
var models = require('../models');

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

// Add credit charge
exports.charge = function(request, response){

	// Get amount
	var amount = request.body['amount'];
	var token = request.body['uri']; 
	console.log(token);

	console.log(amount);


	// Will need to use crowdtilt 
	response.send(balanced.get(token).debit({
    "appears_on_statement_as": "Statement text", 
    "amount": amount, 
    "description": "Some descriptive text for the debit in the dashboard"
	}));
};


exports.findAllUsers = function(request, response){

  // Use rest client to make request to crowdtilt

  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};


exports.findByName = function(request, response){
  
  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.findById= function(request, response){
  
  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.create = function(request, response) {

  	// console.log(request.param('name'));
  	
  	models.User.create({ 
  		first_name: request.param('first_name'), 
  		last_name: request.param('last_name'),
  		email: request.param('email'),
   		phone: request.param('phone') 
   	}).success(function() {
    response.redirect('/')
  })
}



