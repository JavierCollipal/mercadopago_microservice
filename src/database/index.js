const { sequelizeInstance, sequelizeLibrary } = require("../config/orm/sequelize");
const {
  companyUsers,
  companyUsersTransactions,
  postulationTransactions,
  items,
  items_categories,
  items_currency,
  posts
} = require("./models/index");
/*models*/
const companyUserModel = companyUsers(sequelizeInstance, sequelizeLibrary);
const companyUserTransactionsModel = companyUsersTransactions(sequelizeInstance, sequelizeLibrary);

const itemModel = items(sequelizeInstance, sequelizeLibrary);
const itemCategoryModel = items_categories(sequelizeInstance, sequelizeLibrary);
const itemCurrencyModel = items_currency(sequelizeInstance, sequelizeLibrary);
const postulationModel = posts(sequelizeInstance, sequelizeLibrary);
const postulationTransactionModel = postulationTransactions(sequelizeInstance, sequelizeLibrary);
/*relations*/

/*companyUser transaction*/
companyUserTransactionsModel.belongsTo(companyUserModel);
companyUserTransactionsModel.belongsTo(itemModel);
/*item*/
itemModel.belongsTo(itemCategoryModel, {
  foreignKey: "categoryId"
});
itemModel.belongsTo(itemCurrencyModel, {
  foreignKey: "currencyId"
});
/*postulation*/
postulationTransactionModel.belongsTo(postulationModel, { foreignKey: "postulationId" });
postulationTransactionModel.belongsTo(companyUserTransactionsModel, {
  foreignKey: "transactionId"
});

module.exports = {
  postulationModel,
  companyUserModel,
  companyUserTransactionsModel,
  postulationTransactionModel,
  itemModel,
  itemCategoryModel,
  itemCurrencyModel
};
