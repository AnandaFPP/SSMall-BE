const Pool = require("../config/db");

const selectAllHistory = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT history.history_id, products.product_name, products.product_price AS total_order, products.product_image
    FROM history
    INNER JOIN products ON history.product_id = products.product_id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectHistory = (customer_id) => {
  return Pool.query(`SELECT history.history_id, products.product_name, products.product_price AS total_order, products.product_image
  FROM history
  INNER JOIN products ON history.product_id = products.product_id WHERE customer_id = '${customer_id}'`);
};

const insertHistory = (data) => {
  const { history_id, product_id } = data;
  return Pool.query(
    `INSERT INTO history(history_id, product_id) VALUES('${history_id}', '${product_id}')`
  );
};

const deleteHistory = (history_id) => {
  return Pool.query(`DELETE FROM history WHERE history_id = '${history_id}'`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM history`);
};

const findId = (history_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT history_id FROM history WHERE history_id= '${history_id}'`,
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
  selectAllHistory,
  selectHistory,
  insertHistory,
  deleteHistory,
  countData,
  findId,
};