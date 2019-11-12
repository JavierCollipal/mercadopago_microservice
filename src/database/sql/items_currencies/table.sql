create TABLE woorkit.items_currency (
    id SERIAL,
    name varchar NOT NULL
);
alter table woorkit.items_currency add CONSTRAINT items_currency_pool_pk PRIMARY KEY (id);