var models = require('../models');

exports.create = function(request, response) {

  models.Venue.create({ name: request.param('name'), 
  	address: request.param('address'), 
  	city: request.param('city'),
   	state: request.param('state') }).success(function() {
    response.redirect('/')
  })
}

exports.findAllVenues = function(request, response) {
	models.Venue.findAll().success(function(result){

		response.send(result);
	});

}

exports.findByName = function(request, response) {

	models.Venue.findAll({where: {name: param('name')} }).success(function(result){

		response.send(result);
	});

}

