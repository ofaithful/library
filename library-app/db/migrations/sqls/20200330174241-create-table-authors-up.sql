CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    firstname varchar(32) NOT NULL,
    lastname varchar(32) NOT NULL,
    date_of_birth DATE NOT NULL
)