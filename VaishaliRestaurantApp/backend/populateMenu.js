// populateMenu.js
import mongoose from "mongoose";
import { mongoDBURL } from "./config.js";
import { MenuItem } from "./models/MenuItem.js";

const defaultMenu = [
    {
        name: "Idli Sambar",
        ingredients: [
            { name: "idli", quantity: 2, unit: "pieces" },
            { name: "sambar", quantity: 200, unit: "ml" },
            { name: "coconut_chutney", quantity: 50, unit: "g" }
        ],
        price: 50
    },
    {
        name: "Medu Vada Sambar",
        ingredients: [
            { name: "vada", quantity: 2, unit: "pieces" },
            { name: "sambar", quantity: 200, unit: "ml" },
            { name: "coconut_chutney", quantity: 50, unit: "g" }
        ],
        price: 60
    },
    {
        name: "Dosa",
        ingredients: [
            { name: "dosa", quantity: 1, unit: "piece" },
            { name: "potato_masala", quantity: 100, unit: "g" },
            { name: "sambar", quantity: 200, unit: "ml" },
            { name: "coconut_chutney", quantity: 50, unit: "g" }
        ],
        price: 80
    },
    {
        name: "Masala Tea",
        ingredients: [
            { name: "tea_leaves", quantity: 10, unit: "g" },
            { name: "milk", quantity: 200, unit: "ml" }
        ],
        price: 20
    },
    {
        name: "Filter Coffee",
        ingredients: [
            { name: "coffee_powder", quantity: 20, unit: "g" },
            { name: "milk", quantity: 200, unit: "ml" }
        ],
        price: 25
    }
];

// Connect to MongoDB and insert default menu
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to database");

        // Clear existing data (optional)
        await MenuItem.deleteMany({});

        // Insert default menu items
        await MenuItem.insertMany(defaultMenu);

        console.log("Menu populated successfully");
        mongoose.connection.close();
    })
    .catch(error => {
        console.error("Error populating menu:", error);
    });
