// Access OrderItems
module.exports = function(sequelize, DataTypes) {
  var OrderItem= sequelize.define('OrderItem', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    price: DataTypes.FLOAT
  }, {
  tableName: 'orderitems', // this will define the table's name
	},
  {
    associate: function(models) {
      OrderItem.belongsTo(models.Product);
      OrderItem.hasMany(models.Order);
    }
  })

  return OrderItem
}