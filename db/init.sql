CREATE TABLE "users"
(
	"id" serial PRIMARY KEY,
	"login" VARCHAR(16) UNIQUE,
	"password" TEXT,
	"url_avatar" TEXT,
	"words" TEXT[]
);