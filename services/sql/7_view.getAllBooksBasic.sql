CREATE OR REPLACE VIEW all_books_basic AS
SELECT
	author_id
	,genre_id
	,title
	,"ISBN"
	,release_date
	,description
	,book_image
FROM public."Book"
ORDER BY 
	genre_id,
	book_id ASC;