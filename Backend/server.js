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

app.post('/addproduct', (req, res) => {
    const { id, name, price } = req.body
    if (!id || !name || !price) {
        return res.status(400).json({ error: 'Please provide id, name, and price' })
    }
    products.push({ id, name, price })
    res.status(201).json({ message: 'Product added successfully', product: { id, name, price } })
})

app.delete('/removeproduct/:id', (req, res) => {
    const { id } = req.params
    const productIndex = products.findIndex(product => product.id === id)
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' })
    }
    const removedProduct = products.splice(productIndex, 1)
    res.json({ message: 'Product removed successfully', product: removedProduct[0] })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})