// Packages
var express = require('express'),
    product = require('./routes/product'),
    user = require('./routes/user'),
 	place = require('./routes/place'),
 	http    = require('http'),
 	path    = require('path')
 	


var app = express();
// To post and get json data
app.use(express.json());
app.use(express.urlencoded());
app.set('models', require('./models')); 

// Place Resources
app.post('/places', place.create);
app.get('/places/',place.findAllPlaces);
app.get('/places?:name', place.findByName);

// Product resources
// Create a product
app.post('/products/', product.create);


// Get Products
app.get('/products/tables', product.findAllTables);
app.get('/products/tables?:name', product.findTablesByName);
app.get('/products/bottles', product.findAllBottles);
app.get('/products/bottles?:name', product.findBottlesByName);

// Create User
app.post('/user', user.create);
app.get('/users/', user.findAllUsers);
app.get('/user/:id', user.findById);

app.get('/user/?name', user.findByName);

// User Resources to make credit card charge
app.post('/user/charge', user.charge);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});




