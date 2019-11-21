const { postulationModel } = require("../database/index");
const  { logger } = require("../config/logger/pino");
const updatePostulationState = (postulationId, paymentStatus) => {
  logger.info("nuevo estado del pago en la postulacion: "+paymentStatus);
  postulationModel.update({ payStatus: paymentStatus }, { where: { id: postulationId } });
};

const postulationModule = {
  updatePostulationState
};

module.exports = Object.freeze(postulationModule);
