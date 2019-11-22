module.exports = (sequelize, DataTypes) => {
  return sequelize.define("postulation_transactions", {
    postulationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.UUID
    },
    payStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
};
