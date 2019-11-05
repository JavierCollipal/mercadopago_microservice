const {MercadoPago, defaultPreferenceMaker} = require("../config/mercadoPago/mercadoPago");

//hacer funcion aqui para exportarla
const items = [];
const preferences = defaultPreferenceMaker(items);
/*ESTA PARTE HACERLA PROMISE O VER SI EL THENABLE NOS DEVUELVE EL BODY.INIT*/
MercadoPago.preferences.create(preferences).then(resultado => {
    console.log(resultado.body.init_point);
});
