const onErr = require("../../common/onErr");
const { logger } = require("../logger/pino");
const {
  rabbit_username,
  rabbit_password,
  rabbit_host,
  rabbit_port,
} = require("../security/dotenv");

const connectionParams = {
  protocol: "amqp",
  hostname: rabbit_host,
  port: rabbit_port,
  username: rabbit_username,
  password: rabbit_password,
};
//We make the connection only one time
//Remember to never close the rabbit connection in prod.
const open = require("amqplib")
  .connect(connectionParams)
  .catch(onErr);

const createChannel = () => {
  return open.then(conn => {
    return conn.createChannel();
  });
};
logger.info("Ampq connected");
module.exports = { createChannel };