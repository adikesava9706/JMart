const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const Product = require('./Schema/product.js')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/local', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


app.post("/user/signin", (req, res) => {
    console.log("Sign In Data:", req.body);
    res.json({
        message: "Sign In data received",
        data: req.body,
    });
});

app.post("/user/signup", (req, res) => {
    console.log("Sign Up Data:", req.body);
    res.json({
        message: "Sign Up data received",
        data: req.body,
    });
});


app.get('/', (req, res) => {
    res.send('landing Page')
})

app.get('/product', async (req, res) => {

    try {
        const products = await Product.find(); // Fetch products from MongoDB
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
})

app.post('/addproduct', async (req, res) => {
    const { name, price, image } = req.body;

    // Validate required fields
    if (!name || !price) {
        return res.status(400).json({ error: 'Please provide name and price' });
    }

    try {
        // Create a new product instance
        const newProduct = new Product({ name, price, image });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Respond with success message and saved product
        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: 'Failed to add product', details: err.message });
    }
});

app.put('/updateproduct/:id', async (req, res) => {
    const { id } = req.params; // Extract the _id from the request parameters
    const { name, price, image } = req.body; // Extract the updated fields from the request body

    try {
        // Find the product by _id and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product', details: err.message });
    }
});

app.delete('/removeproduct/:id', async (req, res) => {
    const { id } = req.params; // Extract the _id from the request parameters

    try {
        // Find the product by _id and delete it
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product removed successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove product', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})