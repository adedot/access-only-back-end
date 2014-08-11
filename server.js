// Packages
var express = require('express'),
    product = require('./routes/product'),
    user = require('./routes/user'),
 	venue = require('./routes/venue'),
 	cart = require('./routes/cart'),
 	order = require('./routes/order')
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
app.get('/venues/:id', venue.findById);

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
app.get('/venues/products/:id', product.findProductsByVenueId);

// Get orders
app.get('/orders', order.getOrders);
app.get('/users/orders/:id', order.getOrdersByUser);
app.get('/venues/orders/:id', order.getOrdersByVenue);

// Create User
app.post('/user', user.create); 

app.get('/users/', user.findAllUsers);
app.get('/users/:id', user.findById);
app.get('/users/?name', user.findByName);
// app.get('/venues/users/:id'); TODO 

// User Resources to add bank
app.post('/user/:id/banks', user.addBank);

// User Resources to add and charge credit card
app.post('/user/:id/cards', user.addCard);
app.post('/user/charge', user.charge);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});





