const express = require('express');

const { getproducts, addproduct, updateproduct, deleteproduct } = require('../controllers/product.controller.js');



const router = express.Router();



router.get('/getproducts', getproducts);
router.post('/addproduct', addproduct);
router.put('/updateproduct', updateproduct);
router.delete('/deleteproduct/:id', deleteproduct);


module.exports = router;