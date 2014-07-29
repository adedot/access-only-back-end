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


  // Create Postgres Client
  var client = new pg.Client(
  {

      user: cfg.username,
      password: cfg.password,
      database: cfg.database,
      host: cfg.uri,
      port: 5432

  });




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

  m.OrderItem.hasMany(m.Product);
  // m.OrderItem.hasMany(m.Order);

  m.CartItem.hasMany(m.Product);
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

      var venueName = "Rosebar";

      var dtNation = Venue.build({
          name: venueName,
          address: "1215 Connecticut Ave NW Washington,dc 20036",
          city: "Washington",
          state: "DC",
          description:""
      });

      // Use venue name to add bottles

      dtNation.save();

      var products = Product.build(
        {
          venueName: venueName,
          name: "Belvedere",
          price: 295


      });

      products.save();

         var stream = client.copyFrom("COPY products (name, type, price) FROM data/Products.csv WITH CSV HEADER");
      stream.on('close', function () {
        console.log("Data inserted sucessfully");
      });
      stream.end();

    }
  })





// export connection
module.exports.sequelize = sequelize;