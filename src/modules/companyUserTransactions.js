const { companyUserTransactionsModel } = require('../database/index');

const createTransaction = (itemId, companyUserId, preferenceId, state) =>
  new Promise((resolve, reject) => {
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

const findTransactionWithPreferenceId = (preferenceId) =>
  new Promise((resolve, reject) => {
    companyUserTransactionsModel
      .findOne({
        where: { preferenceId },
      })
      .then((transaction) => {
        resolve(transaction.get({ plain: true }));
      })
      .catch((err) => reject(err));
  });

const updateTransactionState = (id, paymentStatus) => {
  companyUserTransactionsModel.update(
    { state: paymentStatus },
    { where: { id } },
  );
};

const companyUserTransactionModule = {
  createTransaction,
  findTransactionWithPreferenceId,
  updateTransactionState,
};

module.exports = Object.freeze(companyUserTransactionModule);
