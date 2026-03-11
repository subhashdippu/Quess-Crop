"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productController = require("../controllers/productController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route("/").post(_authMiddleware.protect, _productController.createProduct) // Create product
.get(_authMiddleware.protect, _productController.getProducts); // Get all products

router.route("/:id").put(_authMiddleware.protect, _productController.updateProduct) // Edit product
["delete"](_authMiddleware.protect, _productController.deleteProduct); // Delete product

var _default = router;
exports["default"] = _default;