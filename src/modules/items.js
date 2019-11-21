const { itemModel, itemCategoryModel, itemCurrencyModel } = require("../database/index");

const findOneById = itemId => {
  return new Promise((resolve, reject) => {
    itemModel
      .findByPk(itemId, { include: [itemCategoryModel, itemCurrencyModel] })
      .then(item => resolve(item.get({ plain: true })))
      .catch(err => reject(err));
  });
};

const itemModule = {
  findOneById
};

module.exports = Object.freeze(itemModule);
