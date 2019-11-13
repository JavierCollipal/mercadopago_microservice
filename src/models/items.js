module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "items",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
      },
      state: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
  );
};