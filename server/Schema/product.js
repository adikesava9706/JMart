const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, requierd: false }
});

module.exports = mongoose.model('Product', productSchema);