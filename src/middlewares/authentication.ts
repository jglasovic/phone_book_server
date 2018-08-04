import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, FORBIDDEN, UNAUTHORIZED } from 'http-status-codes';
import TokenGenerator from '../utils/token_generator';

class Authentication {
  private path: string;
  constructor(Path: string) {
    this.path = Path;
  }
  public authenticate = (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.headers['x-access-token'];
    if (token) {
      try {
        const decoded = TokenGenerator.decode(token.toString());
        if (req.url.indexOf(this.path) >= 0) {
          return next(); // To move to next middleware
        } else {
          return res.status(FORBIDDEN).json({
            message: 'Not Authorized!',
          });
        }
      } catch (err) {
        return res.status(BAD_REQUEST).json({
          message: 'Token Expired',
          error: err,
        });
      }
    } else {
      return res.status(UNAUTHORIZED).json({
        message: 'Invalid Token or Key!',
      });
    }
  };
}

export default Authentication;
