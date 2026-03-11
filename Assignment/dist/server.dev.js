"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _errorMiddleware = require("./middleware/errorMiddleware.js");

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _db["default"])();
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json()); // Routes

app.use("/api/auth", _authRoutes["default"]);
app.use("/api/users", _userRoutes["default"]);
app.use("/api/products", _productRoutes["default"]); // app.use("/api/users", userRoutes);
// Error Handling

app.use(_errorMiddleware.notFound);
app.use(_errorMiddleware.errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});