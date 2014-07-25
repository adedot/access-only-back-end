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

exports.findAllTablesByPlace = function(request, response){


  models.Product.findAll({where: Sequalize.and (
    {type: 'table'},
    {placeId:request.param('id')}
    )
    
     }).success(function(result){

    response.send(result);
  });

};

exports.findTablesByNameAndPlace = function(request, response){

    models.Product.findAll({ 
      where: Sequalize.and(
        {type: 'table'},
        {name: params('name')},
        {placeId:request.param('id')}
         ).success(function(result){

    response.send(result);
      })
    });
};

exports.findAllBottlesAndPlace = function(request, response){
  
  models.Product.findAll({where:
   Sequalize.and (
    {type: 'bottle'},
    {placeId:request.param('id')}
    )

  }).success(function(result){

    response.send(result);
  });

};

exports.findBottlesByNameAndPlace = function(request, response){
    models.Product.findAll({ 
      where: Sequalize.and(
        {type: 'bottle'},
        {name: params('name')},
        {placeId:request.param('id')}
         ).success(function(result){

    response.send(result);
    })
  });

};


