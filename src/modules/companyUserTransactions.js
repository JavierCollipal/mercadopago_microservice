const { companyUserTransactionsModel } = require('../database/core');

function createTransaction(itemId, companyUserId, preferenceId, state) {
  return new Promise((resolve, reject) => {
    companyUserTransactionsModel
      .create({
        preferenceId,
        companyUserId,
        itemId,
        state,
      })
      .then((transaction) => {
        transaction.save();
        resolve(transaction.get({ plain: true }));
      })
      .catch((err) => reject(err));
  });
}

function findTransactionWithPreferenceId(preferenceId) {
  return new Promise((resolve, reject) => {
    companyUserTransactionsModel
      .findOne({
        where: { preferenceId },
      })
      .then((transaction) => {
        resolve(transaction.get({ plain: true }));
      })
      .catch((err) => reject(err));
  });
}

function updateTransactionState(id, paymentStatus) {
  companyUserTransactionsModel.update(
    { state: paymentStatus },
    { where: { id } },
  );
}

const companyUserTransactionModule = {
  createTransaction,
  findTransactionWithPreferenceId,
  updateTransactionState,
};

module.exports = Object.freeze(companyUserTransactionModule);
