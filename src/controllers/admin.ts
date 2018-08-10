import { Request, Response } from 'express';
import { IUserRequest } from '../interfaces';
import { getStatusText, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { createErrorResponse } from '../utils/error_log';

import TokenGenerator from '../utils/token_generator';

class Admin {
  private superUser: IUserRequest = {
    username: 'admin',
    password: 'test1234',
  };

  public login = async (req: Request, res: Response) => {
    try {
      const user: IUserRequest = {
        username: req.body.username,
        password: req.body.password,
      };
      if (!user.username) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Username field missing!'));
      }
      if (!user.password) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Password field missing!'));
      }
      if (user.username !== this.superUser.username || user.password !== this.superUser.password) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Wrong user authentication input!'));
      }
      const token: string | object = await TokenGenerator.generate(user.password);
      return res.status(OK).json(token);
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), err.message, err));
    }
  };
}

export default new Admin();
