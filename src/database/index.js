const { sequelizeInstance, sequelizeLibrary } = require('./sequelize');
const { users, users_transactions, items, items_categories, items_currency} = require('../models/index');
/*models*/
const userModel = users(sequelizeInstance, sequelizeLibrary);
const userTransactionsModel = users_transactions(sequelizeInstance, sequelizeLibrary);
const itemModel = items(sequelizeInstance, sequelizeLibrary);
const itemCategoryModel = items_categories(sequelizeInstance, sequelizeLibrary);
const itemCurrencyModel = items_currency(sequelizeInstance, sequelizeLibrary);
/*relations*/
userTransactionsModel.belongsTo(userModel);
userTransactionsModel.belongsTo(itemModel);
itemModel.belongsTo(itemCategoryModel,{
  foreignKey:'categoryId'
});
itemModel.belongsTo(itemCurrencyModel,{
  foreignKey:'currencyId'
});

module.exports = {
  userModel,
  userTransactionsModel,
  itemModel,
  itemCategoryModel,
  itemCurrencyModel,
};


