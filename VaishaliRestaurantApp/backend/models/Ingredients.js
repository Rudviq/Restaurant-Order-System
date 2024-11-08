
import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    batchNumber: { type: String, required: true }
});

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
