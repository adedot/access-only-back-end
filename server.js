var express = require('express'),
    tables = require('./routes/tables');
    person = require('./routes/person')
 
var app = express();
app.use(express.urlencoded());
app.use(express.json()); 
 
app.get('/tables', tables.findAll);
app.get('/tables/:id', tables.findById);


app.post('/person/charge', person.charge)
 
app.listen(3000);
console.log('Listening on port 3000...');