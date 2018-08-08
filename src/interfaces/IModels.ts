import { Document, Schema, Model } from 'mongoose';

export interface IModelClass<T extends Document> {
  ModelSchema: Schema;
  ModelType: Model<T>;
  filter: string;
}

export interface IPerson {
  Firstname: string;
  Lastname: string;
  Address: string;
  City: string;
  Country: string;
  Lat: number;
  Lng: number;
}

export interface IPhoneType {
  Name: string;
}

export interface INumber {
  Number: string;
}

export interface IPersonForModel extends IPerson {
  Default: string;
  Numbers: INumberForModel[];
}

export interface INumberForModel extends INumber {
  _type: string;
  _person: string;
}

export interface IPersonModel extends IPersonForModel, Document {}

export interface INumberModel extends INumberForModel, Document {}

export interface IPhoneTypeModel extends IPhoneType, Document {}
