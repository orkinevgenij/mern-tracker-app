import express from 'express';
import {
  registerUser,
  fetchUsersController,
  loginUserController,
  userProfileController,
  updateUserProfileController,
} from '../../controllers/users/usersControllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
export const usersRoute = express.Router();

usersRoute.get('/profile', authMiddleware, userProfileController);
usersRoute.put('/update', authMiddleware, updateUserProfileController);
usersRoute.post('/register', registerUser);
usersRoute.post('/login', loginUserController);
usersRoute.get('/', fetchUsersController);
