const dataResponse = (data) =>
  Object.freeze({
    data,
  });

const errorResponse = (error) =>
  Object.freeze({
    error,
  });

module.exports = {
  dataResponse,
  errorResponse,
};
