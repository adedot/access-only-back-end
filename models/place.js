// Access Places from places table
module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
  tableName: 'places', // this will define the table's name
	},
  {
    associate: function(models) {
      Place.hasMany(models.Product)
    }
  })

  return Place
}