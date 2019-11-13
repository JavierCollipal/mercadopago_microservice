CREATE TABLE woorkit.users_transactions (
	id uuid NOT NULL,
	itemid int4 NOT NULL,
	userid uuid NOT NULL,
	state int4 NOT NULL,
	CONSTRAINT users_transactions_fk FOREIGN KEY (userid) REFERENCES woorkit.users(id),
	CONSTRAINT users_transactions_fk_1 FOREIGN KEY (itemid) REFERENCES woorkit.items(id)
);

ALTER TABLE woorkit.users_transactions ADD CONSTRAINT users_transactions_pk PRIMARY KEY (id);
ALTER TABLE woorkit.users_transactions RENAME COLUMN itemid TO "itemId";
ALTER TABLE woorkit.users_transactions RENAME COLUMN userid TO "userId";
