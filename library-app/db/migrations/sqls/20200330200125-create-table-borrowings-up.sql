CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    borrow_date timestamp NOT NULL,
    book_id integer REFERENCES books(book_id),
    client_id integer REFERENCES clients(client_id)
)