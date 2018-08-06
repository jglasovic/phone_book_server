import { Schema, Model, model } from 'mongoose';
import { IPersonModel, IModelClass } from '../interfaces';

class UserModel implements IModelClass<IPersonModel> {
  public ModelType: Model<IPersonModel>;
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
      Default: { type: Schema.Types.ObjectId, ref: 'Number' },
      Numbers: [
        {
          Id: {
            type: Schema.Types.ObjectId,
            ref: 'Number',
          },
          PhoneType: {
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
    this.ModelType = model<IPersonModel>('Person', this.ModelSchema);
  }
}

export default UserModel;
