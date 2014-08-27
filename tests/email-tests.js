var nodemailer = require('nodemailer');
var premailer = require('premailer-api');

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
      <title>My Email</title> \
      <style type="text/css"> \
        a { color: #336699; } \
      </style> \
    </head> \
    <body> \
        <p>Name: {{order_info.name}} </p>\n \
        </p>Email: {{order_info.email}} </p>\n \
        </p>Phone: {{order_info.phone}} </p>\n \
        </p>Payment Sucessful in the amount of ${{order_info.amount}} for {{order_info.venueName}}</p> \
    </body> \
  <html>';

var preparedEmail = premailer.prepare({html: emailTemplate }, function(err, email) {
  
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Access Only', // sender address
        to: 'adetola.adewodu@gmail.com', // list of receivers
        subject: 'Access Only Receipt: for Adetola Adewodu', // Subject line
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





