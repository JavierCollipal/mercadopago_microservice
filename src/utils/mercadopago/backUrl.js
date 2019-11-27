const backUrl = (success, failure, pending) =>
  Object.freeze({
    success,
    failure,
    pending,
  });

module.exports = backUrl;
