module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "items_currency",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.SERIAL,
      },
      name: {
        allowNull: false,
        type: DataTypes.VARCHAR,
      },
    },
  );
};