import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ExpenseSchema = mongoose.Schema(
  {
    title: {
      required: [true, 'Title is required'],
      type: String,
    },
    description: {
      required: [true, 'Description is required'],
      type: String,
    },
    type: {
      type: String,
      default: 'expense',
    },
    amount: {
      required: [true, 'Amount  is required'],
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  },
);
ExpenseSchema.plugin(mongoosePaginate);

const Expense = mongoose.model('Expense', ExpenseSchema);
export default Expense;
