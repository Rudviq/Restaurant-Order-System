import mongoose from 'mongoose';
import { Inventory } from './models/inventory.js'; // Adjust the path if needed
import { mongoDBURL } from './config.js'; // Your MongoDB connection string

const defaultInventory = [
    {
        name: "idli",
        quantity: 100, 
        unit: "pieces",
        batch_number: "BATCH1234",
        expiry_date: new Date("2024-12-15"),
        days_to_expiry: 40
    },
    {
        name: "sambar",
        quantity: 5000, 
        unit: "ml",
        batch_number: "BATCH1235",
        expiry_date: new Date("2024-12-20"),
        days_to_expiry: 45
    },
    {
        name: "coconut_chutney",
        quantity: 2000, 
        unit: "ml",
        batch_number: "BATCH1236",
        expiry_date: new Date("2024-11-30"),
        days_to_expiry: 25
    },
    {
        name: "vada",
        quantity: 100, 
        unit: "pieces",
        batch_number: "BATCH1237",
        expiry_date: new Date("2024-11-25"),
        days_to_expiry: 20
    },
    {
        name: "dosa",
        quantity: 50, 
        unit: "pieces",
        batch_number: "BATCH1238",
        expiry_date: new Date("2024-12-10"),
        days_to_expiry: 35
    },
    {
        name: "potato_masala",
        quantity: 3000, 
        unit: "g",
        batch_number: "BATCH1239",
        expiry_date: new Date("2024-11-22"),
        days_to_expiry: 17
    },
    {
        name: "tea_leaves",
        quantity: 1000, 
        unit: "g",
        batch_number: "BATCH1240",
        expiry_date: new Date("2024-12-01"),
        days_to_expiry: 26
    },
    {
        name: "milk",
        quantity: 10000, 
        unit: "ml",
        batch_number: "BATCH1241",
        expiry_date: new Date("2024-11-15"),
        days_to_expiry: 10
    },
    {
        name: "coffee_powder",
        quantity: 800, 
        unit: "g",
        batch_number: "BATCH1242",
        expiry_date: new Date("2024-12-05"),
        days_to_expiry: 30
    }
];

mongoose.connect(mongoDBURL)
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Check if inventory already exists
        const existingInventory = await Inventory.find();
        if (existingInventory.length > 0) {
            console.log('Inventory already exists in the database.');
            return;
        }

        // Insert the default inventory data into the database
        await Inventory.insertMany(defaultInventory);
        console.log('Default inventory added successfully!');
        
        mongoose.disconnect();  // Disconnect after completing the task
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
