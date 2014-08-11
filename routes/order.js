var models = require('../models');



// get all the orders
exports.getOrders = function(request, response) {

	models.Order.findAll().success(function(result){

    	response.send(result);
  });

}



// get orders for person
exports.getOrdersByUser = function(request, response) {

	 models.Order.findAll({ 
      where: 
        {userId:request.param('id')}
      }).success(function(result){

    response.send(result);
    });

}


// get orders for the a venue
exports.getOrdersByVenue = function(request, response) {

	models.Order.findAll({ 
      where: 
        {venueId:request.param('id')}
      }).success(function(result){

    response.send(result);
    });

}