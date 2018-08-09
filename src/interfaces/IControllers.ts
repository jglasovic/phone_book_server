import { IPerson, INumber, INumberForModel, IPhoneType } from '.';

// response
export interface IPersonResponse extends IPerson {
  Default: string;
  Numbers: INumberPersonResponse[];
}

export interface IPhoneTypeRequestResponse extends IPhoneType {
  _id: string;
}

interface INumberPersonResponse extends INumber {
  _type: IPhoneTypeRequestResponse;
}
export interface INumberResponse extends INumber {
  _id: string;
  _person: string;
  _type: IPhoneTypeRequestResponse;
}

// request
export interface IUserRequest {
  Username?: string;
  Password?: string;
}

export interface IPersonUpdateRequest extends IPerson {
  _id: string;
  Default?: string;
}
export interface IPersonCreateRequest extends IPersonUpdateRequest {
  Numbers: INumberCreateRequest[];
}

export interface INumberUpdateRequest extends INumberCreateRequest {
  _id: string;
}
export interface INumberCreateRequest extends INumberForModel {
  Default?: boolean;
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
