import expressAsyncHandler from 'express-async-handler';
import Expense from '../../model/Expense.js';
//create
const createExpController = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { title, amount, description } = req.body;
  try {
    const expense = await Expense.create({ title, amount, description, user: req?.user?._id });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//Fetch all expense
const fetchAllExpController = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const expense = await Expense.paginate(
      { user: req?.user?._id },
      { limit: 10, page: Number(page), sort: { createdAt: 'desc' }, populate: 'user' },
    );
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//Fetch single expense
const fetchExpDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description, user } = req.body;

  console.log(id);
  try {
    const expense = await Expense.findById(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// update
const updateExpController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        description,
      },
      { new: true },
    );
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//remove expense
const deleteExpController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

export {
  createExpController,
  fetchAllExpController,
  fetchExpDetailsController,
  updateExpController,
  deleteExpController,
};
