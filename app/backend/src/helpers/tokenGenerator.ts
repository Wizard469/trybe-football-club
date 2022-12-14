import { sign, verify } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secretKey = process.env.JWT_SECRET || 'secretKey';

require('dotenv/config');

export default class Token {
  static generateToken(data: IUser): string {
    const token = sign(data, secretKey, {
      expiresIn: '15d',
      algorithm: 'HS256',
    });

    return token;
  }

  static verifyToken(token: string) {
    try {
      const verified = verify(token, secretKey);
      return verified as IUser;
    } catch (e) {
      return undefined;
    }
  }
}
