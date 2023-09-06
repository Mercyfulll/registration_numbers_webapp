CREATE TABLE towns (
    id SERIAL PRIMARY KEY, 
    town_name TEXT NOT NULL, 
    reg_num_start CHAR(2) NOT NULL
);

CREATE TABLE  registration_numbers(
    id SERIAL PRIMARY KEY,
    reg_num TEXT NOT NULL UNIQUE,
    towns_id INT REFERENCES towns (id)
);

INSERT INTO towns (town_name, reg_num_start) VALUES 
    ('Capetown','CA'),
    ('Knysna','CX'),
    ('Paarl','CJ'),
    ('Stellenbosch','CL');
