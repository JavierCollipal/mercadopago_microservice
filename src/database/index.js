const { sequelizeInstance, sequelizeLibrary } = require("../config/orm/sequelize");
const {
  companyUsers,
  companyUsersTransactions,
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
/*relations*/

companyUserTransactionsModel.belongsTo(companyUserModel);
companyUserTransactionsModel.belongsTo(itemModel);

itemModel.belongsTo(itemCategoryModel, {
  foreignKey: "categoryId"
});
itemModel.belongsTo(itemCurrencyModel, {
  foreignKey: "currencyId"
});

module.exports = {
  postulationModel,
  companyUserModel,
  companyUserTransactionsModel,
  itemModel,
  itemCategoryModel,
  itemCurrencyModel
};
