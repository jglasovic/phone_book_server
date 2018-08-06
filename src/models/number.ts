import { Schema, Model, model } from 'mongoose';
import { INumberModel, IModelClass } from '../interfaces';

class NumberModel implements IModelClass<INumberModel> {
  public ModelType: Model<INumberModel>;
  public ModelSchema: Schema;
  public filter: string = '-__v'; // filter auto-import mongoBD __v
  constructor() {
    this.ModelSchema = new Schema({
      Number: String,
      PersonId: { type: Schema.Types.ObjectId, ref: 'Person' },
      Type: {
        type: Schema.Types.ObjectId,
        ref: 'Phone_type',
      },
    });
    this.ModelType = model<INumberModel>('Number', this.ModelSchema);
  }
}

export default NumberModel;
