import { IDeletedMongoose, IControllers, IPhoneTypeModel } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { createError } from '../utils/error_log';
import { Request, Response } from 'express';

import PhoneTypeService from '../services/phone_types';

class PhoneTypeController {
  private PhoneTypeService: PhoneTypeService = new PhoneTypeService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonCollection = await this.PhoneTypeService.getAll();
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPhoneTypeModel = req.body;
      const PersonCollection = await this.PhoneTypeService.create(PersonRequest);
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPhoneTypeModel = req.body;
      if (req.params.id) {
        PersonRequest._id = req.params.id;
      }
      const PersonCollection = await this.PhoneTypeService.update(PersonRequest);
      // this.PersonResponse.Person = this.PersonCollection || [];
      return res.status(OK).json(PersonCollection);
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
      const deletedRes: IDeletedMongoose = await this.PhoneTypeService.delete(req.params.id);
      if (deletedRes.n !== 1 || deletedRes.ok !== 1) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Wrong data request!'));
      }
      return res.status(OK).json({ message: 'Deleted!', Id: req.params.id });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };
}

export default new PhoneTypeController();
