const { Sequelize, DataTypes } = require('sequelize');

// Make sure our database persists hot reloads by polluting the global namespace
// Note if you make any changes to models in this file, you will need to restart dev server 

const isFirstConnection = !globalThis.sequelizeInstance;

const sequelize = globalThis.sequelizeInstance ||= new Sequelize('sqlite::memory:');

const Artist = sequelize.models.Artist || sequelize.define(
	'Artist',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		},
		label: {
			type: DataTypes.STRING
		}
	}
);

if (isFirstConnection) {
	sequelize.sync().then(async _ => {
		await Artist.create({
			name: "James Blunt",
			label: "Periscope"
		})
	})
}

module.exports = { sequelize, Artist }