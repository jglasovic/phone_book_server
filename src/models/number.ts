import { Schema, Model, model } from 'mongoose';
import { INumberModel, IModelClass } from '../interfaces';

class NumberModel implements IModelClass<INumberModel> {
  public ModelType: Model<INumberModel>;
  public ModelSchema: Schema;
  public filter: string = '-__v'; // filter auto-import mongoBD __v
  constructor() {
    this.ModelSchema = new Schema({
      Number: String,
      _user: { type: Schema.Types.ObjectId, ref: 'User' },
      type: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Phone_type',
        },
        Name: String,
      },
    });
    this.ModelType = model<INumberModel>('Number', this.ModelSchema);
  }
}

export default NumberModel;
