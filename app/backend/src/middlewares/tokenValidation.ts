import { NextFunction, Request, Response } from 'express';
import HttpCode from '../helpers/httpCodes';
import Token from '../helpers/tokenGenerator';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const user = Token.verifyToken(authorization);

  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validateToken;
