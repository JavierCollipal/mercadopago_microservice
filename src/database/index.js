const { sequelizeInstance, sequelizeLibrary } = require("./sequelize");
const { companyUsers, users_transactions, items, items_categories, items_currency, posts } = require("./models/index");
/*models*/
const companyUserModel = companyUsers(sequelizeInstance, sequelizeLibrary);
const userTransactionsModel = users_transactions(sequelizeInstance, sequelizeLibrary);
const itemModel = items(sequelizeInstance, sequelizeLibrary);
const itemCategoryModel = items_categories(sequelizeInstance, sequelizeLibrary);
const itemCurrencyModel = items_currency(sequelizeInstance, sequelizeLibrary);
const postulationModel = posts(sequelizeInstance, sequelizeLibrary);
/*relations*/

userTransactionsModel.belongsTo(companyUserModel);
userTransactionsModel.belongsTo(itemModel);

itemModel.belongsTo(itemCategoryModel, {
  foreignKey: "categoryId",
});
itemModel.belongsTo(itemCurrencyModel, {
  foreignKey: "currencyId",
});

module.exports = {

  postulationModel,
  companyUserModel,
  userTransactionsModel,
  itemModel,
  itemCategoryModel,
  itemCurrencyModel,
};


