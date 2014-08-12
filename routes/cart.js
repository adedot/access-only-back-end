
var models = require('../models');

// Balanced API Key
var balanced = require('balanced-official');

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

// add product to cart
exports.addCartItem = function(request, response) {
	  
		// check if item is in the cart else create cart item
		  models.CartItem.findOrCreate({ 
		  	cartId: request.body['cartid'],
		  		quantity: request.body['quantity'],
		   		productId: request.body['productid']
		   }).success(function(cartItem) {
		    response.send(cartItem);
		  }).error(function(err, cartItem){

		  		// Update quantity
		  		models.CartItem.update({quantity: request.body['quantity'],},{cartId: request.body('cartid'),
		  		 	productId: request.body['productid']}
		  		 	)
		  		.success(function() {});
		  });

}

exports.updateCartItem = function(request, response){
	// Update quantity
	models.CartItem.update({quantity: request.body['quantity'],},{cartId: request.param['cartid'],
	 	productId: request.body['productid']}
	 	)
	.success(function() {});
}

exports.removeCartItem = function(request, response){
	// TODO
	// models.CartItem.delete();

}

// checkout cart
exports.checkout = function(request, response){

	// get token and amount
	var amount = parseInt(request.body['amount']) * 100;
	var token = request.body['uri']; 
	console.log(token);

	console.log(amount);

	var debit_transaction = balanced.get(token).debit({
    "appears_on_statement_as": "Statement text", 
    "amount": amount, 
    "description": "Some descriptive text for the debit in the dashboard"
	});

	// Check debit transaction 
	console.log("Cart id number is " + request.body['cartId']);

	// create order
	models.Order.create({
		venueId: request.body['venueId'],
		contact_name: request.body['name'],
		contact_email: request.body['email'],
    	contact_phone: request.body['phone'],
    	status: 'Submitted'
	}).success(function(order){

		// Get all the cart items for transaction/request 
		models.CartItem.findAll({
			where: 
        {cartId:request.body['cartId']}

		}).success(function(cartItems){

			// for each cart item
			for (item_count in cartItems){

				console.log("The cartItem is " + cartItems[item_count]);

				// create order item
				models.OrderItem.create({
					orderId: debit_transaction.debits[0].transaction_number,
					productId: cartItems[0].productId,
					quantity: 1, // Will change later
					price: amount // Need to add cartItems.price
				}).success(function(){

				});

			}
				
		});

	});

	response.send(debit_transaction);

}