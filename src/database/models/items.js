module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "items",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      picture_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      unitPrice: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
  );
};