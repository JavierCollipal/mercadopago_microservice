const items = (
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
module.exports = items;
