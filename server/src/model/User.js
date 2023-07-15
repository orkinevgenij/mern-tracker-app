import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema(
  {
    firstname: {
      required: [true, 'First name is required'],
      type: String,
    },
    lastname: {
      required: [true, 'Last name is required'],
      type: String,
    },
    email: {
      required: [true, 'Email is required'],
      type: String,
    },
    password: {
      required: [true, 'Password  is required'],
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

//virtual
//Expenses
UserSchema.virtual('expenses', {
  ref: 'Expense',
  foreignField: 'user',
  localField: '_id',
});

//Income
UserSchema.virtual('income', {
  ref: 'Income',
  foreignField: 'user',
  localField: '_id',
});

//Hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Verify password

UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
