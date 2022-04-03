CREATE TABLE "users"
(
	"id" serial PRIMARY KEY,
	"login" VARCHAR(16) UNIQUE,
	"password" TEXT,
	"refreshToken" TEXT,
	"words" TEXT[]
);