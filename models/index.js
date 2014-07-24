// var Sequelize = require('sequelize');
// var config    = require('config').database;  // we use node-config to handle environments

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
  'Place',
  'Product',
  'User',
  'Order', 
  'Guestlist'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// models.Place.sync({ force: true });
// models.Product.sync({ force: true });


// describe relationships
(function(m) {
  m.Product.belongsTo(m.Place);
  m.Place.hasMany(m.Product);
  m.Order.hasMany(m.Product);
  m.Order.belongsTo(m.User);
  m.Guestlist.hasMany(m.User);
  m.Guestlist.hasMany(m.Order);
  m.User.hasMany(m.Order);  
})(module.exports);

// This should occur after the models 
sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

// export connection
module.exports.sequelize = sequelize;