import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IPersonModel, IPersonUpdateRequest } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { validatePersonCreateRequest, validatePersonUpdateRequest } from '../utils/req_validation';
import { createErrorResponse } from '../utils/error_log';

import PersonService from '../services/person';

class PersonController {
  private PersonService: PersonService = new PersonService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonCollection: IPersonModel[] = await this.PersonService.getAll();
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined or invalid!'));
      }
      const PersonCollection: IPersonModel | null = await this.PersonService.getOne(req.params.id);
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPersonModel = req.body;
      if (!validatePersonCreateRequest(PersonRequest)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Invalid request!'));
      }
      const PersonCollection: IPersonModel = await this.PersonService.create(PersonRequest);
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPersonUpdateRequest = req.body;
      if (!validatePersonUpdateRequest(PersonRequest)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Invalid request!'));
      }
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createErrorResponse(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined or invalid!'));
      }
      PersonRequest._id = req.params.id;
      const PersonCollection: IPersonModel | null = await this.PersonService.update(PersonRequest);
      return res.status(OK).json(PersonCollection);
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
      const deletedRes: { message: string; _id: string } = await this.PersonService.delete(req.params.id);
      return res.status(OK).json(deletedRes);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createErrorResponse(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };
}

export default new PersonController();
