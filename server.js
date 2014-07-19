var express = require('express'),
    tables = require('./routes/tables');
 
var app = express();
 
app.get('/tables', tables.findAll);
app.get('/tables/:id', tables.findById);
 
app.listen(3000);
console.log('Listening on port 3000...');