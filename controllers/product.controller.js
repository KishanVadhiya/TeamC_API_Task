const mongoose = require('mongoose');
const Products = require('../models/products.model.js');


const getproducts = async (req, res) => {
    const { category, company, availability, minPrice, maxPrice, minRating, sort } = req.query;

    // Build the filter object
    let filter = {};
    if (category) filter.category = category;
    if (company) filter.company = company;
    if (availability) filter.availability = availability;
    if (minPrice) filter.price = { ...filter.price, $gte: parseInt(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (minRating) filter.rating = { ...filter.rating, $gte: parseInt(minRating) };

    // Build the sort object
    let sortBy = {};
    switch (sort) {
        case 'atoz':
            sortBy.productName = 1;
            break;
        case 'ztoa':
            sortBy.productName = -1;
            break;
        case 'ratings':
            sortBy.rating = -1;
            break;
        case 'discount':
            sortBy.discount = -1;
            break;
        case 'price-asc':
            sortBy.price = 1;
            break;
        case 'price-desc':
            sortBy.price = -1;
            break;
        default:
            sortBy = {}; // No sorting
            break;
    }

    try {
        const products = await Products.find(filter).sort(sortBy);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    await Products.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
}



module.exports = { 
    getproducts,
    addproduct,
    updateproduct,
    deleteproduct,
};

//TODO: update, Delete, 