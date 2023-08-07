-- Table: public.Author

-- DROP TABLE IF EXISTS public."Author";

CREATE TABLE IF NOT EXISTS public."Author"
(
    author_id integer NOT NULL DEFAULT nextval('"Author_author_id_seq"'::regclass),
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    birth_date date,
    birth_country character varying COLLATE pg_catalog."default",
    CONSTRAINT "Author_pkey" PRIMARY KEY (author_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Author"
    OWNER to postgres;