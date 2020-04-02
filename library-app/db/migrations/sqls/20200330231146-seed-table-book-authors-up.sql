INSERT INTO book_authors
    SELECT books.book_id, authors.author_id
    FROM authors
    LEFT JOIN books
    ON books.title IN ('The Talisman', 'Black House')
    WHERE authors.lastname IN ('King', 'Straub');

INSERT INTO book_authors
    SELECT books.book_id, authors.author_id
    FROM authors
    LEFT JOIN books
    ON books.title IN ('It', 'Bag of Bones')
    WHERE authors.lastname = 'King';

INSERT INTO book_authors
    SELECT books.book_id, authors.author_id
    FROM authors
    LEFT JOIN books
    ON books.title = 'Illuminae'
    WHERE authors.lastname IN ('Kaufman', 'Kristoff');

INSERT INTO book_authors
    SELECT books.book_id, authors.author_id
    FROM authors
    LEFT JOIN books
    ON books.title = 'Under Venus'
    WHERE authors.lastname = 'Straub';

INSERT INTO book_authors
    SELECT books.book_id, authors.author_id
    FROM authors
    LEFT JOIN books
    ON books.title IN ('Seven Databases in seven Weeks')
    WHERE authors.lastname IN ('Wilson', 'Redmond');

INSERT INTO book_authors
    SELECT books.book_id, authors.author_id
    FROM authors
    LEFT JOIN books
    ON books.title = 'Node.js the Right Way'
    WHERE authors.lastname = 'Wilson';