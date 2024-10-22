import client from "../config/connection.js";
export async function getAllShops() {
    const sql = `
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
    LEFT JOIN wines 
        ON shops.id = wines.shop_id
    LEFT JOIN users AS managers
        ON users.manager_id = managers.id
    `;
    const { rows } = await client.query(sql);
    return rows;
}
export async function getAllUsers() {
    const sql = `
        SELECT 
            id, 
            CONCAT(first_name, ' ', last_name) AS user_name
        FROM users
    `;
    const { rows } = await client.query(sql);
    return rows;
}
export async function createShop(user_id, name, adress) {
    const sql = `
        INSERT INTO shops (name, adress, user_id) VALUES ($1, $2, $3)
    `;
    await client.query(sql, [name, adress, user_id]);
}
//# sourceMappingURL=query.js.map