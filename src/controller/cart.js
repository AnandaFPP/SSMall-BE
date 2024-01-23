let {
    selectAllCart,
    selectCart,
    insertCart,
    deleteCart,
    countData,
    findId,
  } = require("../models/cart");
  const commonHelper = require("../helper/common");
  const { v4: uuidv4 } = require("uuid");
  
  let cartController = {
    getAllCart: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const sortby = req.query.sortby || "cart_id";
        const sort = req.query.sort || "ASC";
        let result = await selectAllCart({ limit, offset, sort, sortby });
        const {
          rows: [count],
        } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage,
        };
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Cart Data Success",
          pagination
        );
      } catch (err) {
        console.log(err);
      }
    },
    getDetailCart: async (req, res) => {
      const cart_id = String(req.params.id);
      selectCart(cart_id)
        .then((result) => {
          commonHelper.response(
            res,
            result.rows,
            200,
            "Get Cart Detail Success"
          );
        })
        .catch((err) => res.send(err));
    },
    createCart: async (req, res) => {
      const { product_id } = req.body;
      const {
        rows: [count],
      } = await countData();

      const cart_id = uuidv4();
      const data = {
        cart_id,
        product_id,
      };

      insertCart(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Create Cart Success")
        )
        .catch((err) => res.send(err));
    },
    updateCart: async (req, res) => {
      try {
        const cart_id = String(req.params.id);
        const { product_id } = req.body;
        const { rowCount } = await findId(cart_id);
        if (!rowCount) {
          res.json({ message: "ID Not Found" });
        }
        const data = {
          cart_id,
          product_id,
        };
        updateCart(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Update Cart Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteCart: async (req, res) => {
      try {
        const cart_id = String(req.params.id);
        deleteCart(cart_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Delete Cart Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = cartController;