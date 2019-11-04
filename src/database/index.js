const { sequelizeInstance, sequelizeLibrary } = require('./sequelize');
const { payment } = require('../models/index');

const paymentModel = payment(sequelizeInstance, sequelizeLibrary);

module.exports = { paymentModel };


