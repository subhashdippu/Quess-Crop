"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @desc Create new user
var createUser = function createUser(req, res) {
  var _req$body, name, email, username, password, mobileNo, existingUser, user;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password, mobileNo = _req$body.mobileNo;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Email already exists"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].create({
            name: name,
            email: email,
            username: username,
            password: password,
            mobileNo: mobileNo
          }));

        case 9:
          user = _context.sent;
          res.status(201).json(user);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // @desc Get all users


exports.createUser = createUser;

var getUsers = function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].find().select("-password"));

        case 3:
          users = _context2.sent;
          res.json(users);
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
}; // @desc Update user


exports.getUsers = getUsers;

var updateUser = function updateUser(req, res) {
  var user, updatedUser;
  return regeneratorRuntime.async(function updateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 6:
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.username = req.body.username || user.username;
          user.mobileNo = req.body.mobileNo || user.mobileNo; // Update password if provided

          if (req.body.password) user.password = req.body.password;
          _context3.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          updatedUser = _context3.sent;
          res.json(updatedUser);
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; // @desc Delete user


exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res) {
  var user;
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(user.deleteOne());

        case 8:
          res.json({
            message: "User deleted successfully"
          });
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.deleteUser = deleteUser;