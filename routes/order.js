var models = require('../models');

var util = require('util');


// get all the orders
exports.getOrders = function(request, response) {

	var sqlQuery = 'select * from orders join venues ON orders."venueId" = venues.id';

	console.log(sqlQuery);

	models.sequelize.query(sqlQuery).success(function(orders){

    	response.send(orders);
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


	var sqlQuery = 'select orders.*, venues.name, venues.address, venues.city, venues.state, venues.zipcode' +
					' from orders join venues ON orders."venueId" = venues.id where venues.id = %s';

	var venueId = request.param('id');

	if(typeof venueId != 'undefined'){
	// var escapedName = models.constructor.Utils.escape(venueId);

		var queryWithParams = util.format(sqlQuery, venueId);
		console.log(queryWithParams);

		models.sequelize.query(queryWithParams).success(function(orders){

			if(orders.length){

				response.send(orders);
			}else{

				var orders = [{"id":0,"contact_name":"n/a","contact_email":"na/a","contact_phone":"n/a","status":"n/a","total":"n/a","venueId":1,"userId":"n/a","guestlistId":"n/a","name":"n/a","address":"n/a","city":"n/a","state":"n/a"}];
			}
	    	
	    });
	}
	else{
		
		var orders = [{"id":0,"contact_name":"n/a","contact_email":"na/a","contact_phone":"n/a","status":"n/a","total":"n/a","venueId":1,"userId":"n/a","guestlistId":"n/a","name":"n/a","address":"n/a","city":"n/a","state":"n/a"}];
		response.send(orders);

	}	


}
