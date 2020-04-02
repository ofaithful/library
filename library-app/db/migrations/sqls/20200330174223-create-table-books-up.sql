CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    published date NOT NULL,
    title text NOT NULL,
    stock integer DEFAULT 1
);