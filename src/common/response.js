const dataResponse = (data) => {
  return {
    data,
  };
};

const errorResponse = (error) => {
  return {
    error,
  };
};

module.exports = {
  dataResponse,
  errorResponse,
};