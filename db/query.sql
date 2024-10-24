\c employee_tracker_app_db;



SELECT 
    shops.id AS shop_id,
    name AS shop_name,
    adress AS shop_adress,
    users.id AS user_id,
    CONCAT(users.first_name, ' ', users.last_name) AS user_name,
    users.email AS user_email,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager,
    wines.id AS wine_id,
    brand AS wine_brand,
    type AS wine_type,
    region AS wine_region,
    price AS wine_price
FROM shops
JOIN users 
    ON shops.user_id = users.id
JOIN wines 
    ON shops.id = wines.shop_id
LEFT JOIN users AS managers
    ON users.manager_id = managers.id;


-- SELECT 
--     u.id AS user_id,
--     CONCAT(u.first_name, ' ', u.last_name) AS user_name,
--     CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
-- FROM users AS u
-- LEFT JOIN users AS managers
--     ON u.manager_id = managers.id;

