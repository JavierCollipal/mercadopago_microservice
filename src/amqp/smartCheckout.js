const {MercadoPago, defaultPreferenceMaker} = require("../config/mercadoPago/mercadoPago");
const itemsMaker = require("../common/mercadopago/items");
const onErr = require('../common/onErr');
//nest api job is getting all the items data so the microservice is only going to deal
//with mercadopago Items,Payer and Preferences interface.

const smartCheckoutHandler = (preferences) => {
    return new Promise(((resolve, reject) => {
        MercadoPago.preferences.create(preferences).then(result => resolve(result)).catch(e => reject(e))
    }));
};

const transactionHandler = (items , userId, preferenceId, state) => {
    console.log(items);
    console.log(userId);
    console.log(preferenceId);
    console.log(state);
};
const initPointHandler  = (initPoint) => initPoint;

const msgHandler = (msg) => {
    const message = JSON.parse(msg);
    const items = itemsMaker(message.products);
    const preferences = defaultPreferenceMaker(items);
    const responseFromMercadoPago = smartCheckoutHandler(preferences);
    responseFromMercadoPago
        .then(res => {
            transactionHandler(res.body.items, res.body.userId, res.body.id);
            return initPointHandler(res.body.init_point);
        })
        .catch(onErr)
};

/*ESTA PARTE HACERLA PROMISE O VER SI EL THENABLE NOS DEVUELVE EL BODY.INIT*/

