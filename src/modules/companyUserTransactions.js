const { companyUserTransactionsModel } = require("../database/index");

const createTransaction = (itemId, companyUserId, preferenceId, state) => {
  return new Promise((resolve, reject) => {
    companyUserTransactionsModel
      .create({
        preferenceId,
        companyUserId,
        itemId,
        state
      })
      .then(transaction => {
        transaction.save();
        resolve(transaction.get({ plain: true }));
      })
      .catch(err => reject(err));
  });
};

const findTransactionWithPreferenceId = preferenceId => {
  return new Promise((resolve, reject) => {
    companyUserTransactionsModel
      .findOne({
        where: { preferenceId: preferenceId }
      })
      .then(transaction => {
        resolve(transaction.get({ plain: true }));
      })
      .catch(err => reject(err));
  });
};

const updateTransactionState = (id, paymentStatus) => {
  companyUserTransactionsModel.update({ state: paymentStatus }, { where: { id: id } });
};

const companyUserTransactionModule = {
  createTransaction,
  findTransactionWithPreferenceId,
  updateTransactionState
};

module.exports = Object.freeze(companyUserTransactionModule);
