import { Schema, Model, model, SchemaType } from 'mongoose';
import { IUserModel, IModelClass } from '../interfaces';

class UserModel implements IModelClass<IUserModel> {
  public ModelType: Model<IUserModel>;
  public ModelSchema: Schema;
  public filter: string = '-__v'; // filter auto-import mongoBD __v
  constructor() {
    this.ModelSchema = new Schema({
      Firstname: String,
      Lastname: String,
      Address: String,
      City: String,
      Country: String,
      Lat: Number,
      Lng: Number,
      Default: {
        _number: { type: Schema.Types.ObjectId, ref: 'Number', unique: true, required: true },
        Number: String,
      },
      Numbers: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'Number',
          },
          type: {
            id: {
              type: Schema.Types.ObjectId,
              ref: 'Phone_type',
            },
            Name: String,
          },
          Number: String,
        },
      ],
    });
    this.ModelType = model<IUserModel>('User', this.ModelSchema);
  }
}

export default UserModel;
