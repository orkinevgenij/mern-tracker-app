import expressAsyncHandler from 'express-async-handler';
import Expense from '../../model/Expense.js';
import Income from '../../model/Income.js';

const accountStatsController = expressAsyncHandler(async (req, res) => {
  try {
    //Expenses statistics
    const expenseStats = await Expense.aggregate([
      //filter
      { $match: { amount: { $gte: 0 } } },
      {
        $group: {
          _id: null,
          averageExp: { $avg: '$amount' },
          totalExp: { $sum: '$amount' },
          minExp: { $min: '$amount' },
          maxExp: { $max: '$amount' },
          totalRecordsExp: { $sum: 1 },
        },
      },
    ]);
    //In comestatistics

    const incomeStats = await Income.aggregate([
      //filter
      { $match: { amount: { $gte: 0 } } },
      {
        $group: {
          _id: null,
          averageIncome: { $avg: '$amount' },
          totalInc: { $sum: '$amount' },
          minInc: { $min: '$amount' },
          maxInc: { $max: '$amount' },
          totalRecordsInc: { $sum: 1 },
        },
      },
    ]);
    res.json({
      expenseStats,
      incomeStats,
    });
  } catch (error) {
    res.json(error);
  }
});
export { accountStatsController };
