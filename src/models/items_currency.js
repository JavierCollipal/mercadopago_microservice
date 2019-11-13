module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "items_currency",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
  );
};