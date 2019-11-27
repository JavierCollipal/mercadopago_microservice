module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'companies_users',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 200,
      },
      lastName: {
        type: DataTypes.STRING,
        length: 200,
      },
      email: {
        type: DataTypes.STRING,
        length: 128,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    },
  );
