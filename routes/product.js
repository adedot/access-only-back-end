var models = require('../models');



exports.create = function(request, response) {

  models.Product.create({ name: request.param('name'), 
  	sku: request.param('sku'), 
  	type: request.param('type'),
   	brand: request.param('brand'),
   	price: request.param('price'),
   	is_active: request.param('is_active'),
   	quantity: request.param('quantity'),
   	description: request.param('state'), 
   	placeId: request.param('placeId')
   }).success(function() {
    response.redirect('/')
  })
}


exports.findAllTables = function(request, response){
  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.findTablesById = function(request, response){

    response.send({id:request.params.id, name: "Table 1", description: "Boss Table", price: 200});

};

exports.findAllBottles = function(request, response){
  response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.findBottlesByName = function(request, response){

    response.send({id:request.params.id, name: "Table 1", description: "Boss Table", price: 200});

};


