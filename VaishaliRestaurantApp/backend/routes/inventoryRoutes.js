// routes/inventoryRoutes.js
import express from 'express';
import { getInventory, addInventory, updateInventory, deleteInventory } from '../controller/inventoryController.js';

const router = express.Router();

// Define the routes for inventory actions
router.get('/', getInventory);
router.post('/', addInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventory);

export default router;
