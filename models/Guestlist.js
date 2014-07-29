// Access Guestlist from orders table
module.exports = function(sequelize, DataTypes) {
  var Guestlist = sequelize.define('Guestlist', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    contact_email: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
  tableName: 'guestlist', // this will define the table's name
	},
  {
    associate: function(models) {
      Guestlist.hasMany(models.User, {as: 'People'});
      Guestlist.hasMany(models.Order);
    }
  })

  return Guestlist
}