// Access User from users table
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING
  }, {
  tableName: 'users', // this will define the table's name
	}
	,
  {
    associate: function(models) {
      User.hasMany(models.Order)
    }
  })

  return User
}


