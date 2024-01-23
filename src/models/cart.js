const Pool = require("../config/db");

const selectAllCart = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT cart.cart_id, products.product_name, products.product_price AS total_order, products.product_image
    FROM cart
    INNER JOIN products ON cart.product_id = products.product_id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectCart = (customer_id) => {
  return Pool.query(`SELECT cart.cart_id, products.product_name, products.product_price AS total_order, products.product_image
  FROM cart
  INNER JOIN products ON cart.product_id = products.product_id WHERE customer_id = '${customer_id}'`);
};

const insertCart = (data) => {
  const { cart_id, product_id } = data;
  return Pool.query(
    `INSERT INTO cart(cart_id, product_id) VALUES('${cart_id}', '${product_id}')`
  );
};

const deleteCart = (cart_id) => {
  return Pool.query(`DELETE FROM cart WHERE cart_id = '${cart_id}'`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM cart`);
};

const findId = (cart_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT cart_id FROM cart WHERE cart_id= '${cart_id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  selectAllCart,
  selectCart,
  insertCart,
  deleteCart,
  countData,
  findId,
};