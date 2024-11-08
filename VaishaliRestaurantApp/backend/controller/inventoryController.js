import { Inventory } from '../models/inventory.js';

// GET all inventory items
export const getInventory = async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.status(200).json(inventoryItems);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ error: 'Unable to fetch inventory items' });
    }
};

// POST to add new inventory item
export const addInventory = async (req, res) => {
    try {
        // Check for required fields in request body
        if (!req.body.name || !req.body.quantity || !req.body.price) {
            return res.status(400).json({ error: 'Missing required fields: name, quantity, or price' });
        }
        
        const newItem = new Inventory(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: 'Unable to add inventory item' });
    }
};

// PUT to update an inventory item by ID
export const updateInventory = async (req, res) => {
    const { id } = req.params;
    try {
        // Validate request body to avoid empty updates
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No fields to update provided' });
        }

        const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).json({ error: 'Unable to update inventory item' });
    }
};

// DELETE to remove an inventory item by ID
export const deleteInventory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Inventory.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({ error: 'Unable to delete inventory item' });
    }
};
