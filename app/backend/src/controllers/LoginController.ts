import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginService = new LoginService(email, password);
    const { status, message } = await loginService.login();

    res.status(status).json({ message });
  }

  static auth(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { status, message } = LoginService.auth(authorization);

    if (status !== 200) {
      return res.status(status).json({ message });
    }

    res.status(status).json({ role: message });
  }
}
