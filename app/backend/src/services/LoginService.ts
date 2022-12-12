import { compare } from 'bcryptjs';
import User from '../database/models/User';
import Token from '../helpers/tokenGenerator';
import HttpCode from '../helpers/httpCodes';

export default class LoginService {
  constructor(private email: string, private password: string) {}
  async login() {
    const user = await User.findOne({ where: { email: this.email } });

    if (!this.email || !this.password) {
      return { status: HttpCode.BAD_REQUEST, message: 'All fields must be filled' };
    }

    if (!user) {
      return { status: HttpCode.UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const match = await compare(this.password, user.password);

    if (!match) {
      return { status: HttpCode.UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const { password: _, ...rest } = user.dataValues;

    const token = Token.generateToken(rest);

    return { status: HttpCode.OK, message: token };
  }

  static auth(token: string | undefined) {
    if (!token) {
      return { status: HttpCode.UNAUTHORIZED, message: 'Token not found' };
    }

    const user = Token.verifyToken(token);

    if (!user) {
      return { status: HttpCode.UNAUTHORIZED, message: 'Invalid token' };
    }

    return { status: HttpCode.OK, message: user.role };
  }
}
