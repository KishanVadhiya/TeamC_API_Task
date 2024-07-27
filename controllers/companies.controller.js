const mongoose = require('mongoose');
const Companies = require('../models/companies.model.js');




const getCompanies = async (req, res) => {
    try {
        const companies = await Companies.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const addCompanies = async (req, res) => {
    console.log(req.body);
    const company = req.body;
    const newCompany = new Companies(company);
    try {
        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports = {
    getCompanies,
    addCompanies
}