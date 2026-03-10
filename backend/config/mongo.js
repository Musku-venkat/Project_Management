const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
}

const productSchema = mongoose.Schema({
  name: { type: String },
  sku: { type: String, unique: true },
  price: { type: Number },
  quantity: { type: Number },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.model("products", productSchema);

module.exports = { connectDB, productModel };
