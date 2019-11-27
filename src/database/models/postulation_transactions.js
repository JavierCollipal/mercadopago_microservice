module.exports = (sequelize, DataTypes) =>
  sequelize.define('postulation_transactions', {
    postulationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    payStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.UUID,
    },
  });
