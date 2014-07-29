// Access Orders from orders table
module.exports = function(sequelize, DataTypes) {
  var Order= sequelize.define('Order', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    contact_email: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
  tableName: 'orders', // this will define the table's name
	},
  {
    associate: function(models) {
      Order.hasMany(models.OrderItem);
      Order.belongsTo(models.User);
    }
  })

  return Order
}