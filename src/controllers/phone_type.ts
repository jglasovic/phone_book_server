import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IDeletedMongoose, IPhoneTypeModel } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { validatePhoneTypeCreateUpdateRequest } from '../utils/req_validation';
import { createErrorResponse } from '../utils/error_log';

import PhoneTypeService from '../services/phone_types';

class PhoneTypeController {
  private PhoneTypeService: PhoneTypeService = new PhoneTypeService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PhoneTypeCollection: IPhoneTypeModel[] = await this.PhoneTypeService.getAll();
      return res.status(OK).json(PhoneTypeCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PhoneTypeRequest: IPhoneTypeModel = req.body;
      if (!validatePhoneTypeCreateUpdateRequest(PhoneTypeRequest)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Invalid request!'));
      }
      const PhoneTypeCollection: IPhoneTypeModel = await this.PhoneTypeService.create(PhoneTypeRequest);
      return res.status(OK).json(PhoneTypeCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PhoneTypeRequest: IPhoneTypeModel = req.body;
      if (!validatePhoneTypeCreateUpdateRequest(PhoneTypeRequest)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Invalid request!'));
      }
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined or invalid!'));
      }
      PhoneTypeRequest._id = req.params.id;
      const PhoneTypeCollection: IPhoneTypeModel | null = await this.PhoneTypeService.update(PhoneTypeRequest);
      return res.status(OK).json(PhoneTypeCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined or invalid!'));
      }
      const deletedRes: IDeletedMongoose = await this.PhoneTypeService.delete(req.params.id);
      if (deletedRes.n !== 1 || deletedRes.ok !== 1) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Wrong data request!'));
      }
      return res.status(OK).json({ message: 'Deleted!', _iPhoneTypeCollectiond: req.params.id });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };
}

export default new PhoneTypeController();
