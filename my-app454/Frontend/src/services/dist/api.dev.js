"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getAttendance = exports.markAttendance = exports.deleteEmployee = exports.getEmployees = exports.addEmployee = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: "http://127.0.0.1:8000",
  // Replace with live backend URL
  headers: {
    "Content-Type": "application/json"
  }
}); // Employee APIs


var addEmployee = function addEmployee(data) {
  var res;
  return regeneratorRuntime.async(function addEmployee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(API.post("/api/employees/", data));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addEmployee = addEmployee;

var getEmployees = function getEmployees() {
  var res;
  return regeneratorRuntime.async(function getEmployees$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(API.get("/api/employees/"));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getEmployees = getEmployees;

var deleteEmployee = function deleteEmployee(id) {
  var res;
  return regeneratorRuntime.async(function deleteEmployee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(API["delete"]("/api/employees/".concat(id, "/")));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Attendance APIs


exports.deleteEmployee = deleteEmployee;

var markAttendance = function markAttendance(data) {
  var res;
  return regeneratorRuntime.async(function markAttendance$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(API.post("/api/attendance/", data));

        case 2:
          res = _context4.sent;
          return _context4.abrupt("return", res.data);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.markAttendance = markAttendance;

var getAttendance = function getAttendance(employeeId) {
  var res;
  return regeneratorRuntime.async(function getAttendance$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(API.get("/api/attendance/".concat(employeeId, "/")));

        case 2:
          res = _context5.sent;
          return _context5.abrupt("return", res.data);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getAttendance = getAttendance;
var _default = API;
exports["default"] = _default;