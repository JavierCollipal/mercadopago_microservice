const {
  sequelizeInstance,
  SequelizeLibrary,
} = require('../config/orm/sequelize');
const {
  companyUsers,
  companyUsersTransactions,
  postulationTransactions,
  items,
  items_categories,
  items_currency,
  posts,
} = require('./models/index');
/* models */
const companyUserModel = companyUsers(sequelizeInstance, SequelizeLibrary);
const companyUserTransactionsModel = companyUsersTransactions(
  sequelizeInstance,
  SequelizeLibrary,
);

const itemModel = items(sequelizeInstance, SequelizeLibrary);
const itemCategoryModel = items_categories(sequelizeInstance, SequelizeLibrary);
const itemCurrencyModel = items_currency(sequelizeInstance, SequelizeLibrary);
const postulationModel = posts(sequelizeInstance, SequelizeLibrary);
const postulationTransactionModel = postulationTransactions(
  sequelizeInstance,
  SequelizeLibrary,
);
/* relations */

/* companyUser transaction */
companyUserTransactionsModel.belongsTo(companyUserModel, {
  foreignKey: 'companyUserId',
});
companyUserTransactionsModel.belongsTo(itemModel);
/* item */
itemModel.belongsTo(itemCategoryModel, {
  foreignKey: 'categoryId',
});
itemModel.belongsTo(itemCurrencyModel, {
  foreignKey: 'currencyId',
});
/* postulation */
postulationTransactionModel.belongsTo(postulationModel, {
  foreignKey: 'postulationId',
});
postulationTransactionModel.belongsTo(companyUserTransactionsModel, {
  foreignKey: 'transactionId',
});

module.exports = {
  postulationModel,
  companyUserModel,
  companyUserTransactionsModel,
  postulationTransactionModel,
  itemModel,
  itemCategoryModel,
  itemCurrencyModel,
};
