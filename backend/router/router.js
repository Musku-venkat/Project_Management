const express = require('express');
const multer = require('multer');
const { getData, postData, updateData, deleteData, getDataById, postCsvData } = require('../controller/controller');

const router = express.Router();

const upload = multer({dest: 'uploads/'});

router.get('/products', getData);
router.get('/product/:id', getDataById);
router.post('/add-products', postData);
router.post('/upload-csv', upload.single('file'), postCsvData);
router.put('/update-products/:id', updateData);
router.delete('/delete-products/:id', deleteData);

module.exports = router;