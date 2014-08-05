// var Sequelize = require('sequelize');
// var config    = require('config').database;  // we use node-config to handle environments

var pg = require('pg');

// initialize database connection
var Sequelize = require('sequelize')
  , cfg = require('../config')
  , sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, {
      host: cfg.uri, // localhost or other url
      dialect: "postgres", // or 'sqlite', 'mysql', 'mariadb'
      port:    5432, // or 3306 (for mysql),
      sync : {force:true}
    })


// load models
var models = [
  'Venue',
  'Product',
  'User',
  'Order', 
  'Guestlist',
  'CartItem',
  'OrderItem'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});


var Venue = sequelize.import(__dirname + '/Venue');
var Product = sequelize.import(__dirname + '/Product');
// describe relationships
(function(m) {
  m.Product.belongsTo(m.Venue, {foreignKey: 'venueName'});
  m.Venue.hasMany(m.Product);

  m.OrderItem.belongsTo(m.Product);
  m.CartItem.belongsTo(m.Product);

  // m.OrderItem.hasMany(m.Order);

  // m.CartItem.hasMany(m.Product);
  m.Product.hasMany(m.CartItem);
  m.Product.hasMany(m.OrderItem);
  m.Order.hasMany(m.OrderItem);
  m.Order.belongsTo(m.User);
  m.Guestlist.hasMany(m.User, {as: 'People', through: 'guestlist_people' });
  m.User.hasMany(m.Guestlist, {through: 'guestlist_people' });
  m.Guestlist.hasMany(m.Order);
  m.User.hasMany(m.Order);  

})(module.exports);

// This should occur after the models 
sequelize
  .sync({ force: true})
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')

    }
  })


// export connection
module.exports.sequelize = sequelize;