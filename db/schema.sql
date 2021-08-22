DROP TABLE IF EXISTS personel;

-- CREATE employee db
CREATE TABLE personel (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    age SMALLINT
);