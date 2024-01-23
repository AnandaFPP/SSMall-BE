CREATE TABLE products (
    product_id VARCHAR PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price INT NOT NULL,
    product_image VARCHAR
);

CREATE TABLE cart (
    cart_id VARCHAR PRIMARY KEY,
    product_id VARCHAR REFERENCES products(product_id)
);

CREATE TABLE history (
    history_id VARCHAR PRIMARY KEY,
    product_id VARCHAR REFERENCES products(product_id)
);