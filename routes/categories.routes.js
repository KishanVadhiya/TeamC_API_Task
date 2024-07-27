const express = require('express');

const {getCategories, addCategory} = require('../controllers/categories.controller.js');


const router = express.Router();


router.get('/categories', getCategories);
router.post('/addCategory', addCategory);


module.exports = router;