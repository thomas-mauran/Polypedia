CREATE TABLE "users" (
	"id" serial NOT NULL,
	"login" VARCHAR(75) NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "books" (
	"id" serial NOT NULL,
	"title" VARCHAR(255) NOT NULL,
	"description" VARCHAR(500) NOT NULL,
	"number_of_pages" integer NOT NULL,
	"language_id" integer NOT NULL,
	"number_of_likes" integer NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "authors" (
	"id" serial NOT NULL,
	"fullname" VARCHAR(100) NOT NULL UNIQUE,
	CONSTRAINT "authors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "books_authors" (
	"book_id" integer NOT NULL,
	"author_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"name" VARCHAR(50) NOT NULL UNIQUE,
	"description" VARCHAR(500) NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "books_tags" (
	"book_id" integer NOT NULL,
	"tag_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "languages" (
	"id" serial NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "books_users" (
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




-- TRIGGERS

-- trigger to add a like to the books counter when inserting on user_books


CREATE OR REPLACE FUNCTION increment_likes_function()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE books
  SET number_of_likes = number_of_likes + 1
  WHERE id = NEW.book_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_likes
AFTER INSERT ON books_users
FOR EACH ROW
EXECUTE PROCEDURE increment_likes_function();


-- trigger to decrement likest on a books counter when inserting on user_books

CREATE OR REPLACE FUNCTION decrement_likes_function()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE books
  SET number_of_likes = number_of_likes - 1
  WHERE id = OLD.book_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_likes
AFTER DELETE ON books_users
FOR EACH ROW
EXECUTE PROCEDURE decrement_likes_function();

-- Default User admin
-- login : admin
-- email: admin@admin.com
-- password : admin
 
INSERT INTO users(login, email, "password", is_admin)VALUES('admin', 'admin@admin.com', '$2b$10$y25zy37aMWarlzyN8wPKLesjtPs0fXDr.HFugzsgR1/aXC/94G8ei', true);


-- Authors 

INSERT INTO authors ("fullname") VALUES ('Fyodor Dostoevsky');
INSERT INTO authors ("fullname") VALUES ('Dante Alighieri');
INSERT INTO authors ("fullname") VALUES ('Lev Tolstoy');
INSERT INTO authors ("fullname") VALUES ('Victor Hugo');
INSERT INTO authors ("fullname") VALUES ('William Shakespeare');
INSERT INTO authors ("fullname") VALUES ('Johann Wolfgang von Goethe');
INSERT INTO authors ("fullname") VALUES ('Miguel de Cervantes y Saavedra');
INSERT INTO authors ("fullname") VALUES ('Italo Calvino');
INSERT INTO authors ("fullname") VALUES ('Stendhal');
INSERT INTO authors ("fullname") VALUES ('Charles Baudelaire');
INSERT INTO authors ("fullname") VALUES ('Marcel Proust');
INSERT INTO authors ("fullname") VALUES ('Giovanni Boccaccio');
INSERT INTO authors ("fullname") VALUES ('Alexander Pushkin');
INSERT INTO authors ("fullname") VALUES ('Jalaluddin Muhammad Rumi');
INSERT INTO authors ("fullname") VALUES ('Franz Kafka');
INSERT INTO authors ("fullname") VALUES ('Anton Chekhov');
INSERT INTO authors ("fullname") VALUES ('Gabriel García Márquez');
INSERT INTO authors ("fullname") VALUES ('Umberto Eco');
INSERT INTO authors ("fullname") VALUES ('J.R.R. Tolkien');
INSERT INTO authors ("fullname") VALUES ('William Faulkner');
INSERT INTO authors ("fullname") VALUES ('Aesop');
INSERT INTO authors ("fullname") VALUES ('Arthur Rimbaud');
INSERT INTO authors ("fullname") VALUES ('Aristophanes');
INSERT INTO authors ("fullname") VALUES ('Ivan Turgenev');
INSERT INTO authors ("fullname") VALUES ('Sophocles');
INSERT INTO authors ("fullname") VALUES ('Molière');
INSERT INTO authors ("fullname") VALUES ('Charles Dickens');
INSERT INTO authors ("fullname") VALUES ('Maxim Gorky');
INSERT INTO authors ("fullname") VALUES ('George Orwell');
INSERT INTO authors ("fullname") VALUES ('Edgar Allan Poe');
INSERT INTO authors ("fullname") VALUES ('Publius Vergilius Maro');
INSERT INTO authors ("fullname") VALUES ('Julio Cortázar');
INSERT INTO authors ("fullname") VALUES ('Nazim Hikmet');
INSERT INTO authors ("fullname") VALUES ('Oscar Wilde');
INSERT INTO authors ("fullname") VALUES ('Jean de La Fontaine');
INSERT INTO authors ("fullname") VALUES ('Rainer Maria Rilke');
INSERT INTO authors ("fullname") VALUES ('Lord Byron');
INSERT INTO authors ("fullname") VALUES ('Hans Christian Andersen');
INSERT INTO authors ("fullname") VALUES ('Thomas Mann');
INSERT INTO authors ("fullname") VALUES ('Alexandre Dumas');
INSERT INTO authors ("fullname") VALUES ('James Joyce');
INSERT INTO authors ("fullname") VALUES ('Louis-Ferdinand Céline');
INSERT INTO authors ("fullname") VALUES ('Boris Pasternak');
INSERT INTO authors ("fullname") VALUES ('Federico García Lorca');
INSERT INTO authors ("fullname") VALUES ('Pablo Neruda');
INSERT INTO authors ("fullname") VALUES ('Borges');
INSERT INTO authors ("fullname") VALUES ('Beaumarchais');
INSERT INTO authors ("fullname") VALUES ('Najeeb Mahfouz');
INSERT INTO authors ("fullname") VALUES ('Ursula K. Le Guin');
INSERT INTO authors ("fullname") VALUES ('Nikolay Gogol');
INSERT INTO authors ("fullname") VALUES ('Honoré de Balzac');
INSERT INTO authors ("fullname") VALUES ('Ernest Hemingway');
INSERT INTO authors ("fullname") VALUES ('Neil Gaiman');
INSERT INTO authors ("fullname") VALUES ('Jean Racine');
INSERT INTO authors ("fullname") VALUES ('Albert Camus');
INSERT INTO authors ("fullname") VALUES ('Jean-Paul Sartre');
INSERT INTO authors ("fullname") VALUES ('Chingiz Aitmatov');
INSERT INTO authors ("fullname") VALUES ('John Steinbeck');
INSERT INTO authors ("fullname") VALUES ('Milan Kundera');
INSERT INTO authors ("fullname") VALUES ('Jules Verne');
INSERT INTO authors ("fullname") VALUES ('Mark Twain');
INSERT INTO authors ("fullname") VALUES ('Francois Rabelais');
INSERT INTO authors ("fullname") VALUES ('Yasar Kemal');
INSERT INTO authors ("fullname") VALUES ('George Bernard Shaw');
INSERT INTO authors ("fullname") VALUES ('Arthur Conan Doyle');
INSERT INTO authors ("fullname") VALUES ('Jane Austen');
INSERT INTO authors ("fullname") VALUES ('Geoffrey Chaucer');
INSERT INTO authors ("fullname") VALUES ('Antoine de Saint-Exupéry');
INSERT INTO authors ("fullname") VALUES ('Erich Maria Remarque');
INSERT INTO authors ("fullname") VALUES ('J.D. Salinger');
INSERT INTO authors ("fullname") VALUES ('Virginia Woolf');
INSERT INTO authors ("fullname") VALUES ('Louis Aragon');
INSERT INTO authors ("fullname") VALUES ('Herman Melville');
INSERT INTO authors ("fullname") VALUES ('Alphonse Daudet');
INSERT INTO authors ("fullname") VALUES ('Mikhail Sholokhov');
INSERT INTO authors ("fullname") VALUES ('Stefan Zweig');
INSERT INTO authors ("fullname") VALUES ('José Saramago');
INSERT INTO authors ("fullname") VALUES ('Bertolt Brecht');
INSERT INTO authors ("fullname") VALUES ('Mario Vargas Llosa');
INSERT INTO authors ("fullname") VALUES ('T.S. Eliot');
INSERT INTO authors ("fullname") VALUES ('Guy de Maupassant');
INSERT INTO authors ("fullname") VALUES ('John Keats');
INSERT INTO authors ("fullname") VALUES ('Sabahattin Ali');
INSERT INTO authors ("fullname") VALUES ('Ahmet Hamdi Tanpinar');
INSERT INTO authors ("fullname") VALUES ('John Fante');
INSERT INTO authors ("fullname") VALUES ('Henri-Frédéric Blanc');
INSERT INTO authors ("fullname") VALUES ('Isaac Asimov');
INSERT INTO authors ("fullname") VALUES ('Fitzgerald Scott');
INSERT INTO authors ("fullname") VALUES ('J.M. Coetzee');
INSERT INTO authors ("fullname") VALUES ('Kazuo Ishiguro');
INSERT INTO authors ("fullname") VALUES ('Hermann Hesse');
INSERT INTO authors ("fullname") VALUES ('Robert Louis Stevenson');
INSERT INTO authors ("fullname") VALUES ('Salman Rushdie');
INSERT INTO authors ("fullname") VALUES ('Aldous Huxley');
INSERT INTO authors ("fullname") VALUES ('Paul Valéry');
INSERT INTO authors ("fullname") VALUES ('Thomas Pynchon');
INSERT INTO authors ("fullname") VALUES ('H.P. Lovecraft');
INSERT INTO authors ("fullname") VALUES ('Haruki Murakami');
INSERT INTO authors ("fullname") VALUES ('Nikos Kazantzakis');




-- Default tags
INSERT INTO tags("name", "description")VALUES('Literary Fiction', 'Literary fiction novels are considered works with artistic value and literary merit. They often include political criticism, social commentary, and reflections on humanity. Literary fiction novels are typically character-driven, as opposed to being plot-driven, and follow a character’s inner story.');
INSERT INTO tags("name", "description")VALUES('Mystery', 'Mystery novels, also called detective fiction, follow a detective solving a case from start to finish. They drop clues and slowly reveal information, turning the reader into a detective trying to solve the case, too. Mystery novels start with an exciting hook, keep readers interested with suspenseful pacing, and end with a satisfying conclusion that answers all of the reader’s outstanding questions. ');
INSERT INTO tags("name", "description")VALUES('Thriller', 'Thriller novels are dark, mysterious, and suspenseful plot-driven stories. They very seldom include comedic elements, but what they lack in humor, they make up for in suspense. Thrillers keep readers on their toes and use plot twists, red herrings, and cliffhangers to keep them guessing until the end.');
INSERT INTO tags("name", "description")VALUES('Horror', 'Horror novels are meant to scare, startle, shock, and even repulse readers. Generally focusing on themes of death, demons, evil spirits, and the afterlife, they prey on fears with scary beings like ghosts, vampires, werewolves, witches, and monsters. In horror fiction, plot and characters are tools used to elicit a terrifying sense of dread.');
INSERT INTO tags("name", "description")VALUES('Historical', ' Historical fiction novels take place in the past. Written with a careful balance of research and creativity, they transport readers to another time and place—which can be real, imagined, or a combination of both. Many historical novels tell stories that involve actual historical figures or historical events within historical settings. ');
INSERT INTO tags("name", "description")VALUES('Romance', 'Romantic fiction centers around love stories between two people. They’re lighthearted, optimistic, and have an emotionally satisfying ending. Romance novels do contain conflict, but it doesn’t overshadow the romantic relationship, which always prevails in the end. ');
INSERT INTO tags("name", "description")VALUES('Western', 'Western novels tell the stories of cowboys, settlers, and outlaws exploring the western frontier and taming the American Old West. They’re shaped specifically by their genre-specific elements and rely on them in ways that novels in other fiction genres don’t. Westerns aren’t as popular as they once were; the golden age of the genre coincided with the popularity of western films in the 1940s, ‘50s, and ‘60s. ');
INSERT INTO tags("name", "description")VALUES('Bildungsroman', 'Bildungsroman is a literary genre of stories about a character growing psychologically and morally from their youth into adulthood. Generally, they experience a profound emotional loss, set out on a journey, encounter conflict, and grow into a mature person by the end of the story. Literally translated, a bildungsroman is “a novel of education” or “a novel of formation.”');
INSERT INTO tags("name", "description")VALUES('Speculative Fiction', 'Speculative fiction is a supergenre that encompasses a number of different types of fiction, from science fiction to fantasy to dystopian. The stories take place in a world different from our own. Speculative fiction knows no boundaries; there are no limits to what exists beyond the real world.');
INSERT INTO tags("name", "description")VALUES('Science Fiction', 'Sci-fi novels are speculative stories with imagined elements that don’t exist in the real world. Some are inspired by “hard” natural sciences like physics, chemistry, and astronomy; others are inspired by “soft” social sciences like psychology, anthropology, and sociology. Common elements of sci-fi novels include time travel, space exploration, and futuristic societies. ');
INSERT INTO tags("name", "description")VALUES('Fantasy', 'Fantasy novels are speculative fiction stories with imaginary characters set in imaginary universes. They’re inspired by mythology and folklore and often include elements of magic. The genre attracts both children and adults; well-known titles include Alice’s Adventures in Wonderland by Lewis Carroll and the Harry Potter series by J.K. Rowling.');
INSERT INTO tags("name", "description")VALUES('Dystopian', 'Dystopian novels are a genre of science fiction. They’re set in societies viewed as worse than the one in which we live. Dystopian fiction exists in contrast to utopian fiction, which is set in societies viewed as better than the one in which we live.');
INSERT INTO tags("name", "description")VALUES('Magical Realism', '. Magical realism novels depict the world truthfully, plus add magical elements. The fantastical elements aren’t viewed as odd or unique; they’re considered normal in the world in which the story takes place. The genre was born out of the realist art movement and is closely associated with Latin American authors. ');
INSERT INTO tags("name", "description")VALUES('Realist Literature', 'Realist fiction novels are set in a time and place that could actually happen in the real world. They depict real people, places, and stories in order to be as truthful as possible. Realist works of fiction remain true to everyday life and abide by the laws of nature as we currently understand them.');
INSERT INTO tags("name", "description")VALUES('Manga', 'Manga is a type of Japanese comic book, which often contains material that is intended for adults.');
INSERT INTO tags("name", "description")VALUES('Comics', 'A comic book is a magazine that contains stories told in pictures. ');
INSERT INTO tags("name", "description")VALUES('Computer science', 'Books about computer science');
INSERT INTO tags("name", "description")VALUES('Medecine', 'Books about medecine');
INSERT INTO tags("name", "description")VALUES('Other', '');


-- Every languages
INSERT INTO languages ("name") VALUES('Afrikaans');
INSERT INTO languages ("name") VALUES('Albanian');
INSERT INTO languages ("name") VALUES('Arabic');
INSERT INTO languages ("name") VALUES('Armenian');
INSERT INTO languages ("name") VALUES('Basque');
INSERT INTO languages ("name") VALUES('Bengali');
INSERT INTO languages ("name") VALUES('Bulgarian');
INSERT INTO languages ("name") VALUES('Catalan');
INSERT INTO languages ("name") VALUES('Cambodian');
INSERT INTO languages ("name") VALUES('Chinese (Mandarin)');
INSERT INTO languages ("name") VALUES('Croatian');
INSERT INTO languages ("name") VALUES('Czech');
INSERT INTO languages ("name") VALUES('Danish');
INSERT INTO languages ("name") VALUES('Dutch');
INSERT INTO languages ("name") VALUES('English');
INSERT INTO languages ("name") VALUES('Estonian');
INSERT INTO languages ("name") VALUES('Fiji');
INSERT INTO languages ("name") VALUES('Finnish');
INSERT INTO languages ("name") VALUES('French');
INSERT INTO languages ("name") VALUES('Georgian');
INSERT INTO languages ("name") VALUES('German');
INSERT INTO languages ("name") VALUES('Greek');
INSERT INTO languages ("name") VALUES('Gujarati');
INSERT INTO languages ("name") VALUES('Hebrew');
INSERT INTO languages ("name") VALUES('Hindi');
INSERT INTO languages ("name") VALUES('Hungarian');
INSERT INTO languages ("name") VALUES('Icelandic');
INSERT INTO languages ("name") VALUES('Indonesian');
INSERT INTO languages ("name") VALUES('Irish');
INSERT INTO languages ("name") VALUES('Italian');
INSERT INTO languages ("name") VALUES('Japanese');
INSERT INTO languages ("name") VALUES('Javanese');
INSERT INTO languages ("name") VALUES('Korean');
INSERT INTO languages ("name") VALUES('Latin');
INSERT INTO languages ("name") VALUES('Latvian');
INSERT INTO languages ("name") VALUES('Lithuanian');
INSERT INTO languages ("name") VALUES('Macedonian');
INSERT INTO languages ("name") VALUES('Malay');
INSERT INTO languages ("name") VALUES('Malayalam');
INSERT INTO languages ("name") VALUES('Maltese');
INSERT INTO languages ("name") VALUES('Maori');
INSERT INTO languages ("name") VALUES('Marathi');
INSERT INTO languages ("name") VALUES('Mongolian');
INSERT INTO languages ("name") VALUES('Nepali');
INSERT INTO languages ("name") VALUES('Norwegian');
INSERT INTO languages ("name") VALUES('Persian');
INSERT INTO languages ("name") VALUES('Polish');
INSERT INTO languages ("name") VALUES('Portuguese');
INSERT INTO languages ("name") VALUES('Punjabi');
INSERT INTO languages ("name") VALUES('Quechua');
INSERT INTO languages ("name") VALUES('Romanian');
INSERT INTO languages ("name") VALUES('Russian');
INSERT INTO languages ("name") VALUES('Samoan');
INSERT INTO languages ("name") VALUES('Serbian');
INSERT INTO languages ("name") VALUES('Slovak');
INSERT INTO languages ("name") VALUES('Slovenian');
INSERT INTO languages ("name") VALUES('Spanish');
INSERT INTO languages ("name") VALUES('Swahili');
INSERT INTO languages ("name") VALUES('Swedish ');
INSERT INTO languages ("name") VALUES('Tamil');
INSERT INTO languages ("name") VALUES('Tatar');
INSERT INTO languages ("name") VALUES('Telugu');
INSERT INTO languages ("name") VALUES('Thai');
INSERT INTO languages ("name") VALUES('Tibetan');
INSERT INTO languages ("name") VALUES('Tonga');
INSERT INTO languages ("name") VALUES('Turkish');
INSERT INTO languages ("name") VALUES('Ukrainian');
INSERT INTO languages ("name") VALUES('Urdu');
INSERT INTO languages ("name") VALUES('Uzbek');
INSERT INTO languages ("name") VALUES('Vietnamese');
INSERT INTO languages ("name") VALUES('Welsh');
INSERT INTO languages ("name") VALUES('Xhosa');

