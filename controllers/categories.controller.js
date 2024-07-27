const mongoose = require('mongoose');
const Categories = require('../models/categories.model.js');




const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const addCategory = async (req, res) => {
    console.log(req.body);
    const category = req.body;
    const newCategory = new Categories(category);
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}




module.exports = {
    getCategories,
    addCategory
}