from node:10.14-alpine

RUN mkdir -p /usr/src/mercadopago_microservice
WORKDIR /usr/src/mercadopago_microservice

RUN apk --no-cache add --virtual builds-deps build-base python

COPY . .

RUN npm install

CMD ["npm", "start"]
