CREATE TABLE book_authors (
    book_id integer REFERENCES books(book_id),
    author_id integer REFERENCES authors(author_id)
)