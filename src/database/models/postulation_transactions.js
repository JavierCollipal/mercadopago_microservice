module.exports = (sequelize, DataTypes) => {
  return sequelize.define("postulation_transactions", {
    postulationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.UUID
    }
  });
};
