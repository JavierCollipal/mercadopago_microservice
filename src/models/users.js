module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
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
      phone: {
        type: DataTypes.STRING,
        length: 15,
      },
      gender: {
        type: DataTypes.STRING,
        length: 1,
      },
      address: {
        type: DataTypes.STRING,
        length: 200,
      },
      birthDay: {
        type: DataTypes.DATE,

      },
      email: {
        type: DataTypes.STRING,
        length: 128,
      },
      rut: {
        type: DataTypes.STRING,
        length: 10,
      },
      nationality: {
        type: DataTypes.STRING,
        length: 50,
      },
      cellphone: {
        type: DataTypes.STRING,
        length: 15,
      },
      city: {
        type: DataTypes.STRING,

      },
      region: {
        type: DataTypes.STRING,

      },
      created_date: {
        type: DataTypes.DATE,

      },
    },
    {
      createdAt: false,
      updatedAt: false,
    },
  );
};