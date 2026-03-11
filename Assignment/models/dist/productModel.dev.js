"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productSchema = new _mongoose["default"].Schema({
  productName: {
    type: String,
    required: true
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productCode: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  rate: {
    type: Number,
    required: true
  },
  taxPercent: {
    type: Number,
    required: true
  },
  finalRate: {
    type: Number
  },
  productImage: {
    type: String
  }
}, {
  timestamps: true
}); // Auto generate product code + calculate final rate

productSchema.pre("save", function (next) {
  if (!this.productCode) this.productCode = "PROD-" + Math.floor(100000 + Math.random() * 900000);
  this.finalRate = this.rate + this.rate * this.taxPercent / 100;
  next();
});

var _default = _mongoose["default"].model("Product", productSchema);

exports["default"] = _default;