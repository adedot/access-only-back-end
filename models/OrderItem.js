// Access OrderItems
module.exports = function(sequelize, DataTypes) {
  var OrderItem= sequelize.define('OrderItem', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
  tableName: 'orderitems', // this will define the table's name
	},
  {
    associate: function(models) {
      OrderItem.belongsTo(models.Product);
      OrderItem.hasMany(models.Order);
    }
  },
  {
      instanceMethods: {
      total: function() {
        var total = this.quantity * this.price; 
        total = total.fixed(2);

        return total
      }
    }
  })

  return OrderItem
}