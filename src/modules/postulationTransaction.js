const { postulationTransactionModel } = require('../database/core');
const onErr = require('../utils/onErr');
const Op = require('../utils/sequelize/op');

const createTransaction = (postulationId, transactionId, payStatus) => {
  postulationTransactionModel
    .create({
      postulationId,
      transactionId,
      payStatus,
    })
    .then((transaction) => transaction.save())
    .catch(onErr);
};

const updateTransactionState = (transactionId, payStatus) => {
  postulationTransactionModel.update(
    { payStatus },
    {
      where: { transactionId },
    },
  );
};

const findByPostulationId = (postulationId) => {
  postulationTransactionModel
    .findOne({
      where: { postulationId },
    })
    .then((transaction) => transaction.get({ plain: true }))
    .catch((err) => err);
};

const filterPostulationIds = (postulationTransactions) =>
  postulationTransactions.map((postulation) => postulation.postulationId);

const findByMultiplePaymentIds = (paymentIds) =>
  new Promise((resolve, reject) => {
    postulationTransactionModel
      .findAll(
        { raw: true },
        {
          where: { paymentId: { [Op.in]: paymentIds } },
        },
      )
      .then((transactions) => resolve(transactions))
      .catch((err) => reject(err));
  });

const postulationTransactionModule = {
  createTransaction,
  findByPostulationId,
  updateTransactionState,
  findByMultiplePaymentIds,
  filterPostulationIds,
};

module.exports = Object.freeze(postulationTransactionModule);
