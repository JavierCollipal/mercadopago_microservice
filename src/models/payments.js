module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cat',
    {
      state: {
        type: DataTypes.STRING,
        field: 'state',
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
  );
};