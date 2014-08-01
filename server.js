// Packages
var express = require('express'),
    product = require('./routes/product'),
    user = require('./routes/user'),
 	venue = require('./routes/venue'),
 	cart = require('./routes/cart'),
 	http    = require('http'),
 	path    = require('path'),
 	models = require('./models')
 	


var app = express();
// To post and get json data
app.use(express.json());
app.use(express.urlencoded());

// This is for cross site requests from other applications
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if ('OPTIONS' == req.method){
        return res.send(200);
    }
    next();
});

app.set('models', require('./models')); 

// venue Resources
app.post('/venues', venue.create);

app.get('/venues',venue.findAllVenues);
app.get('/venues?:name', venue.findByName);

// Product resources
// Create a product
app.post('/venues/:id/products/', product.create);

// Add product/item to cart
app.post('/cart/additem', cart.addCartItem);
// Check out 
app.post('/cart/checkout', cart.checkout);

// Get products
app.get('/products', product.findAllProducts);
app.get('/venues/products?:venuename', product.findProductsByVenueName);


// Create User
app.post('/user', user.create); 

app.get('/users/', user.findAllUsers);
app.get('/user/:id', user.findById);
app.get('/user/?name', user.findByName);

// User Resources to add bank
app.post('/user/:id/banks', user.addBank);

// User Resources to add and charge credit card
app.post('/user/:id/cards', user.addCard);
app.post('/user/charge', user.charge);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});





