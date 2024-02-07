CREATE DATABASE siesta_db;

USE siesta_db;

CREATE TABLE products (
id  INT NOT NULL PRIMARY KEY,
name VARCHAR(255),
description TEXT,
category VARCHAR(255),
color VARCHAR(255),
size VARCHAR(255),
price DECIMAL(10, 2)
);

CREATE TABLE images (
id  INT NOT NULL PRIMARY KEY,
image VARCHAR(255),
product_id INT NOT NULL
);

ALTER TABLE images ADD FOREIGN KEY (product_id) REFERENCES products(id);

CREATE TABLE users (
id  INT NOT NULL PRIMARY KEY,
first_name VARCHAR(255),
last_name VARCHAR(255),
email VARCHAR(255),
password VARCHAR(255),
avatar VARCHAR(255),
role_id  INT NOT NULL
);

CREATE TABLE roles (
id  INT NOT NULL PRIMARY KEY,
role VARCHAR(255),
licenses TINYINT
);

ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles(id);

CREATE TABLE order_detail (
id  INT NOT NULL PRIMARY KEY,
quantity VARCHAR(100), 
price DECIMAL(10, 2),
total DECIMAL(10, 2), 
order_date DATE,
user_id INT NOT NULL,
product_id INT NOT NULL
);

ALTER TABLE order_detail ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE order_detail ADD FOREIGN KEY (user_id) REFERENCES users(id);