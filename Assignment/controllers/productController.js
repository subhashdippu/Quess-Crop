import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// @desc Create new product
export const createProduct = async (req, res) => {
  try {
    const { productName, description, rate, taxPercent, productImage } =
      req.body;

    // Ensure admin is logged in
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Auto-fill description if not given
    const desc = description || `Description for ${productName}`;

    const product = await Product.create({
      productName,
      createdBy: req.user._id,
      description: desc,
      rate,
      taxPercent,
      productImage,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product
export const updateProduct = async (req, res) => {
  try {
    const { productName, description, rate, taxPercent, productImage } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.productName = productName || product.productName;
    product.description = description || product.description;
    product.rate = rate || product.rate;
    product.taxPercent = taxPercent || product.taxPercent;
    product.productImage = productImage || product.productImage;

    // Recalculate final rate
    product.finalRate =
      product.rate + (product.rate * product.taxPercent) / 100;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Prevent deleting if user still exists (data consistency)
    const creator = await User.findById(product.createdBy);
    if (creator)
      return res
        .status(400)
        .json({ message: "Cannot delete product while user exists" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
