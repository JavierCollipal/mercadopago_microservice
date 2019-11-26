/* if your items design is different than a mercadopago item, you should use this function together with map. */
module.exports = (
  id,
  title,
  description,
  picture_url,
  category_id,
  currency_id,
  quantity,
  unit_price,
) =>
  Object.freeze({
    id,
    title,
    description,
    picture_url,
    category_id,
    quantity,
    currency_id,
    unit_price,
  });
