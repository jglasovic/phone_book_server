import { IDeletedMongoose, IControllers, IPersonModel, IPersonUpdateRequest } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { createError } from '../utils/error_log';
import { Request, Response } from 'express';
import PersonService from '../services/person';
import { validatePersonRequest } from '../utils/req_vertification';

class PersonController {
  private PersonService: PersonService = new PersonService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonCollection = await this.PersonService.getAll();
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined!'));
      }
      const PersonCollection = await this.PersonService.getOne(req.params.id);
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPersonModel = req.body;
      if (!validatePersonRequest(PersonRequest)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Invalid request!'));
      }
      const PersonCollection = await this.PersonService.create(PersonRequest);
      return res.status(OK).json(PersonCollection);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPersonUpdateRequest = req.body;
      if (!req.params.id) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .json(createError(getStatusText(UNPROCESSABLE_ENTITY), 'Param Id undefined!'));
      }
      PersonRequest._id = req.params.id;
      const PersonCollection = await this.PersonService.update(PersonRequest);
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
      const deletedRes = await this.PersonService.delete(req.params.id);
      return res.status(OK).json(deletedRes);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };
}

export default new PersonController();
