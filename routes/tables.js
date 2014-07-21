

exports.findAll = function(request, response){
	response.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.findById = function(request, response){

    response.send({id:request.params.id, name: "Table 1", description: "Boss Table", price: 200});

};


