import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    expiryDate: Date,
    batchNumber: String
});

export const Inventory = mongoose.model('Inventory', inventorySchema);
