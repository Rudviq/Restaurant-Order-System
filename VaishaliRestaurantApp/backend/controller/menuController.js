
import { MenuItem} from '../models/MenuItem.js';

// GET all menu items
export const getMenu = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();  // Fetch all menu items
        res.status(200).json(menuItems);  // Respond with the menu items
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch menu items' });  // Handle errors
    }
};
