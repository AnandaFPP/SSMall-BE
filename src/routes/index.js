const express = require("express");
const router = express.Router();
const productRouter = require('../routes/products')
const cartRouter = require('../routes/cart')
const historyRouter = require('../routes/history')

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/history', historyRouter);


module.exports = router;