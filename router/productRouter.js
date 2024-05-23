const router = require("express").Router();
const productController = require("../controller/productController");
const { uploadMultiple } = require("../middleware/fileUpload");
const cachingMiddleware = require("../middleware/cashe");

router.post("/create", uploadMultiple(), productController.createProduct);
router.get(
  "/product/getAll",
  cachingMiddleware,
  productController.getAllProducts
);
router.get(
  "/product/:_id",
  cachingMiddleware,
  productController.getProductWithID
);

module.exports = router;
