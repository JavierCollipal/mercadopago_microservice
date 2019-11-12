create TABLE woorkit.items_categories (
    id SERIAL,
    name varchar NOT NULL
);
alter table woorkit.items_categories add CONSTRAINT items_categories_pool_pk PRIMARY KEY (id);