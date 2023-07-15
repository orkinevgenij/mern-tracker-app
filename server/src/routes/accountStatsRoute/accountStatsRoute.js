import express from 'express';
import { accountStatsController } from '../../controllers/accountStatsController/accountStatsController.js';
export const accountStatsRoute = express.Router();

accountStatsRoute.get('/api/accounts-statistics', accountStatsController);
