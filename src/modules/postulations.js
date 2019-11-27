const { postulationModel } = require('../database/core');
const Op = require('../utils/sequelize/op');

const updatePostulationState = (postulationId, paymentStatus) => {
  postulationModel.update(
    { payStatus: paymentStatus },
    { where: { id: postulationId } },
  );
};

const updateMultiplePostulationStates = (postulationIds, paymentStatus) => {
  postulationModel.update(
    { payStatus: paymentStatus },
    { where: { id: { [Op.in]: postulationIds } } },
  );
};

const postulationModule = {
  updatePostulationState,
  updateMultiplePostulationStates,
};

module.exports = Object.freeze(postulationModule);
