const payer = (
  name,
  surname,
  email,
  phone,
  identification,
  address,
  date_created,
) =>
  Object.freeze({
    name,
    surname,
    email,
    phone,
    identification,
    address,
    date_created,
  });
module.exports = payer;
