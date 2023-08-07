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