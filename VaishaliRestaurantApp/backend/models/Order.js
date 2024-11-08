
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }, // Reference to MenuItem
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // e.g., Pending, Preparing, Completed
    orderDate: { type: Date, default: Date.now }
});

export const Order = mongoose.model("Order", orderSchema);
