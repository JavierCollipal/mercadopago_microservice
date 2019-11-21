const { companyUserTransactionsModel } = require("../database/index");
const onErr = require("../common/onErr");

const createTransaction = (itemId, companyUserId, preferenceId, state) => {
  companyUserTransactionsModel
    .create({
      preferenceId,
      companyUserId,
      itemId,
      state
    })
    .then(transaction => transaction.save())
    .catch(onErr);
};

const findTransactionWithPreferenceId = preferenceId => {
  return new Promise((resolve, reject) => {
    companyUserTransactionsModel
      .findOne({
        where: preferenceId
      })
      .then(transaction => {
        resolve(transaction.get({ plain: true }));
      })
      .catch(err => reject(err));
  });
};

const updateTransactionState = (preferenceId, paymentStatus) => {
  companyUserTransactionsModel.update(
    { state: paymentStatus },
    { where: { preferenceId: preferenceId } }
  );
};

const companyUserTransactionModule = {
  createTransaction,
  findTransactionWithPreferenceId,
  updateTransactionState
};

module.exports = Object.freeze(companyUserTransactionModule);
