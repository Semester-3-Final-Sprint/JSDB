-- Table: public.Book

-- DROP TABLE IF EXISTS public."Book";

CREATE TABLE IF NOT EXISTS public."Book"
(
    book_id integer NOT NULL DEFAULT nextval('"Book_book_id_seq"'::regclass),
    author_id integer NOT NULL,
    genre_id character varying COLLATE pg_catalog."default" NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    "ISBN" character varying COLLATE pg_catalog."default" NOT NULL,
    release_date date,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Book_pkey" PRIMARY KEY (book_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Book"
    OWNER to postgres;