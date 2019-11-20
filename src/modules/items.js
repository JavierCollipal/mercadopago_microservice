const { itemModel, itemCategoryModel, itemCurrencyModel } = require("../database/index");

const itemModule = {
  findOneById(itemId) {
    return new Promise((resolve, reject) => {
      itemModel
        .findByPk(itemId, { include: [itemCategoryModel, itemCurrencyModel] })
        .then(item => resolve(item.get({ plain: true })))
        .catch(err => reject(err));
    });
  }
};

module.exports = Object.freeze(itemModule);
