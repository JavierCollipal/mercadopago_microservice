const { sequelizeInstance, sequelizeLibrary } = require('./sequelize');
const { payment, users, users_transactions} = require('../models/index');

const paymentModel = payment(sequelizeInstance, sequelizeLibrary);
const userModel = users(sequelizeInstance, sequelizeLibrary);
const userTransactionsModel = users_transactions(sequelizeInstance, sequelizeLibrary);

userTransactionsModel.belongsTo(userModel);
module.exports = {
  paymentModel,
  userModel,
  userTransactionsModel,
};


