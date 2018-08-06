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

export interface INumber {
  Number: string;
}

export interface IPhoneType {
  Name: string;
}

export interface IPersonModel extends IPerson, Document {}

export interface INumberModel extends INumber, Document {}

export interface IPhoneTypeModel extends IPhoneType, Document {}
