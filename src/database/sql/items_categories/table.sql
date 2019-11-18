create TABLE woorkit.items_categories (
    id SERIAL,
    name varchar NOT NULL
);
alter table woorkit.items_categories add CONSTRAINT items_categories_pool_pk PRIMARY KEY (id);
ALTER TABLE woorkit.items_categories ADD createdat date NULL;
ALTER TABLE woorkit.items_categories ADD updatedat date NULL;
ALTER TABLE woorkit.items_categories RENAME COLUMN createdat TO "createdAt";
ALTER TABLE woorkit.items_categories RENAME COLUMN updatedat TO "updatedAt";