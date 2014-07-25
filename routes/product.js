var models = require('../models');



exports.create = function(request, response) {

  models.Product.create({ name: request.param('name'), 
  	sku: request.param('sku'), 
  	type: request.param('type'),
   	brand: request.param('brand'),
   	price: request.param('price'),
   	is_active: request.param('is_active'),
   	quantity: request.param('quantity'),
   	description: request.param('state')
   }).success(function() {
    response.redirect('/')
  })
}

exports.findAllTables = function(request, response){


  models.Place.findAll({where: {type: 'table'} }).success(function(result){

    response.send(result);
  });

};

exports.findTablesByName = function(request, response){

    models.Place.findAll({ 
      where: Sequalize.and(
        {type: 'table'},
        {name: params('name')}
         ).success(function(result){

    response.send(result);
      })
    });
};

exports.findAllBottles = function(request, response){
  
  models.Place.findAll({where: {type: 'bottle'} }).success(function(result){

    response.send(result);
  });

};

exports.findBottlesByName = function(request, response){
    models.Place.findAll({ 
      where: Sequalize.and(
        {type: 'bottle'},
        {name: params('name')}
         ).success(function(result){

    response.send(result);
    })
  });

};


