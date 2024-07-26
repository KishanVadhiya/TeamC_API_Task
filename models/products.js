const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new  Schema({
    availability:{
        type:String,
        required: true,
    },
    category: {
        type:String,
        required: true,
    },
    company : {
        type:String,
        required: true,
    },
    discount : {
        type: Number,
        required: true,
    },
    id : {
        type: Number,
        required: true,
        unique: true,
    },
    price : {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    rating : {
        type : Number,
        required: true,
    }
});
const Products = mongoose.model('products',productSchema);
console.log(Products);
module.exports= Products;