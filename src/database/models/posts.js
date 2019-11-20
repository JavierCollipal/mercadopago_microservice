module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "posts",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      payStatus: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    },
  );
};