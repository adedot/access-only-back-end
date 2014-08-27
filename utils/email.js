var nodemailer = require('nodemailer');
var premailer = require('premailer-api');


var emailReceipt = function(cartid, contact_name, contact_email, contact_phone, amount, venueName){

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'info@accesson.ly',
	        pass: 'Acce$$2014'
	    }
	});

		// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails
	var emailTemplate = '<html> \
	    <head> \
	      <title>Access Only Receipt: for ' + contact_name + '</title> \
	      <style type="text/css"> \
	        a { color: #336699; } \
	      </style> \
	    </head> \
	    <body> \
	        <p>Name: ' +  contact_name + ' </p> \
	        <p>Email: ' + contact_email +' </p> \
	        <p>Phone: ' + contact_phone + '</p>\
	        <p>Payment Sucessful in the amount of $' + amount + ' for ' +venueName +'</p> \
	    </body> \
	  <html>';


	var preparedEmail = premailer.prepare({html: emailTemplate }, function(err, email) {
  
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Access Only', // sender address
        to: contact_email, // list of receivers
        subject: 'Access Only Receipt: for ' + contact_name, // Subject line
        text: email.text, // plaintext body
        html: email.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });

});


};


// emailReceipt("11213", "Adetola Adewodu", "adetola.adewodu@gmail.com", "2022762392", "200.00", "Rose Bar");