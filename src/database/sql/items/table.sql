create TABLE woorkit.items (
    id SERIAL,
    title varchar NOT NULL,
    description varchar NOT NULL,
    picture_url varchar,
    categoryId int4,
    quantity int4,
    currencyId int4,
    unitPrice int4
);
alter table woorkit.items add CONSTRAINT items_pool_pk PRIMARY KEY (id);
ALTER TABLE woorkit.items RENAME COLUMN categoryid TO "categoryId";
ALTER TABLE woorkit.items RENAME COLUMN currencyid TO "currencyId";
ALTER TABLE woorkit.items RENAME COLUMN unitprice TO "unitPrice";

ALTER TABLE woorkit.items ADD CONSTRAINT items_fk FOREIGN KEY ("categoryId") REFERENCES woorkit.items(id);
ALTER TABLE woorkit.items ADD CONSTRAINT items_fk_1 FOREIGN KEY ("currencyId") REFERENCES woorkit.items_currency(id);

ALTER TABLE woorkit.items ADD createdat date NULL;
ALTER TABLE woorkit.items ADD updatedat date NULL;
ALTER TABLE woorkit.items RENAME COLUMN createdat TO "createdAt";
ALTER TABLE woorkit.items RENAME COLUMN updatedat TO "updatedAt";
