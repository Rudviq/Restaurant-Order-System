// routes/menuRoutes.js
import express from 'express';
import { getMenu } from '../controller/menuController.js';

const router = express.Router();

// Define the route to get all menu items
router.get('/', getMenu);

export default router;
