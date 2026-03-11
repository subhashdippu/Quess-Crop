"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginAdmin = exports.registerAdmin = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

var registerAdmin = function registerAdmin(req, res) {
  var _req$body, name, email, username, password, mobileNo, userExists, user;

  return regeneratorRuntime.async(function registerAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password, mobileNo = _req$body.mobileNo;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Admin already exists"
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
          res.status(201).json({
            token: generateToken(user._id),
            user: user
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.registerAdmin = registerAdmin;

var loginAdmin = function loginAdmin(req, res) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function loginAdmin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;
          _context2.t0 = user;

          if (!_context2.t0) {
            _context2.next = 10;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 9:
          _context2.t0 = _context2.sent;

        case 10:
          if (!_context2.t0) {
            _context2.next = 14;
            break;
          }

          res.json({
            token: generateToken(user._id),
            user: user
          });
          _context2.next = 15;
          break;

        case 14:
          res.status(401).json({
            message: "Invalid credentials"
          });

        case 15:
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t1 = _context2["catch"](1);
          res.status(500).json({
            message: _context2.t1.message
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

exports.loginAdmin = loginAdmin;