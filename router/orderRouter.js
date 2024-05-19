const router = require("express").Router();
const orderController = require("../controller/orderController");

router.post("/order/create/:productID", orderController.createOrder);
router.put("/order/update", orderController.updateOrder);

module.exports = router;
