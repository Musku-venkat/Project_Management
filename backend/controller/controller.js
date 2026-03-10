const { productModel } = require("../config/mongo");

async function getData(req, res) {
  try {
    const data = await productModel.find({});
    res.send({ success: true, data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

async function getDataById(req, res) {
  try {
    const id = req.params.id;
    const data = await productModel.findById(id);
    res.send({ success: true, data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

async function postData(req, res) {
  try {
    const { name, sku, price, quantity, category } = req.body;

    if (!name.trim(" ") || !sku.trim(" ") || !price || !quantity || !category) {
      return res.send({ success: false, message: "Fields Cannot be empty" });
    }

    const data = await productModel.create({
      name,
      sku,
      price,
      quantity,
      category,
    });
    res.send({ success: true, message: "Successfully Added" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

async function updateData(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await productModel.findByIdAndUpdate(id, body);
    res.send({ success: true, message: "Updated Successfully", data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

async function deleteData(req, res) {
  try {
    const id = req.params.id;
    const data = await productModel.findByIdAndDelete(id);
    res.send({ success: true, message: "Deleted Successfully", data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

module.exports = { getData, getDataById, postData, updateData, deleteData };
