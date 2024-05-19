const router = require("express").Router();
const productController = require("../controller/productController");
const { uploadMultiple } = require("../middleware/fileUpload");

router.post("/create", uploadMultiple(), productController.createProduct);
router.get("/product/getAll" , productController.getAllProducts)
router.get("/product/:_id", productController.getProductWithID);

module.exports = router;
