CREATE TABLE IF NOT EXISTS public."Book"
(
    book_id serial NOT NULL,
    author_id integer NOT NULL,
    genre_id character varying NOT NULL,
    title character varying NOT NULL,
    "ISBN" character varying NOT NULL,
    release_date date,
    PRIMARY KEY (book_id)
);

CREATE TABLE IF NOT EXISTS public."Author"
(
    author_id serial NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    birth_date date,
    birth_country character varying,
    PRIMARY KEY (author_id)
);

CREATE TABLE IF NOT EXISTS public."Genre"
(
    genre_id serial NOT NULL,
    genre_name character varying NOT NULL,
    genre_description character varying,
    genre_image character varying,
    PRIMARY KEY (genre_id)
);