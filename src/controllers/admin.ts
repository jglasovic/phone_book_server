import { createErrorResponse } from '../utils/error_log';
import { Request, Response } from 'express';
import { IUserRequest } from '../interfaces';
import TokenGenerator from '../utils/token_generator';
import { getStatusText, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';

class Admin {
  private superUser: IUserRequest = {
    Username: 'admin',
    Password: 'test1234',
  };

  public login = async (req: Request, res: Response) => {
    try {
      const user: IUserRequest = {
        Username: req.body.username,
        Password: req.body.password,
      };
      if (!user.Username) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Username field missing!'));
      }
      if (!user.Password) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Password field missing!'));
      }
      if (user.Username !== this.superUser.Username || user.Password !== this.superUser.Password) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Wrong user authentication input!'));
      }
      const token = await TokenGenerator.generate(user.Password);
      return res.status(OK).json(token);
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), err.message, err));
    }
  };
}

export default new Admin();
