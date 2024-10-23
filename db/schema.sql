DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES users (id)
        ON DELETE SET NULL
);

CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    adress VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
);

CREATE TABLE wines (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(250) NOT NULL,
    type VARCHAR(200) NOT NULL,
    region VARCHAR(200) NOT NULL,
    price DECIMAL NOT NULL,
    shop_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops (id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
);
