CREATE TABLE woorkit.company_users_transactions (
	id uuid NOT NULL,
	itemid int4 NOT NULL,
	companyuserid uuid NOT NULL,
	state int4 NOT NULL,
	CONSTRAINT users_transactions_fk FOREIGN KEY (companyuserid) REFERENCES woorkit.companies_users(id),
	CONSTRAINT users_transactions_fk_1 FOREIGN KEY (itemid) REFERENCES woorkit.items(id)
);

ALTER TABLE woorkit.users_transactions ADD CONSTRAINT users_transactions_fk_3 FOREIGN KEY ("companyUserId") REFERENCES woorkit.companies_users(id);
ALTER TABLE woorkit.users_transactions ADD CONSTRAINT users_transactions_pk PRIMARY KEY (id);
ALTER TABLE woorkit.users_transactions RENAME COLUMN itemid TO "itemId";
ALTER TABLE woorkit.users_transactions RENAME COLUMN userid TO "userId";

ALTER TABLE woorkit.users_transactions ADD createdat date NULL;
ALTER TABLE woorkit.users_transactions ADD updatedat date NULL;
ALTER TABLE woorkit.users_transactions RENAME COLUMN createdat TO "createdAt";
ALTER TABLE woorkit.users_transactions RENAME COLUMN updatedat TO "updatedAt";

ALTER TABLE woorkit.users_transactions ADD transactionid varchar NULL;
ALTER TABLE woorkit.users_transactions RENAME COLUMN transactionid TO "transactionId";
ALTER TABLE woorkit.users_transactions RENAME COLUMN "transactionId" TO "preferenceId";
