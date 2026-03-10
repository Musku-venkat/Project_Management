const fs = require("fs");
const csv = require("csv-parser");
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

    if (!name.trim()) {
      return res.send({ success: false, message: "Name should not empty" });
    }

    if (!sku.trim()) {
      return res.send({ success: false, message: "SKU should not empty" });
    }

    if (price <= 0) {
      return res.send({
        success: false,
        message: "Price should be greater than zero",
      });
    }

    if (quantity <= 0) {
      return res.send({
        success: false,
        message: "Quantity should be greater than zero",
      });
    }

    if (category === "Select") {
      return res.send({ success: false, message: "Select a category" });
    }

    const uniqueValue = sku.toUpperCase();

    const data = await productModel.create({
      name,
      uniqueValue,
      price,
      quantity,
      category,
    });

    res.send({ success: true, message: "Successfully Added", data });
  } catch (error) {
    if(error.errorResponse.code === 11000){
      return res.send({ success: false, message: 'Value Should be Unique' });
    }
    res.send({ success: false, message: error.message });
  }
}

async function updateData(req, res) {
  try {
    const id = req.params.id;
    const {name, sku, price, quantity, category} = req.body;

    if (!name.trim()) {
      return res.send({ success: false, message: "Name should not empty" });
    }

    if (!sku.trim()) {
      return res.send({ success: false, message: "SKU should not empty" });
    }

    if (price <= 0) {
      return res.send({
        success: false,
        message: "Price should be greater than zero",
      });
    }

    if (quantity <= 0) {
      return res.send({
        success: false,
        message: "Quantity should be greater than zero",
      });
    }

    if (category === "Select") {
      return res.send({ success: false, message: "Select a category" });
    }

    const data = await productModel.findByIdAndUpdate(id, {name, sku, price, quantity, category});
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

async function postCsvData(req, res) {
  const result = [];

  try {
    if(!req.file){
      return res.send({success: false, message: 'Upload File'});
    }
    
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => result.push(data))
      .on("end", async () => {
        try {
          await productModel.insertMany(result);

          fs.unlinkSync(req.file.path);

          res.send({ success: true, message: "SCV Uploaded Successfully" });
        } catch (error) {
          if(error.errorResponse.code === 11000){
            return res.send({ success: false, message: 'Value Should be Unique' });
          }
          res.send({ success: false, message: error.message});
        }
      });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

module.exports = {
  getData,
  getDataById,
  postData,
  updateData,
  deleteData,
  postCsvData,
};
