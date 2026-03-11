import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productCode: { type: String, unique: true },
    description: { type: String },
    rate: { type: Number, required: true },
    taxPercent: { type: Number, required: true },
    finalRate: { type: Number },
    productImage: { type: String },
  },
  { timestamps: true }
);

// Auto generate product code + calculate final rate
productSchema.pre("save", function (next) {
  if (!this.productCode)
    this.productCode = "PROD-" + Math.floor(100000 + Math.random() * 900000);
  this.finalRate = this.rate + (this.rate * this.taxPercent) / 100;
  next();
});

export default mongoose.model("Product", productSchema);
