import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [
        {
            name: String, // Name of the ingredient
            quantity: Number, // Quantity needed for the dish
            unit: String // Unit for the quantity
        }
    ],
    price: { type: Number, required: true },
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
