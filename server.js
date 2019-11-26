const app = require('./app');
const { server_port } = require('./src/config/security/dotenv');
const logger = require('./src/config/logger/pino');
const { candidatesUnlockChannel } = require('./src/amqp/candidatesUnlock');

candidatesUnlockChannel();

app.listen(server_port, () => {
  logger.info('MercadoPago microservice running in:', server_port);
});
