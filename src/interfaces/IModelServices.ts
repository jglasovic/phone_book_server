import { DocumentQuery, Query, Document } from 'mongoose';

export interface IModelServices<T extends Document> {
  getAll(): DocumentQuery<T[], T>;
  getOne(_: number): DocumentQuery<T | null, T>;
  create(_: T): Promise<T>;
  update(_: T): Query<any>;
  delete(_: number): Query<any>;
}
