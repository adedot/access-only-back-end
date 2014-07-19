exports.findAll = function(req, res){
	res.send([{name:'John Sampson'}, {name:'Wayne Saunders'}]);
};

exports.findById = function(req, res){
	
    res.send({id:req.params.id, name: "Table 1", description: "Boss Table", price: 200});

};