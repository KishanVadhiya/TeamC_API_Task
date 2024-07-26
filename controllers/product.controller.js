const mongoose = require('mongoose');
const Products = require('../models/products.model.js');
const Companies = require('../models/companies.model.js');
const Categories = require('../models/categories.model.js');


const getproducts = async (req, res) => {

    // TODO: Filter products by category, company, availability, discount, price, rating .    // SORTING
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const addproduct = async (req, res) => {
    console.log(req.body);
    const product = req.body;
    const newProduct = new Products(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const updateproduct = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No product with that id');
    const updatedProduct = await Products.findByIdAndUpdate(_id, { ...product, _id }, { new: true });
    res.json(updatedProduct);
}

const deleteproduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');
    await Products.findByIdAndRemove(id);
    res.json({ message: 'Product deleted successfully' });
}

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getCompanies = async (req, res) => {
    try {
        const companies = await Companies.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports = { 
    getproducts,
    addproduct,
    updateproduct,
    deleteproduct,
    getCategories,
    getCompanies
};

//TODO: update, Delete, 