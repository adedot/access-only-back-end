// Access Venues from Venues table
module.exports = function(sequelize, DataTypes) {
  var Venue = sequelize.define('Venue', {
  	 // autoIncrement can be used to create auto_incrementing integer columns
  	id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.STRING,
    dressCode: DataTypes.STRING
  }, {
  tableName: 'venues', // this will define the table's name
	},
  {
    associate: function(models) {
      Venue.hasMany(models.Product)
    }
  })

  return Venue
}

// Add Venue
