import express from 'express';
import {
  createExpController,
  fetchAllExpController,
  fetchExpDetailsController,
  updateExpController,
  deleteExpController,
} from '../../controllers/expense/expenseControllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

export const expenseRoutes = express.Router();

expenseRoutes.post('/', authMiddleware, createExpController);
expenseRoutes.get('/', authMiddleware, fetchAllExpController);
expenseRoutes.get('/:id', authMiddleware, fetchExpDetailsController);
expenseRoutes.put('/:id', authMiddleware, updateExpController);
expenseRoutes.delete('/:id', authMiddleware, deleteExpController);
