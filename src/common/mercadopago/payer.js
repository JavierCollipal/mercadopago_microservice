//if your user design is different than a mercadopago payer, you should use this function together with map.
module.exports = (name, surname, email, phone, identification, address, date_created) => Object.freeze({
  name,
  surname,
  email,
  phone,
  identification,
  address,
  date_created,
});