
var models = require('../models');

// Balanced API Key
var balanced = require('balanced-official');

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

var email = require('../utils/email');

var nodemailer = require('nodemailer');
var premailer = require('premailer-api');


// add product to cart
exports.addCartItem = function(request, response) {
	  
		// check if item is in the cart else create cart item
		  models.CartItem.findOrCreate({ 
		  	cartId: request.body['cartId'],
		  		quantity: request.body['quantity'],
		   		productId: request.body['productId'], 
		   		price: request.body['price']
		   }).success(function(cartItem) {
		    response.send(cartItem);
		  }).error(function(err, cartItem){

		  		// Update quantity
		  		models.CartItem.update({quantity: request.body['quantity'],cartId: request.body['cartId'],
		  		 	productId: request.body['productId']})
		  		.success(function() {});
		  });

}

exports.updateCartItem = function(request, response){
	// Update quantity
	models.CartItem.update({quantity: request.body['quantity']},{cartId: request.param['cartid'],
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
	var amount = parseInt(request.body['amount']);
	var token = request.body['uri']; 
	var contact_name = request.body['name'];
	var contact_email =request.body['email'];
    var	contact_phone = request.body['phone'];
    var venueName = request.body['venueName'];

	var cartId = request.body['cartId'];
	
	console.log(token);

	console.log(amount);

	var debit_transaction = balanced.get(token).debit({
    "appears_on_statement_as": "Statement text", 
    "amount": amount * 100, 
    "description": "Some descriptive text for the debit in the dashboard"
	});

	// Check debit transaction 
	console.log("Cart id number is " + cartId );


	// create order
	models.Order.create({
		venueId: request.body['venueId'],
		transactionId: cartId,
		contact_name: contact_name,
		contact_email: contact_email,
    	contact_phone: contact_phone,
    	status: 'Submitted',
    	total: amount
	}).success(function(order){

		// Get all the cart items for transaction/request 
		models.CartItem.findAll({
			where: 
        {cartId:request.body['cartId']}

		}).success(function(cartItems){

			createOrderItems(cartItems, order);
			email(cartId, contact_name, contact_email, contact_phone, amount, venueName);
				
		});

	});

	response.send(debit_transaction);

}

var createOrderItems = function(cartItems, order, amount){


	// for each cart item
	for (item_count in cartItems){


		console.log("The cartItem is " + cartItems[item_count]);

		// create order item
		models.OrderItem.create({
			orderId: order.id,
			productId: cartItems[0].productId,
			quantity: 1, // Will change later
			price: amount, // Need to add cartItems.price
			// total: amount // will need to get quantity * amount from cart item later
		}).success(function(){
			console.log("Order Item created");
		});

	}

}

// var emailReceipt = function(cartid, contact_name, contact_email, contact_phone, amount, venueName){

// 	// create reusable transporter object using SMTP transport
// 	var transporter = nodemailer.createTransport({
// 	    service: 'gmail',
// 	    auth: {
// 	        user: 'info@accesson.ly',
// 	        pass: 'Acce$$2014'
// 	    }
// 	});

// 		// NB! No need to recreate the transporter object. You can use
// 	// the same transporter object for all e-mails
// 	var emailTemplate = '<html> \
// 	    <head> \
// 	      <title>Access Only Receipt: for ' + contact_name + '</title> \
// 	      <style type="text/css"> \
// 	        a { color: #336699; } \
// 	      </style> \
// 	    </head> \
// 	    <body> \
// 	        <p>Name: ' +  contact_name + ' </p> \
// 	        <p>Email: ' + contact_email +' </p> \
// 	        <p>Phone: ' + contact_phone + '</p>\
// 	        <p>Payment Sucessful in the amount of $' + amount + ' for ' +venueName +'</p> \
// 	    </body> \
// 	  <html>';


// 	var preparedEmail = premailer.prepare({html: emailTemplate }, function(err, email) {
  
//     // setup e-mail data with unicode symbols
//     var mailOptions = {
//         from: 'Access Only', // sender address
//         to: contact_email, // list of receivers
//         subject: 'Access Only Receipt: for ' + contact_name, // Subject line
//         text: email.text, // plaintext body
//         html: email.html // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Message sent: ' + info.response);
//         }
//     });

// });


// };


