"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route("/").post(_authMiddleware.protect, _userController.createUser) // Create User
.get(_authMiddleware.protect, _userController.getUsers); // Get All Users

router.route("/:id").put(_authMiddleware.protect, _userController.updateUser) // Edit User
["delete"](_authMiddleware.protect, _userController.deleteUser); // Delete User

var _default = router;
exports["default"] = _default;