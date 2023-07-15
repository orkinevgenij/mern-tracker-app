import express from 'express';
import {
  createIncomeController,
  deleteIncController,
  fetchAllController,
  fetchIncDetailsController,
  updateIncController,
} from '../../controllers/income/incomeControllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

export const incomeRoutes = express.Router();

incomeRoutes.post('/', authMiddleware, createIncomeController);
incomeRoutes.get('/', authMiddleware,fetchAllController);
incomeRoutes.get('/:id',authMiddleware, fetchIncDetailsController);
incomeRoutes.put('/:id', authMiddleware,updateIncController);
incomeRoutes.delete('/:id',authMiddleware, deleteIncController);
