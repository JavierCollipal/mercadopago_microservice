const { sequelizeInstance, sequelizeLibrary } = require('./sequelize');
const { payment, users } = require('../models/index');

const paymentModel = payment(sequelizeInstance, sequelizeLibrary);
const userModel = users(sequelizeInstance, sequelizeLibrary);
module.exports = {
  paymentModel,
  userModel,
};


