
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: String,
    email: String,
    address: String,
    orderHistory: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } // References to past orders
    ]
});

export const Customer = mongoose.model("Customer", customerSchema);
