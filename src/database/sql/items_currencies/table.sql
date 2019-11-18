create TABLE woorkit.items_currency (
    id SERIAL,
    name varchar NOT NULL
);
ALTER TABLE woorkit.items_currency add CONSTRAINT items_currency_pool_pk PRIMARY KEY (id);
ALTER TABLE woorkit.items_currency ADD createdat date NULL;
ALTER TABLE woorkit.items_currency ADD updatedat date NULL;
ALTER TABLE woorkit.items_currency RENAME COLUMN createdat TO "createdAt";
ALTER TABLE woorkit.items_currency RENAME COLUMN updatedat TO "updatedAt";