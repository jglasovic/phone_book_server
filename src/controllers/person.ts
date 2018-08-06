import { IDeletedMongoose, IControllers, IPersonModel, IPersonResponse } from '../interfaces';
import { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';
import { createError } from '../utils/error_log';
import { Request, Response } from 'express';

import PersonService from '../services/person';

class PersonController implements IControllers {
  private PersonService: PersonService = new PersonService();
  private PersonCollection?: IPersonModel | IPersonModel[] | null;
  private PersonResponse: IPersonResponse = {
    Person: [],
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      this.PersonCollection = await this.PersonService.getAll();
      this.PersonResponse.Person = this.PersonCollection;
      return res.status(OK).json(this.PersonResponse);
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
      this.PersonCollection = await this.PersonService.getOne(req.params.id);
      this.PersonResponse.Person = this.PersonCollection ? [this.PersonCollection] : [];
      return res.status(OK).json(this.PersonResponse);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPersonModel = req.body;
      this.PersonCollection = await this.PersonService.create(PersonRequest);
      this.PersonResponse.Person = this.PersonCollection || [];
      return res.status(OK).json(this.PersonResponse);
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(createError(getStatusText(INTERNAL_SERVER_ERROR), error.message, error));
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const PersonRequest: IPersonModel = req.body;
      if (req.params.id) {
        PersonRequest._id = req.params.id;
      }
      this.PersonCollection = await this.PersonService.update(PersonRequest);
      this.PersonResponse.Person = this.PersonCollection || [];
      return res.status(OK).json(this.PersonResponse);
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
      const deletedRes: IDeletedMongoose = await this.PersonService.delete(req.params.id);
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

export default new PersonController();
