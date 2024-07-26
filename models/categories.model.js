const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new  Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
});
const Categories = mongoose.model('categories',categorySchema);
module.exports= Categories;