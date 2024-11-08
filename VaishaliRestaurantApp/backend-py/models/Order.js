// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: {
        type: Map,
        of: Number, // Item ID and quantity
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
