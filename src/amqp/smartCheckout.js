const { MercadoPago, defaultPreferenceMaker } = require("../config/mercadoPago/mercadoPago");
const itemsMaker = require("../common/mercadopago/items");
const onErr = require('../common/onErr');
//nest api job is getting all the items data so the microservice is only going to deal
//with mercadopago Items,Payer and Preferences interface.

const itemsHandler = (products) => itemsMaker(products);
const preferencesHandler = (items) => defaultPreferenceMaker(items);

const msgHandler = (msg) => {

};
/*ESTA PARTE HACERLA PROMISE O VER SI EL THENABLE NOS DEVUELVE EL BODY.INIT*/
MercadoPago.preferences.create(preferences).then(resultado => {
    console.log(resultado.body.init_point);
}).catch(onErr);
