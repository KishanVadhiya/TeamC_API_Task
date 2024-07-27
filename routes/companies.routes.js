const express = require('express');


const { getCompanies, addCompanies } = require('../controllers/companies.controller.js');


const router = express.Router();



router.get('/companies', getCompanies);
router.post('/addCompanies', addCompanies);



module.exports = router;