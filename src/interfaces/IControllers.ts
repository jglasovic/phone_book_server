import { IPerson, INumber, INumberForModel, IPhoneType } from '.';

// response
export interface IPersonResponse extends IPerson {
  def: string;
  numbers: INumberPersonResponse[];
}

export interface IPhoneTypeRequestResponse extends IPhoneType {
  _id: string;
}

interface INumberPersonResponse extends INumber {
  _type: IPhoneTypeRequestResponse;
}
export interface INumberResponse extends INumber {
  _id: string;
  person: string;
  type: IPhoneTypeRequestResponse;
}

// request
export interface IUserRequest {
  username?: string;
  password?: string;
}

export interface IPersonUpdateRequest extends IPerson {
  _id: string;
  def?: string;
}
export interface IPersonCreateRequest extends IPersonUpdateRequest {
  numbers: INumberCreateRequest[];
}

export interface INumberUpdateRequest extends INumberCreateRequest {
  _id: string;
}
export interface INumberCreateRequest extends INumberForModel {
  def?: boolean;
}

// mongoose delete response
export interface IDeletedMongoose {
  n: number;
  ok: number;
}

// error
export interface IError {
  Error: string;
  message: string;
  data?: any;
}
