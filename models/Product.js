// 
// id
// type = table, entry, bottle
// max. number of guests

// Access Products from Products table
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    type: DataTypes.STRING,
    brand: DataTypes.STRING,
    price:DataTypes.DECIMAL,
    is_active: DataTypes.BOOLEAN,
    is_featured: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    venueName: DataTypes.STRING
  }, {
  tableName: 'products', // this will define the table's name
	}
	,
  {
    associate: function(models) {
      Product.belongsTo(models.Venue);
    }
  })

  return Product
}