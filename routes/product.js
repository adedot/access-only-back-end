var models = require('../models');



exports.create = function(request, response) {

  models.Product.create({ name: request.param('name'), 
  	sku: request.body['sku'], 
  	type: request.body['type'],
   	brand: request.body['brand'],
   	price: request.body['price'],
   	is_active: request.body['is_active'],
   	quantity: request.body['quantity'],
   	description: request.body['state']
   }).success(function() {
    response.redirect('/')
  })
}

exports.findAllProducts = function(request, response){

  models.Product.findAll().success(function(result){

    response.send(result);
  });

};

exports.findProductsByVenueId = function(request, response){


    models.Product.findAll({ 
      where: 
        {venueId:request.param('id')}
      }).success(function(result){

    response.send(result);
    });
};

exports.findProductsByVenueName = function(request, response){



    models.Product.findAll({ 
      where: 
        {venueName:request.query['venuename']}
      }).success(function(result){

    response.send(result);
    });
};




