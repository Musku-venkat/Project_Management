const express = require('express');
const { getData, postData, updateData, deleteData, getDataById } = require('../controller/controller');

const router = express.Router();

router.get('/products', getData);
router.get('/product/:id', getDataById);
router.post('/add-products', postData);
router.put('/update-products/:id', updateData);
router.delete('/delete-products/:id', deleteData);

module.exports = router;