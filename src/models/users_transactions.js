module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "users_transactions",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      preferenceId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
  );
};