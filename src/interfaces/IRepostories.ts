import { DocumentQuery, Query, Document } from 'mongoose';

export interface IRepository<T extends Document> {
  getAll(): DocumentQuery<T[], T>;
  getOne(_: number): DocumentQuery<T | null, T>;
  createOrUpdate(_: T[]): Promise<T[]>;
  delete(_: number): Query<any>;
}
