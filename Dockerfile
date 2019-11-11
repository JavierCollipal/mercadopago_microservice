from node:10.14-alpine

RUN mkdir -p /usr/src/mercadopago_microservice
WORKDIR /usr/src/mercadopago_microservice

ENV RABBIT_HOST=35.238.179.150
ENV RABBIT_PORT=5672
ENV RABBITMQ_USERNAME=carlos@woorkit.cl
ENV RABBITMQ_PASSWORD=LD8K¿w8?1un?
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=10000
ENV SEQUELIZE_DIALECT=postgres
ENV LOG_LEVEL=info
ENV DEFAULT_QUEUE=
ENV MERCADOPAGO_SANDBOX_KEY=TEST-282590749164606-091019-c1abfebf7ba8356b9ce80bed09685374-16097895
ENV MERCADOPAGO_PRODUCTION_KEY=
ENV MERCADOPAGO_SUCCESS_URL=http://35.238.179.150/company/my-job-offer/1
ENV MERCADOPAGO_FAILURE_URL=http://35.238.179.150/company/my-job-offer/2
ENV MERCADOPAGO_PENDING_URL=http://35.238.179.150/company/my-job-offer/3
ENV MERCADOPAGO_NOTIFICATION_URL=http://35.238.179.150:10000/api/v1/payments/notifications

RUN apk --no-cache add --virtual builds-deps build-base python

COPY . .

RUN npm install

CMD ["npm", "start"]
