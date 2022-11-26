CREATE TABLE "public.Users" (
	"id" serial NOT NULL,
	"login" VARCHAR(75) NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Books" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"description" VARCHAR(500) NOT NULL,
	"number_of_pages" integer NOT NULL,
	"language_id" integer NOT NULL,
	"path" VARCHAR(500) NOT NULL UNIQUE,
	"downloads" integer NOT NULL,
	CONSTRAINT "Books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Authors" (
	"id" serial NOT NULL,
	"firstname" VARCHAR(100) NOT NULL,
	"lastname" VARCHAR(100) NOT NULL,
	CONSTRAINT "Authors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Books_Authors" (
	"book_id" integer NOT NULL,
	"author_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Tags" (
	"id" serial NOT NULL,
	"name" serial(50) NOT NULL UNIQUE,
	CONSTRAINT "Tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Books_Tags" (
	"book_id" integer NOT NULL,
	"tag_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Languages" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "Languages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Books_Users" (
	"book_id" integer NOT NULL,
	"user_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Books" ADD CONSTRAINT "Books_fk0" FOREIGN KEY ("language_id") REFERENCES "Languages"("id");


ALTER TABLE "Books_Authors" ADD CONSTRAINT "Books_Authors_fk0" FOREIGN KEY ("book_id") REFERENCES "Books"("id");
ALTER TABLE "Books_Authors" ADD CONSTRAINT "Books_Authors_fk1" FOREIGN KEY ("author_id") REFERENCES "Authors"("id");


ALTER TABLE "Books_Tags" ADD CONSTRAINT "Books_Tags_fk0" FOREIGN KEY ("book_id") REFERENCES "Books"("id");
ALTER TABLE "Books_Tags" ADD CONSTRAINT "Books_Tags_fk1" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id");


ALTER TABLE "Books_Users" ADD CONSTRAINT "Books_Users_fk0" FOREIGN KEY ("book_id") REFERENCES "Books"("id");
ALTER TABLE "Books_Users" ADD CONSTRAINT "Books_Users_fk1" FOREIGN KEY ("user_id") REFERENCES "Users"("id");









