const express = require('express');

const { getproducts, addproduct, updateproduct, deleteproduct, getCategories, getCompanies } = require('../controllers/product.controller.js');



const router = express.Router();



router.get('/getproducts', getproducts);
router.post('/addproduct', addproduct);
router.put('/updateproduct', updateproduct);
router.delete('/deleteproduct', deleteproduct);
router.get('/categories', getCategories);
router.get('/companies', getCompanies);


module.exports = router;