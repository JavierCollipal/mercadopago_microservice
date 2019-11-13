module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "users_transactions",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      state: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
  );
};