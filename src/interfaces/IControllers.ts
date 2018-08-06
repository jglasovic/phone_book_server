import { Request, Response } from 'express';
import { IPersonModel } from '.';

export interface IPersonResponse {
  Person: IPersonModel[];
}

export interface IDeletedMongoose {
  n: number;
  ok: number;
}

export interface IUserRequest {
  username?: string;
  password?: string;
}

export interface IControllers {
  getAll(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  createOrUpdate(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export interface IError {
  Error: string;
  message: string;
  data?: any;
}
