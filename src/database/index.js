const { sequelizeInstance, sequelizeLibrary } = require('./sequelize');
const { payment } = require('../models/index');
const { users } = require('../models/users');

const paymentModel = payment(sequelizeInstance, sequelizeLibrary);
const userModel = users(sequelizeInstance, sequelizeLibrary);
module.exports = {
  paymentModel,
  userModel
};


