let {
    selectAllHistory,
    selectHistory,
    insertHistory,
    deleteHistory,
    countData,
    findId,
  } = require("../models/history");
  const commonHelper = require("../helper/common");
  const { v4: uuidv4 } = require("uuid");
  
  let historyController = {
    getAllHistory: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const sortby = req.query.sortby || "history_id";
        const sort = req.query.sort || "ASC";
        let result = await selectAllHistory({ limit, offset, sort, sortby });
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
          "Get History Data Success",
          pagination
        );
      } catch (err) {
        console.log(err);
      }
    },
    getDetailHistory: async (req, res) => {
      const history_id = String(req.params.id);
      selectHistory(history_id)
        .then((result) => {
          commonHelper.response(
            res,
            result.rows,
            200,
            "Get History Detail Success"
          );
        })
        .catch((err) => res.send(err));
    },
    createHistory: async (req, res) => {
      const { product_id } = req.body;
      const {
        rows: [count],
      } = await countData();

      const history_id = uuidv4();
      const data = {
        history_id,
        product_id,
      };

      insertHistory(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Create History Success")
        )
        .catch((err) => res.send(err));
    },
    deleteHistory: async (req, res) => {
      try {
        const history_id = String(req.params.id);
        deleteHistory(history_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Delete History Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = historyController;