const { postulationModel } = require("../database/index");

const updatePostulationState = (postulationId, paymentStatus) => {
  postulationModel.update({ payStatus: paymentStatus }, { where: { id: postulationId } });
};

const postulationModule = {
  updatePostulationState
};

module.exports = Object.freeze(postulationModule);
