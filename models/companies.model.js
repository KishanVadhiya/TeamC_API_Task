const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new  Schema({
    description:{
        type: String,
        required: true,
    },
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
const Companies = mongoose.model('companies',companySchema);
module.exports= Companies;