module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "users_transactions",
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