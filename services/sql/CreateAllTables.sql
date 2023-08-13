-- For initialization only

CREATE SEQUENCE "Genre_genre_id_seq" START 1;
CREATE SEQUENCE "Author_author_id_seq" START 1;
CREATE SEQUENCE "Book_book_id_seq" START 1;

-- Table: public.Genre

-- DROP TABLE IF EXISTS public."Genre";

CREATE TABLE IF NOT EXISTS public."Genre"
(
    genre_id integer NOT NULL DEFAULT nextval('"Genre_genre_id_seq"'::regclass),
    genre_name character varying COLLATE pg_catalog."default" NOT NULL,
    genre_description character varying COLLATE pg_catalog."default",
    genre_image character varying COLLATE pg_catalog."default",
    CONSTRAINT "Genre_pkey" PRIMARY KEY (genre_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Genre"
    OWNER to postgres;

-- Table: public.Author

-- DROP TABLE IF EXISTS public."Author";

CREATE TABLE IF NOT EXISTS public."Author"
(
    author_id integer NOT NULL DEFAULT nextval('"Author_author_id_seq"'::regclass),
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    birth_date date,
    birth_country character varying COLLATE pg_catalog."default",
    headshot character varying COLLATE pg_catalog."default",
    CONSTRAINT "Author_pkey" PRIMARY KEY (author_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Author"
    OWNER to postgres;

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Author"
    OWNER to postgres;
	
	-- Table: public.Book

-- DROP TABLE IF EXISTS public."Book";

CREATE TABLE IF NOT EXISTS public."Book"
(
    book_id integer NOT NULL DEFAULT nextval('"Book_book_id_seq"'::regclass),
    author_id integer NOT NULL,
    genre_id integer NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    "ISBN" character varying COLLATE pg_catalog."default" NOT NULL,
    release_date date,
    description character varying COLLATE pg_catalog."default",
    book_image character varying COLLATE pg_catalog."default",
    CONSTRAINT "Book_pkey" PRIMARY KEY (book_id),
    CONSTRAINT author_id_pk FOREIGN KEY (author_id)
        REFERENCES public."Author" (author_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT genre_id_pk FOREIGN KEY (genre_id)
        REFERENCES public."Genre" (genre_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Book"
    OWNER to postgres;