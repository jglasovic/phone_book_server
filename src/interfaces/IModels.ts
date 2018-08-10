import { Document, Schema, Model } from 'mongoose';

export interface IModelClass<T extends Document> {
  ModelSchema: Schema;
  ModelType: Model<T>;
  filter: string;
}

export interface IPerson {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export interface IPhoneType {
  name: string;
}

export interface INumber {
  number: string;
}

export interface IPersonForModel extends IPerson {
  def: string;
  numbers: INumberForModel[];
}

export interface INumberForModel extends INumber {
  type: string;
  person: string;
}

export interface IPersonModel extends IPersonForModel, Document {}

export interface INumberModel extends INumberForModel, Document {}

export interface IPhoneTypeModel extends IPhoneType, Document {}
