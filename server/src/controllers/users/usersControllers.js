import generateToken from '../../middlewares/generateToken.js';
import User from '../../model/User.js';
import expressAsyncHandler from 'express-async-handler';
//Register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');
  try {
    const user = await User.create({
      email,
      firstname,
      lastname,
      password,
    });
    res.status(200).json({ user, token: generateToken(user?._id) });
  } catch (error) {
    console.log(error);
  }
});
//login
const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userFound = await User.findOne({ email });

  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Login credentials');
  }
});
//fetch all users
const fetchUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.json(error);
  }
});

//User profile
const userProfileController = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findById(req?.user?._id).populate(['expenses', 'income']);
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

const updateUserProfileController = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findByIdAndUpdate(
      req?.user?._id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

export {
  registerUser,
  fetchUsersController,
  loginUserController,
  userProfileController,
  updateUserProfileController,
};
