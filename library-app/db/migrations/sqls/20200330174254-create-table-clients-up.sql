CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    photo text,
    name varchar(32) NOT NULL,
    username varchar(12) NOT NULL,
    password text NOT NULL,
    registration_date timestamp NOT NULL,
    role varchar(6) CHECK (role in ('admin', 'client')) DEFAULT 'client'
)