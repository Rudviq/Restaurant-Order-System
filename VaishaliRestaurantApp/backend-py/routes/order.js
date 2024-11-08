// routes/orders.js

const express = require('express');
const Order = require('./models/Order');
const router = express.Router();

// GET /api/orders - Retrieve current orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
    const order = new Order({
        items: req.body.items,
        status: req.body.status,
    });

    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH /api/orders/:id - Update an order status
router.patch('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (req.body.status) {
            order.status = req.body.status;
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
