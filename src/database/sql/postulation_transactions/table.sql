CREATE TABLE woorkit.postulation_transactions (
	postulationid int4 NULL,
	transactionid uuid NULL,
	paymentid uuid NULL,

);
ALTER TABLE woorkit.postulation_transactions RENAME COLUMN paymentid TO "paymentId";
ALTER TABLE woorkit.postulation_transactions RENAME COLUMN postulationid TO "postulationId";
ALTER TABLE woorkit.postulation_transactions RENAME COLUMN transactionid TO "transactionId";
ALTER TABLE woorkit.postulation_transactions ADD CONSTRAINT postulation_transactions_pk PRIMARY KEY ("transactionId","postulationId");
ALTER TABLE woorkit.postulation_transactions ADD CONSTRAINT postulation_transactions_fk FOREIGN KEY ("transactionId") REFERENCES woorkit.company_users_transactions(id);
ALTER TABLE woorkit.postulation_transactions ADD CONSTRAINT postulation_transactions_fk_1 FOREIGN KEY ("postulationId") REFERENCES woorkit.posts(id);
ALTER TABLE woorkit.postulation_transactions ADD paystatus int4 NOT NULL;
ALTER TABLE woorkit.postulation_transactions RENAME COLUMN paystatus TO "payStatus";
ALTER TABLE woorkit.postulation_transactions RENAME COLUMN "paymentId" TO "mercadopagoPayment";
ALTER TABLE woorkit.postulation_transactions RENAME COLUMN "mercadopagoPayment" TO "mercadoPagoPayment";



