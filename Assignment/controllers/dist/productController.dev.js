"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;

var _productModel = _interopRequireDefault(require("../models/productModel.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @desc Create new product
var createProduct = function createProduct(req, res) {
  var _req$body, productName, description, rate, taxPercent, productImage, desc, product;

  return regeneratorRuntime.async(function createProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, productName = _req$body.productName, description = _req$body.description, rate = _req$body.rate, taxPercent = _req$body.taxPercent, productImage = _req$body.productImage; // Ensure admin is logged in

          if (req.user) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Unauthorized"
          }));

        case 4:
          // Auto-fill description if not given
          desc = description || "Description for ".concat(productName);
          _context.next = 7;
          return regeneratorRuntime.awrap(_productModel["default"].create({
            productName: productName,
            createdBy: req.user._id,
            description: desc,
            rate: rate,
            taxPercent: taxPercent,
            productImage: productImage
          }));

        case 7:
          product = _context.sent;
          res.status(201).json(product);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // @desc Get all products


exports.createProduct = createProduct;

var getProducts = function getProducts(req, res) {
  var products;
  return regeneratorRuntime.async(function getProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].find().populate("createdBy", "name email"));

        case 3:
          products = _context2.sent;
          res.json(products);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // @desc Update product


exports.getProducts = getProducts;

var updateProduct = function updateProduct(req, res) {
  var _req$body2, productName, description, rate, taxPercent, productImage, product, updatedProduct;

  return regeneratorRuntime.async(function updateProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, productName = _req$body2.productName, description = _req$body2.description, rate = _req$body2.rate, taxPercent = _req$body2.taxPercent, productImage = _req$body2.productImage;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_productModel["default"].findById(req.params.id));

        case 4:
          product = _context3.sent;

          if (product) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Product not found"
          }));

        case 7:
          product.productName = productName || product.productName;
          product.description = description || product.description;
          product.rate = rate || product.rate;
          product.taxPercent = taxPercent || product.taxPercent;
          product.productImage = productImage || product.productImage; // Recalculate final rate

          product.finalRate = product.rate + product.rate * product.taxPercent / 100;
          _context3.next = 15;
          return regeneratorRuntime.awrap(product.save());

        case 15:
          updatedProduct = _context3.sent;
          res.json(updatedProduct);
          _context3.next = 22;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // @desc Delete product


exports.updateProduct = updateProduct;

var deleteProduct = function deleteProduct(req, res) {
  var product, creator;
  return regeneratorRuntime.async(function deleteProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].findById(req.params.id));

        case 3:
          product = _context4.sent;

          if (product) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Product not found"
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(_userModel["default"].findById(product.createdBy));

        case 8:
          creator = _context4.sent;

          if (!creator) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "Cannot delete product while user exists"
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(product.deleteOne());

        case 13:
          res.json({
            message: "Product deleted successfully"
          });
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.deleteProduct = deleteProduct;