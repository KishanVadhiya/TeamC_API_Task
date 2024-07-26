const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./routes/product.routes.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9999;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

// Override mongoose's Promise with Node's Promise
mongoose.Promise = global.Promise;

// API Routes
app.use('/api', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error handler:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
