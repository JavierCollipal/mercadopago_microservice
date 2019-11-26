const { postulationModel } = require('../database/index');

function updatePostulationState(postulationId, paymentStatus) {
  postulationModel.update(
    { payStatus: paymentStatus },
    { where: { id: postulationId } },
  );
}
function updateMultiplePostulationStates(postulationIds, paymentStatus) {
  postulationModel.update(
    { payStatus: paymentStatus },
    { where: { [Op.in]: postulationIds } },
  );
}

const postulationModule = {
  updatePostulationState,
  updateMultiplePostulationStates,
};

module.exports = Object.freeze(postulationModule);
