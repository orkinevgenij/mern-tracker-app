import expressAsyncHandler from 'express-async-handler';
import Income from '../../model/Income.js';

//create
const createIncomeController = expressAsyncHandler(async (req, res) => {
  const { title, amount, description } = req.body;
  try {
    const income = await Income.create({ title, amount, description, user: req?.user?._id });
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//Fetch all income
const fetchAllController = expressAsyncHandler(async (req, res) => {
  const { page } = req.query;
  try {
    const income = await Income.paginate(
      { user: req?.user?._id },
      { limit: 10, page: Number(page), sort: { createdAt: 'desc' }, populate: 'user' },
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//Fetch single income
const fetchIncDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description, user } = req.body;

  console.log(id);
  try {
    const income = await Income.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// update
const updateIncController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const income = await Income.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        description,
      },
      { new: true },
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//remove income
const deleteIncController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Income.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

export {
  createIncomeController,
  fetchAllController,
  fetchIncDetailsController,
  updateIncController,
  deleteIncController,
};
