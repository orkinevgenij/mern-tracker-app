import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
    try {
      if (token) {
        const decodedUser = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decodedUser?.id).select('-password');
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error('Not Authorized token expired');
    }
  } else {
    throw new Error('There is no token attached to the header');
  }
});
