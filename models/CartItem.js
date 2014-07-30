// Access OrderItems
module.exports = function(sequelize, DataTypes) {
  var CartItem= sequelize.define('CartItem', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	cartId: { type: DataTypes.INTEGER, primaryKey: true},
    productId:{ type: DataTypes.INTEGER, primaryKey: true},
    quantity: DataTypes.INTEGER
  }, {
  tableName: 'cartitems', // this will define the table's name
	}
  // ,
  // {
  //   associate: function(models) {
  //     CartItem.hasMany(models.Product);
      
  //   }
  // }
  )

  return CartItem
}