const { companyUserModel } = require('../database/index');

const getUserData = (userId) =>
  new Promise((resolve, reject) => {
    companyUserModel
      .findByPk(userId)
      .then((user) => resolve(user.get({ plain: true })))
      .catch((err) => reject(err));
  });

const companyUserModule = {
  getUserData,
};

module.exports = Object.freeze(companyUserModule);
