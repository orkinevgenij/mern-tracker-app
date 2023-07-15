import dotenv from 'dotenv';
import express from 'express';
import dbConnect from './config/dbConnect.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { expenseRoutes } from './routes/expense/expenseRoute.js';
import { incomeRoutes } from './routes/income/incomeRoute.js';
import { usersRoute } from './routes/users/usersRoute.js';
import { accountStatsRoute } from './routes/accountStatsRoute/accountStatsRoute.js';
dotenv.config();

const app = express();

dbConnect();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome Expenses tracker API',
  });
});

//routes

//users routes
app.use('/api/users', usersRoute);

//account stats
app.use('/', accountStatsRoute);

//income routes
app.use('/api/income', incomeRoutes);

//expense routes
app.use('/api/expense', expenseRoutes);

//Error
app.use(notFound);
app.use(errorHandler);

//expenses

export default app;
