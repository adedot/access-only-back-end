// Access Orders from orders table
module.exports = function(sequelize, DataTypes) {
  var Order= sequelize.define('Order', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    contact_name: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    status: DataTypes.STRING,
    total:DataTypes.DECIMAL,
  }, {
    tableName: 'orders', // this will define the table's name
	},
  {
    associate: function(models) {
      Order.hasMany(models.OrderItem);
      Order.belongsTo(models.User);
      Order.belongsTo(models.Venue);
    }
  },
  {
    getterMethods: {
      total: function() {
        var total = 0.0
        total = total.fixed(2);

        var order_items = models.this.__factory.associations['OrderItem.'].target.findAll({
            where: 
              {orderid:this.id}
        });
        for(item_count in order_items){
            total += order_items[item_count].total;
          }
        return total
      }
    }

  })

  return Order
}