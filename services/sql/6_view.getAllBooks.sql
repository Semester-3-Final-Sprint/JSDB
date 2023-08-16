CREATE OR REPLACE VIEW all_books AS
SELECT 
	book_id
	,public."Author".author_id
	,public."Author".first_name || ' ' || public."Author".last_name AS author_name
	,public."Genre".genre_id
	,genre_name
	,title
	,"ISBN"
	,description
	,release_date
	,book_image
FROM public."Book"
JOIN public."Author" ON public."Book".author_id = public."Author".author_id
JOIN public."Genre" ON public."Book".Genre_id = public."Genre".genre_id;