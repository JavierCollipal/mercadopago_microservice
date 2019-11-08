const app = require('./app');
const { server_port } = require("./src/config/security/dotenv");
const { logger } = require("./src/config/logger/pino");
const { rpcChannel } = require("./src/amqp/smartCheckout");

rpcChannel();

app.listen(server_port, function(){
    logger.info('MercadoPago microservice running in:',server_port);
  });