// Balanced API Key
var balanced = require('balanced-official');
// Get the project models
var models = require('../models');
// Create Restful Client
var Client = require('node-rest-client').Client;

// 'api_secret' => '4bde996ec2668ca9385b3e23019b29e0c121b960',
// 'api_key' => '8358dc3553eb2fdbdac88f8369fa03'

// :)

var options_auth={user:'8358dc3553eb2fdbdac88f8369fa03',
    password: '4bde996ec2668ca9385b3e23019b29e0c121b960'};

client = new Client(options_auth);

var crowdTiltBaseUrl = "https://api-sandbox.crowdtilt.com/v1/"

// Balanced API Key
var balanced = require('balanced-official');

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

// Login to get access
exports.login = function(request, response){

  var access_code = request.body['access_code'];

  console.log(access_code);

    switch (access_code) {
      case "HOWARD":
        
      case "DTNATION":
      case "DC":
        response.send({code:"OK"});
        break;
      default:
        response.send({code:"FAIL"});
        break;
    }
	
};


exports.findAllUsers = function(request, response){

  // Use rest client to make request to crowdtilt\

  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};


exports.findByName = function(request, response){
  
  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.findById= function(request, response){
  
  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.create = function(request, response) {

  var resource = "users";

  var crowdTiltResponse = sendCrowdTiltRequest(request.body, resource);

  	models.User.create({ 
  		firstname: request.body.user['firstname'], 
  		lastname: request.body.user['lastname'],
  		email: request.body.user['email'],
      phone: request.body.user.metadata['phone']
   	}).success(function() {
    response.redirect('/')
  });
}

exports.addCard = function(request, response){

  var resource = "users/"+request.params['id']+"/cards"

  // get card json
  var card_info = request.body;

  console.log(card_info);
  var crowdTiltResponse = sendCrowdTiltRequest(card_info, resource);

  response.send(crowdTiltResponse);

}

exports.addBank = function(request, response){


  var resource = "users/"+request.params['id']+"/banks"

  // get bank json
  var bank_info = request.body;

  console.log(bank_info);
  var crowdTiltResponse = sendCrowdTiltRequest(bank_info, resource);

  response.send(crowdTiltResponse);

}

var sendCrowdTiltRequest = function(request_data, resource){

  url = crowdTiltBaseUrl + resource;

  // set content-type header and data as json in args parameter
  var args = {
    data: request_data,
    headers:{"Content-Type": "application/json"} 
  };

  var response_data = client.post(url, args, function(data,response) {

    // console.log(response);

    return data;
  });

  return response_data;
}




