import { INumberCreateRequest, INumberUpdateRequest } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { createError } from '../utils/error_log';
import { Request, Response } from 'express';

import NumberService from '../services/number';

class NumberController {
  private NumberService: NumberService = new NumberService();
  public findNumber = async (req: Request, res: Response) => {
    try {
      if (!req.query.Number) {
        // query Number for async number search
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined!'));
      }
      const NumberCollection = await this.NumberService.findByNumber(req.query.Number); // get number with person data
      return res.status(OK).json(NumberCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const NumberRequest: INumberCreateRequest = req.body;
      const NumberCollection = await this.NumberService.create(NumberRequest);
      return res.status(OK).json(NumberCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const NumberRequest: INumberUpdateRequest = req.body;
      if (req.params.id) {
        NumberRequest._id = req.params.id;
      }
      const NumberCollection = await this.NumberService.update(NumberRequest);
      return res.status(OK).json(NumberCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined!'));
      }
      const deletedRes = await this.NumberService.delete(req.params.id);
      return res.status(OK).json(deletedRes);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };
}

export default new NumberController();
