import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Inventory } from "./models/inventory.js";
import { Order } from "./models/Order.js";
import { MenuItem } from "./models/MenuItem.js";
import inventoryRoutes from './routes/inventoryRoutes.js';
import cors from 'cors';
import menuRoutes from './routes/menuRoutes.js';


const app = express();

// Middleware for parsing JSON in request bodies
app.use(express.json());

app.use(cors());

app.use('/inventory', inventoryRoutes);


app.get('/',(request, response)=> {
    console.log(request);

    return response.status(234).send('Welcome');
});

app.use('/api/menu', menuRoutes);

// Place a new order
app.post('/orders', async (request, response) => {
    try {
        const { customerName, items, totalPrice, status } = request.body;

        // Validate request fields
        if (!customerName || !items || !totalPrice ) {
            return response.status(400).send({
                message: 'Please provide all required fields',
            });
        }

        // Validate that each item in the order has the correct structure
        for (const item of items) {
            
            if (!item.name || !item.quantity) {
                return response.status(400).send({
                    message: `Each item must have a menuItem and quantity`,
                });
            }
        }

        // // Deduct inventory quantities based on items ordered
        // for (const item of items) {
        //     const menuItem = await MenuItem.findById(item.menuItem); // Fetch menu item by ID
        //     if (!menuItem) {
        //         return response.status(400).send({
        //             message: `Menu item with ID ${item.menuItem} not found`,
        //         });
        //     }

        //     // Check and deduct inventory for each ingredient in the menu item
        //     for (const [ingredient, requiredQty] of Object.entries(menuItem.ingredients)) {
        //         const inventoryItem = await Inventory.findOne({ name: ingredient });
        //         if (!inventoryItem || inventoryItem.quantity < requiredQty * item.quantity) {
        //             return response.status(400).send({
        //                 message: `Insufficient inventory for ingredient ${ingredient}`,
        //             });
        //         }

        //         // Deduct required quantity
        //         inventoryItem.quantity -= requiredQty * item.quantity;
        //         await inventoryItem.save();
        //     }
        // }

        // Deduct inventory quantities based on items ordered
        for (const item of items) {
            console.log("Processing item:", item.name);

            // Check and deduct inventory for each ingredient in the item
            for (const ingredient of item.ingredients) {
                const inventoryItem = await Inventory.findOne({ name: ingredient.name });
                // if (!inventoryItem || inventoryItem.quantity < ingredient.quantity * item.quantity) {
                //     return response.status(400).send({
                //         message: `Insufficient inventory for ingredient ${ingredient.name}`,
                //     });
                // }

                // Deduct required quantity from inventory
                inventoryItem.quantity += ingredient.quantity * item.quantity;
                await inventoryItem.save();
            }
        }

        // Create and save the new order
        const newOrder = new Order({
            customerName,
            items: items.map(item => ({
                menuItem: item.menuItem,
                quantity: item.quantity
            })),
            totalPrice,
            status,
            orderDate: new Date(),
        });

        const savedOrder = await newOrder.save();

        response.status(201).json({
            message: 'Order created successfully',
            order: savedOrder
        });
    } catch (error) {
        console.error('Error creating order:', error);
        response.status(500).send({
            message: 'Error creating order',
            error: error.message
        });
    }
});


// Kitchen view - retrieve all pending orders
app.get('/kitchen/orders', async (request, response) => {
    try {
        const pendingOrders = await Order.find({ status: "Pending" }).populate('items.menuItem');
        response.status(200).json(pendingOrders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        response.status(500).send({
            message: 'Error retrieving orders',
            error: error.message
        });
    }
});

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })