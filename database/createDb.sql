CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"login" VARCHAR(75) NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.books" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"description" VARCHAR(500) NOT NULL,
	"number_of_pages" integer NOT NULL,
	"language_id" integer NOT NULL,
	"path" VARCHAR(500) NOT NULL UNIQUE,
	"downloads" integer NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.authors" (
	"id" serial NOT NULL,
	"firstname" VARCHAR(100) NOT NULL,
	"lastname" VARCHAR(100) NOT NULL,
	CONSTRAINT "authors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.books_authors" (
	"book_id" integer NOT NULL,
	"author_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.tags" (
	"id" serial NOT NULL,
	"name" serial(50) NOT NULL UNIQUE,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.books_tags" (
	"book_id" integer NOT NULL,
	"tag_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.languages" (
	"id" serial NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.books_users" (
	"book_id" integer NOT NULL,
	"user_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "books" ADD CONSTRAINT "books_fk0" FOREIGN KEY ("language_id") REFERENCES "languages"("id");


ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_fk0" FOREIGN KEY ("book_id") REFERENCES "books"("id");
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_fk1" FOREIGN KEY ("author_id") REFERENCES "authors"("id");


ALTER TABLE "books_tags" ADD CONSTRAINT "books_tags_fk0" FOREIGN KEY ("book_id") REFERENCES "books"("id");
ALTER TABLE "books_tags" ADD CONSTRAINT "books_tags_fk1" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");


ALTER TABLE "books_users" ADD CONSTRAINT "books_users_fk0" FOREIGN KEY ("book_id") REFERENCES "books"("id");
ALTER TABLE "books_users" ADD CONSTRAINT "books_users_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");









