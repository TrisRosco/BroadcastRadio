const { Sequelize, DataTypes } = require("sequelize");

// Make sure our database persists hot reloads by polluting the global namespace
// Note if you make any changes to models in this file, you will need to restart dev server

const isFirstConnection = !globalThis.sequelizeInstance;

const sequelize = (globalThis.sequelizeInstance ||= new Sequelize(
  "sqlite::memory:"
));

const Artist =
  sequelize.models.Artist ||
  sequelize.define("Artist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistImage: {
      type: DataTypes.STRING,
    },
  });

if (isFirstConnection) {
  sequelize.sync().then(async (_) => {
    await Artist.bulkCreate([
      {
        name: "James Blunt",
        label: "Periscope",
        description: "Some fella with a guitar",
        artistImage: "",
      },
      {
        name: "The Beatles",
        label: "Apple",
        description:
          "A bunch of guys from liverpool, they did okay. Pretty obscure though.",
        artistImage: "",
      },
      {
        name: "The Rolling Stones",
        label: "Decca",
        description:
          "Fun fact: They're not actually related to any rock formations.",
        artistImage: "",
      },
      {
        name: "Arianna Grande",
        label: "Republic",
        description: "Ironically, she's actually quite short.",
        artistImage: "",
      },
    ]);
  });
}

module.exports = { sequelize, Artist };
